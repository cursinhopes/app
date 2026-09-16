import axios from 'axios';
import { api } from '../../../services/api';
import { LoginCredentials, UserData, AuthErrorResponse, AuthSuccessResponse } from '../types';

export const authenticate = async (credentials: LoginCredentials): Promise<UserData> => {
  try {
    
    const response = await api.post<AuthSuccessResponse>('/login', credentials);

    return response.data.data;

  } catch (error: unknown) {

    if (axios.isAxiosError<AuthErrorResponse>(error)) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Erro na requisição.', { cause: error });
      }
    }
    
    throw new Error('Erro de conexão com o servidor.', { cause: error });
  }
};