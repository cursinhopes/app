import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText } from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { nickname, roles, signOut } = useAuth();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Área Restrita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText>
          <h2>Bem-vindo, {nickname}!</h2>
          <p>Seus perfis de acesso: <strong>{roles.join(', ')}</strong></p>
        </IonText>
        <IonButton expand="block" color="danger" className="ion-margin-top" onClick={signOut}>
          Sair
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;