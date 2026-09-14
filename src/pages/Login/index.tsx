import React, { useState } from 'react';
import { 
  IonPage, 
  IonContent, 
  IonInput, 
  IonText, 
  IonGrid, 
  IonRow, 
  IonCol,
  IonButton,
} from '@ionic/react';
import { useAuth } from '../../contexts/AuthContext';
import { authenticate } from '../../features/auth/services/authService';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/CustomButton';
import { isValidCPF } from '../../utils/validators';
import logoPes from '../../assets/img/logo-pes-circle.png';
import './style.scss';

const Login: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!cpf.trim() || !password.trim()) {
      setErrorMsg('Preencha todos os campos.');
      return;
    }

    if (!isValidCPF(cpf)) {
      setErrorMsg('Informe um CPF válido.');
      return;
    }

    if (password.length < 8 || password.length > 20) {
      setErrorMsg('A senha deve ter entre 8 e 20 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await authenticate({ user: cpf, password });
      await signIn(response);
      navigate('/home', { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao efetuar login.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="bg-drawn">
        <div className="login-wrapper">
          <div className="login-card">
            <IonGrid>
              <IonRow className="ion-align-items-center">
                
                {/* Coluna da Logo */}
                <IonCol size="12" sizeMd="6">
                  <img 
                    src={logoPes}
                    className="logo-pes" 
                    alt="Logo Cursinho PES" 
                  />
                </IonCol>

                {/* Coluna do Formulário */}
                <IonCol size="12" sizeMd="6">
                  <div className="auth-form-container">
                    <IonText className="ion-text-center ion-margin-bottom">
                      <h4 style={{ margin: 0, fontWeight: 'bold', color: '#212529' }}>Seja bem-vindo!</h4>
                      <h6 style={{ margin: '8px 0 0', color: '#6c757d' }}>Realize o login para continuar</h6>
                    </IonText>

                    <form onSubmit={handleLogin}>
                      <IonInput
                        label="CPF:"
                        labelPlacement="stacked"
                        placeholder="Digite apenas números"
                        value={cpf}
                        onIonInput={e => {
                          const val = e.detail.value || '';
                          const numericVal = val.replace(/\D/g, '');
                          setCpf(numericVal);
                          if (errorMsg) setErrorMsg('');
                        }}
                        maxlength={11}
                        inputMode="numeric"
                        className="ion-margin-bottom"
                        disabled={loading}
                      />

                      <IonInput
                        label="Senha:"
                        labelPlacement="stacked"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Sua senha"
                        value={password}
                        onIonInput={e => {
                          setPassword(e.detail.value!);
                          if (errorMsg) setErrorMsg('');
                        }}
                        className="ion-margin-bottom"
                        disabled={loading}
                      >
                        <IonButton 
                          fill="clear" 
                          slot="end" 
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                          <span className="material-symbols-outlined" style={{ color: '#6c757d' }}>
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </IonButton>
                      </IonInput>

                      {errorMsg && (
                        <IonText color="danger">
                          <small style={{ display: 'block', textAlign: 'center', fontWeight: 'bold' }}>
                            {errorMsg}
                          </small>
                        </IonText>
                      )}

                      <div className="action-buttons">
                        <CustomButton 
                          type="submit" 
                          variant="confirm" 
                          label={loading ? 'Aguarde...' : 'Entrar'} 
                          icon={loading ? '' : 'login'} 
                          iconPosition="right" 
                          disabled={loading}
                        />
                      </div>
                    </form>
                  </div>
                </IonCol>

              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;