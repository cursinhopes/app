import React, { useState } from 'react';
import { IonContent, IonText } from '@ionic/react';
import axios from 'axios';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { api } from '@services/api';
// Importação do seu botão customizado (ajuste o path conforme sua estrutura)
import { CustomButton } from '@components/CustomButton';

const ScanCode: React.FC = () => {
  const [scanStatus, setScanStatus] = useState<{ type: 'idle' | 'success' | 'error', message: string }>({
    type: 'idle',
    message: ''
  });

  const handleScan = async () => {
    let scannedCode;

    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.QR_CODE
      });

      if (!result || !result.ScanResult) {
        return;
      }
      
      scannedCode = result.ScanResult;
    } catch {
      return; 
    }

    const qrCodeRegex = /^PES\d{8}$/;
    if (!qrCodeRegex.test(scannedCode)) {
      setScanStatus({ type: 'error', message: 'QR code inválido.' });
      return;
    }

    setScanStatus({ type: 'idle', message: 'Processando...' });

    try {
      const payload = {
        code: scannedCode,
        timestamp: Date.now()
      };

      const response = await api.post('/student/save-presence', payload);

      if (response.data?.status === 'success') {
        setScanStatus({
          type: 'success',
          message: response.data.data.message
        });
      } else {
        setScanStatus({
          type: 'error',
          message: response.data?.message || 'Falha ao processar o registro.'
        });
      }

    } catch (error: unknown) {

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          // O servidor respondeu com um erro HTTP (ex: 400, 404, 500)
          setScanStatus({
            type: 'error',
            message: error.response.data.message || 'Dados de envio incorretos.'
          });
        } else {
          // O servidor NÃO respondeu (Erro de Rede, CORS, Servidor Offline)
          setScanStatus({
            type: 'error',
            message: `Falha de rede/CORS: ${error.message}`
          });
        }
      } else {
        setScanStatus({
          type: 'error',
          message: 'Ocorreu um erro desconhecido no aplicativo.'
        });
      }
    }
  };

  return (
      <IonContent className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height:'100%' }}>

          <h2>Registrar presença</h2>
          
          <CustomButton 
            style={{marginTop:'16px'}}
            variant="confirm"
            label="Escanear QR code"
            icon="qr_code"
            onClick={handleScan}>
          </CustomButton>

          {scanStatus.type !== 'idle' && (
            <div style={{ marginTop: '24px', textAlign: 'center', padding: '0 16px' }}>
              <IonText color={scanStatus.type === 'success' ? 'success' : 'danger'}>
                <strong>{scanStatus.message}</strong>
              </IonText>
            </div>
          )}

        </div>
      </IonContent>
  );
};

export default ScanCode;