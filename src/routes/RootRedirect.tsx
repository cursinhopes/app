import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const RootRedirect: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Opcional: Renderizar um <IonSpinner /> enquanto o storage é lido
  }

  // Direciona com base no status do login
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};