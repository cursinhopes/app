import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../features/auth/enums/UserRole';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[] | string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, isLoading, roles } = useAuth();

  if (isLoading) return null;
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = roles.some((userRole) => 
      allowedRoles.includes(userRole as UserRole)
    );

    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};