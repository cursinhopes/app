import axios from 'axios';
import { getItem } from '../utils/storage';

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