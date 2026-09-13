import React, { useState } from 'react';
import { 
  IonPage, IonContent, IonInput, IonButton, IonItem, IonList, IonText, IonSpinner, IonHeader, IonToolbar, IonTitle 
} from '@ionic/react';
import { authenticate } from '../features/auth/services/authService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await authenticate({ user, password });
      await signIn(response);
      navigate('/home', { replace: true });
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Acesso</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonInput 
              label="Usuário" 
              labelPlacement="floating" 
              value={user} 
              onIonInput={e => setUser(e.detail.value!)} 
            />
          </IonItem>
          <IonItem>
            <IonInput 
              label="Senha" 
              labelPlacement="floating" 
              type="password" 
              value={password} 
              onIonInput={e => setPassword(e.detail.value!)} 
            />
          </IonItem>
        </IonList>

        {errorMsg && (
          <IonText color="danger">
            <p style={{ textAlign: 'center' }}>{errorMsg}</p>
          </IonText>
        )}

        <IonButton expand="block" className="ion-margin-top" onClick={handleLogin} disabled={loading}>
          {loading ? <IonSpinner name="dots" /> : 'Entrar'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;