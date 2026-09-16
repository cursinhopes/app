import React from 'react';
import { IonContent, IonText } from '@ionic/react';
import { useAuth } from '../../contexts/AuthContext';
import { RequireRole } from '@components/RequireRole';
import { UserRoleUtils } from '@features/auth/enums/UserRole';
import { CustomButton } from '@components/CustomButton';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const { nickname, roles} = useAuth();
  const navigate = useNavigate();

  return (
    <IonContent className="ion-padding">
      <IonText>
        <h2>Bem-vindo, {nickname}!</h2>
        <br />
        <p>Seus perfis de acesso: <strong>{roles.map(role => UserRoleUtils.getLabel(role)).join(', ')}</strong></p>
        <br />
        <p>Selecione a opção desejada:</p>
      </IonText>
      <RequireRole allowedRoles={UserRoleUtils.members()}>
        <CustomButton 
          variant="confirm" 
          label="Registrar Presença" 
          icon="qr_code" 
          onClick={() => navigate('/scan-code')} 
        />
      </RequireRole>
      <IonText>
        <p>Mais opções disponíveis no menu <span className="material-symbols-outlined"> menu </span> acima.</p>
      </IonText>
    </IonContent>
    
  );
};

export default Home;