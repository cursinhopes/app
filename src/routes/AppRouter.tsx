import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonRouterOutlet } from '@ionic/react';

import { publicRoutes } from './publicRoutes';
import { commonRoutes } from './commonRoutes';
import { adminRoutes } from './adminRoutes';
import { memberRoutes } from './memberRoutes';
//import { studentRoutes } from './studentRoutes';

export const AppRouter: React.FC = () => {
  return (
    <IonReactRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <IonRouterOutlet>
        {publicRoutes}
        {commonRoutes}
        {adminRoutes}
        {memberRoutes}
      </IonRouterOutlet>
    </IonReactRouter>
  );
};