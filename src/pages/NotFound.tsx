import React from 'react';
import { IonPage, IonContent, IonText } from '@ionic/react';
import { CustomButton } from '@/components/CustomButton';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    // Redireciona para a raiz. O RootRedirect decidirá se envia para /home ou /login
    navigate('/', { replace: true });
  };

  return (
    <IonPage>
      
      <IonContent className="ion-padding">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center', 
          height: '100%'
        }}>
          <IonText color="medium">
            <h2>Funcionalidade não implementada</h2>
            <p>O recurso que você está tentando acessar não existe ou ainda não está disponível no aplicativo.</p>
          </IonText>
          
          <CustomButton 
            className="ion-margin-top"
            type="submit" 
            variant="confirm" 
            label='RETORNAR A TELA INICIAL' 
            icon='home'
            iconPosition="right" 
            onClick={handleReturn}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;