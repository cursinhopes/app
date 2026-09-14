import React, { createContext, use, useState, useEffect, ReactNode } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';
import { UserData } from '../features/auth/types';
import { api } from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  nickname: string | null;
  roles: string[];
  isLoading: boolean;
  signIn: (data: UserData) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Função de logout isolada para ser reaproveitada
  const signOut = async () => {
    await removeItem('jwt_token');
    await removeItem('user_nickname');
    await removeItem('user_roles');
    setIsAuthenticated(false);
    setNickname(null);
    setRoles([]);
  };

  useEffect(() => {
    // Carrega dados iniciais do armazenamento
    const loadData = async () => {
      const token = await getItem('jwt_token');
      const savedNickname = await getItem('user_nickname');
      const savedRoles = await getItem('user_roles');
      
      if (token && savedRoles) {
        setIsAuthenticated(true);
        setNickname(savedNickname);
        setRoles(JSON.parse(savedRoles));
      }
      setIsLoading(false);
    };
    loadData();

    // Configura o interceptor de resposta do Axios
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          // Se o token for inválido (401) ou a rota for proibida (403)
          if (status === 401) {
            // Token expirado ou credencial inválida: Força a saída
            signOut();
          } else if (status === 403) {
            // Dispara um evento global informando a falta de permissão
            window.dispatchEvent(new CustomEvent('api-forbidden', {
              detail: error.response.data.message || 'Sem permissão para esta ação'
            }));
          }
        }
        return Promise.reject(error);
      }
    );

    // Limpeza: remove o interceptor quando o componente for desmontado
    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, []);

  const signIn = async (data: UserData) => {
    await setItem('jwt_token', data.token);
    await setItem('user_nickname', data.nickname);
    await setItem('user_roles', JSON.stringify(data.roles));
    setIsAuthenticated(true);
    setNickname(data.nickname);
    setRoles(data.roles);
  };

  return (
    <AuthContext value={{ isAuthenticated, nickname, roles, isLoading, signIn, signOut }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};