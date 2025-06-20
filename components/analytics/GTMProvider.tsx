"use client";

import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import PageTracker from './PageTracker';

interface GTMProviderProps {
  children: React.ReactNode;
}

const GTMProvider: React.FC<GTMProviderProps> = ({ children }) => {
  useEffect(() => {
    // Inicializa o GTM apenas no cliente
    if (typeof window !== 'undefined') {
      const tagManagerArgs = {
        gtmId: 'GTM-NT2XKHTD',
        dataLayer: {
          // Dados iniciais do dataLayer
          website: 'floriplanta.com',
          version: '1.0.0',
          user_type: 'visitor', // Pode ser atualizado quando o usuário fizer login
        },
      };

      TagManager.initialize(tagManagerArgs);
      
      // Log para debug (remover em produção se necessário)
      if (process.env.NODE_ENV === 'development') {
        console.log('GTM Initialized with ID: GTM-NT2XKHTD');
      }
    }
  }, []);

  return (
    <>
      <PageTracker />
      {children}
    </>
  );
};

export default GTMProvider; 