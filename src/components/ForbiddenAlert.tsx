import React, { useEffect, useState } from 'react';
import { IonAlert } from '@ionic/react';

export const ForbiddenAlert: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleForbidden = (event: Event) => {
      const customEvent = event as CustomEvent;
      setMessage(customEvent.detail);
      setIsOpen(true);
    };

    window.addEventListener('api-forbidden', handleForbidden);

    return () => {
      window.removeEventListener('api-forbidden', handleForbidden);
    };
  }, []);

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={() => setIsOpen(false)}
      header="Acesso Negado"
      message={message}
      buttons={['Voltar']}
    />
  );
};