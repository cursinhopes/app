import axios from 'axios';
import { getItem, removeItem } from '../utils/storage';

export const api = axios.create({
  baseURL: 'https://pes.ufsc.br/app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de Requisição: Adiciona o token no cabeçalho antes de enviar
api.interceptors.request.use(async (config) => {
  const token = await getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Se a requisição deu certo, apenas retorna a resposta
    return response;
  },
  async (error) => {
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        // Token inválido ou expirado: limpa o storage imediatamente por segurança
        await removeItem('jwt_token');
        await removeItem('user_nickname');
        await removeItem('user_type');
        await removeItem('user_roles');
        
        // Dispara evento para o AuthContext saber que precisa atualizar o estado
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      } 
      else if (status === 403) {
        // Acesso negado a um recurso específico
        const message = error.response.data?.message || 'Você não tem permissão para realizar esta ação.';
        
        // Dispara evento para a interface exibir o aviso sem deslogar
        window.dispatchEvent(new CustomEvent('auth:forbidden', { detail: message }));
      }
    }
    
    // Repassa o erro para quem chamou a API poder tratar localmente (ex: parar um loading)
    return Promise.reject(error);
  }
);