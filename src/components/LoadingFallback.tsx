import React from 'react';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';

export const LoadingFallback: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <IonSpinner name="crescent" />
      </IonContent>
    </IonPage>
  );
};