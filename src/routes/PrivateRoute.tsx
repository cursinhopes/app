import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IonSpinner, IonPage, IonContent } from '@ionic/react';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, roles, isLoading } = useAuth();

  if (isLoading) {
    return (
      <IonPage>
        <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasAccess = roles.some(role => allowedRoles.includes(role));
    if (!hasAccess) {
      return <Navigate to="/home" replace />;
    }
  }

  return <>{children}</>;
};