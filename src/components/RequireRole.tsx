import React, { ReactNode } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { UserRole } from '@features/auth/enums/UserRole';

interface RequireRoleProps {
  children: ReactNode;
  allowedRoles: UserRole[] | string[];
}

export const RequireRole: React.FC<RequireRoleProps> = ({ children, allowedRoles }) => {
  const { roles } = useAuth();

  // Verifica se o usuário possui pelo menos uma das roles permitidas
  const hasPermission = roles.some((role) => allowedRoles.includes(role as UserRole));

  // Se tiver permissão, renderiza o conteúdo. Caso contrário, não renderiza nada.
  return hasPermission ? <>{children}</> : null;
};