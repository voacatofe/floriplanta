import { useCallback } from 'react';
import TagManager from 'react-gtm-module';

export interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | undefined;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
  page_path: string;
  content_group1?: string; // Categoria da página
  content_group2?: string; // Subcategoria
}

export interface UserActionEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

const useGTM = () => {
  // Enviar evento personalizado
  const trackEvent = useCallback((eventData: GTMEvent) => {
    if (typeof window !== 'undefined') {
      TagManager.dataLayer({
        dataLayer: eventData,
      });
    }
  }, []);

  // Rastrear visualização de página
  const trackPageView = useCallback((pageData: PageViewEvent) => {
    trackEvent({
      event: 'page_view',
      ...pageData,
    });
  }, [trackEvent]);

  // Rastrear ações do usuário (cliques, downloads, etc.)
  const trackUserAction = useCallback((actionData: UserActionEvent) => {
    trackEvent({
      event: 'user_action',
      action: actionData.action,
      category: actionData.category,
      label: actionData.label,
      value: actionData.value,
    });
  }, [trackEvent]);

  // Eventos específicos para Cannabis Medicinal
  const trackCannabisMedicinalEvent = useCallback((eventType: string, data?: Record<string, string | number | boolean>) => {
    trackEvent({
      event: 'cannabis_medicinal_interaction',
      interaction_type: eventType,
      ...data,
    });
  }, [trackEvent]);

  // Rastrear formulários
  const trackFormSubmission = useCallback((formName: string, success: boolean, errorMessage?: string) => {
    trackEvent({
      event: 'form_submission',
      form_name: formName,
      submission_success: success,
      error_message: errorMessage,
    });
  }, [trackEvent]);

  // Rastrear downloads
  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackEvent({
      event: 'file_download',
      file_name: fileName,
      file_type: fileType,
    });
  }, [trackEvent]);

  // Rastrear newsletter signup
  const trackNewsletterSignup = useCallback((source: string) => {
    trackEvent({
      event: 'newsletter_signup',
      signup_source: source,
    });
  }, [trackEvent]);

  // Rastrear navegação externa
  const trackExternalLink = useCallback((url: string, linkText?: string) => {
    trackEvent({
      event: 'external_link_click',
      external_url: url,
      link_text: linkText,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackUserAction,
    trackCannabisMedicinalEvent,
    trackFormSubmission,
    trackDownload,
    trackNewsletterSignup,
    trackExternalLink,
  };
};

export default useGTM; 