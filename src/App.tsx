import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { PrivateRoute } from './routes/PrivateRoute';
import { ForbiddenAlert } from './components/ForbiddenAlert';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

setupIonicReact();

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // Previne saltos de rota enquanto o storage carrega

  return (
    <IonReactRouter>
      <Suspense fallback={<div />}>
        <IonRouterOutlet>
          {/* Rotas Públicas */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
          
          {/* Rotas Privadas */}
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          
          {/* Redirecionamento Inicial */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
        </IonRouterOutlet>
      </Suspense>
    </IonReactRouter>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <AppRoutes />
      <ForbiddenAlert />
    </AuthProvider>
  </IonApp>
);

export default App;