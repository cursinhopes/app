import { LoginCredentials, UserData, AuthErrorResponse, AuthSuccessResponse } from '../types';

export const authenticate = async (credentials: LoginCredentials): Promise<UserData> => {
  const response = await fetch('https://pes.ufsc.br/app/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData: AuthErrorResponse = await response.json();
    throw new Error(errorData.message || 'Erro na requisição.');
  }

  const responseData: AuthSuccessResponse = await response.json();
  return responseData.data;
};