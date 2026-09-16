import React, { createContext, use, useState, useEffect, ReactNode } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';
import { UserData } from '../features/auth/types'; 

interface AuthContextType {
  isAuthenticated: boolean;
  nickname: string | null;
  type: string | null;
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
  const [type, setType] = useState<string | null>(null);

  // Função de logout isolada para ser reaproveitada
  const signOut = async () => {
    await removeItem('jwt_token');
    await removeItem('user_nickname');
    await removeItem('user_type');
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
      const savedType = await getItem('user_type');
      const savedRoles = await getItem('user_roles');
      
      if (token && savedRoles) {
        setIsAuthenticated(true);
        setNickname(savedNickname);
        if (savedType) setType(savedType);
        setRoles(JSON.parse(savedRoles));
      }
      setIsLoading(false);
    };

    loadData();

    const handleUnauthorized = () => {
      setIsAuthenticated(false);
      setNickname(null);
      setType(null);
      setRoles([]);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('auth:unauthorized', handleUnauthorized);
    };
  }, []);

  const signIn = async (data: UserData) => {
    await setItem('jwt_token', data.token);
    await setItem('user_nickname', data.nickname);
    await setItem('user_type', data.type);
    await setItem('user_roles', JSON.stringify(data.roles));
    setIsAuthenticated(true);
    setNickname(data.nickname);
    setType(data.type);
    setRoles(data.roles);
  };

  return (
    <AuthContext value={{ isAuthenticated, nickname, type, roles, isLoading, signIn, signOut }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};