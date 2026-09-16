import React, { useState, useEffect } from 'react';
import { 
  IonPage,
  useIonToast,  
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonContent, 
  IonModal,
  IonIcon
} from '@ionic/react';
import { menuOutline, closeOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { CustomButton } from '@components/CustomButton';
import { UserTypeUtils } from '@features/auth/enums/UserType';
import  logoHeader from '@/assets/img/logo-header.png';
import { RequireRole } from '@components/RequireRole';
import { UserRole } from '@features/auth/enums/UserRole';
import { UserRoleUtils } from '@features/auth/enums/UserRole';
import './style.scss';

interface RestrictedLayoutProps {
  children: React.ReactNode;
}

export const RestrictedLayout: React.FC<RestrictedLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [presentToast] = useIonToast();
  const { type, signOut } = useAuth();
  const navigate = useNavigate();
  const userTypeLabel = UserTypeUtils.getLabel(type);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    if (signOut) {
      await signOut();
    }
    navigate('/login', { replace: true });
  };

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const appVersion = import.meta.env.VITE_APP_VERSION || "local-degub-version";

  useEffect(() => {
    const handleForbidden = (event: Event) => {
      const customEvent = event as CustomEvent;
      presentToast({
        message: customEvent.detail,
        duration: 4000,
        position: 'top',
        color: 'danger',
        buttons: [{ text: 'OK', role: 'cancel' }]
      });
    };

    window.addEventListener('auth:forbidden', handleForbidden);

    return () => {
      window.removeEventListener('auth:forbidden', handleForbidden);
    };
  }, [presentToast]);

  return (
    <IonPage>
      {/* Header Fixo da Área Restrita */}
      <IonHeader className="ion-no-border restricted-header">
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsMenuOpen(true)}>
              <IonIcon icon={menuOutline} style={{ color: '#fff', fontSize: '28px' }} />
            </IonButton>
          </IonButtons>

          <IonButtons slot="start">
            <div className="role-badge" onClick={() => navigate('/home')}>
              <img src={logoHeader} width="48px" alt="Logo Cursinho PES" />
              <span className="role font-pes">{userTypeLabel}</span>
            </div>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Conteúdo da Página Específica */}
      <IonContent>
        {children}
      </IonContent>

      {/* Modal do Menu Tela Cheia */}
      <IonModal isOpen={isMenuOpen} onDidDismiss={() => setIsMenuOpen(false)}>
        <IonHeader className="ion-no-border restricted-header">
          <IonToolbar>
            <IonButtons slot="start">
              <div className="role-badge" onClick={() => navigate('/home')}>
                <img src={logoHeader} width="48px" alt="Logo Cursinho PES" />
                <span className="role font-pes">{userTypeLabel}</span>
              </div>
            </IonButtons>

            <IonButtons slot="end">
              <IonButton onClick={() => setIsMenuOpen(false)}>
                <IonIcon icon={closeOutline} style={{ color: '#fff', fontSize: '28px' }} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-drawn fullscreen-menu">
          <div className="menu-container">
            <div className="menu-scroll-area">
              <CustomButton 
                variant="confirm" 
                label="Início" 
                icon="home" 
                onClick={() => navigateTo('/home')} 
              />
              { /*<CustomButton 
                variant="confirm" 
                label="Meu Perfil" 
                icon="person" 
                onClick={() => navigateTo('/profile')} 
              />
              <CustomButton 
                variant="confirm" 
                label="Configurações" 
                icon="settings" 
                onClick={() => navigateTo('/settings')} 
              />*/}
              <RequireRole allowedRoles={UserRoleUtils.members()}>
                <CustomButton 
                  variant="confirm" 
                  label="Registrar Presença" 
                  icon="qr_code" 
                  onClick={() => navigateTo('/scan-code')} 
                />
              </RequireRole>
              <RequireRole allowedRoles={[UserRole.ADMINSTRATOR]}>
                <CustomButton 
                  variant="confirm" 
                  label="Admin Dashboard" 
                  icon="settings" 
                  onClick={() => navigateTo('/administrator')} 
                />
              </RequireRole>
              
              <div className="logout-wrapper">
                <CustomButton 
                  variant="cancel" 
                  label="Sair do Aplicativo" 
                  icon="logout" 
                  onClick={handleLogout} 
                />
              </div>
            </div>

            <div className="version-tag">
              &copy; 2026 Cursinho PES | Versão {appVersion}
            </div>
          </div>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};