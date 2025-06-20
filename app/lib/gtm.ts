import TagManager from 'react-gtm-module';

// Configuração do GTM
export const GTM_ID = 'GTM-NT2XKHTD';

// Tipos para eventos customizados
export interface GTMEvent {
  event: string;
  [key: string]: string | number | boolean | undefined | object;
}

// Inicializar GTM
export const initializeGTM = () => {
  const tagManagerArgs = {
    gtmId: GTM_ID,
    dataLayer: {
      page: 'home',
      userId: undefined, // Será preenchido quando o usuário estiver logado
    },
    dataLayerName: 'dataLayer',
  };

  TagManager.initialize(tagManagerArgs);
};

// Enviar eventos para o GTM
export const sendGTMEvent = (event: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event);
  }
};

// Eventos pré-definidos para consistência
export const GTMEvents = {
  // Eventos de navegação
  pageView: (pageName: string, pageCategory?: string) => ({
    event: 'page_view',
    page_name: pageName,
    page_category: pageCategory,
  }),

  // Eventos de clique
  clickButton: (buttonName: string, location: string) => ({
    event: 'click_button',
    button_name: buttonName,
    click_location: location,
  }),

  // Eventos de formulário
  formStart: (formName: string) => ({
    event: 'form_start',
    form_name: formName,
  }),

  formSubmit: (formName: string, formData?: Record<string, string | number | boolean>) => ({
    event: 'form_submit',
    form_name: formName,
    form_data: formData,
  }),

  // Eventos de newsletter
  newsletterSubscribe: (email: string, location: string) => ({
    event: 'newsletter_subscribe',
    user_email: email,
    subscribe_location: location,
  }),

  // Eventos de contato
  contactClick: (contactType: 'whatsapp' | 'email' | 'phone', location: string) => ({
    event: 'contact_click',
    contact_type: contactType,
    click_location: location,
  }),

  // Eventos de blog
  blogPostView: (postTitle: string, postCategory: string, postAuthor: string) => ({
    event: 'blog_post_view',
    post_title: postTitle,
    post_category: postCategory,
    post_author: postAuthor,
  }),

  blogPostShare: (postTitle: string, shareMethod: string) => ({
    event: 'blog_post_share',
    post_title: postTitle,
    share_method: shareMethod,
  }),

  // Eventos de associação
  associationStart: () => ({
    event: 'association_start',
  }),

  associationComplete: (membershipType: string) => ({
    event: 'association_complete',
    membership_type: membershipType,
  }),

  // Eventos de produtos
  productView: (productName: string, productCategory: string) => ({
    event: 'product_view',
    product_name: productName,
    product_category: productCategory,
  }),
};

// Declaração global para TypeScript
declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
} 