import React from 'react';
import { IonContent, IonText } from '@ionic/react';

const Unauthorized: React.FC = () => {

  return (
    <IonContent className="ion-padding">
    <IonText>
        <h2>403 - Acesso Proibido!</h2>
        <p>Você não tem permição para acessar essa página.</p>
    </IonText>
    </IonContent>
  );
};

export default Unauthorized;