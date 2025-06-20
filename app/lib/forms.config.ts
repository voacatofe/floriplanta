// app/lib/forms.config.ts

// --- FORM IDs ---
export const NEWSLETTER_FORM_ID = 'newsletter-form';
export const CONTACT_FORM_ID = 'contact-form';

// --- FIELD NAMES (para chaves de estado e dados de backend) ---
export const FIELD_NAMES = {
  EMAIL: 'email',
  FULLNAME: 'fullName',
  PHONE: 'phone',
  SUBJECT: 'subject',
  MESSAGE: 'message',
  CONSENT: 'consent',
  FORM_LOCATION: 'formLocation',
} as const; // 'as const' para tipos literais mais precisos

// --- FIELD IDs (para atributos 'id' e 'htmlFor' no HTML) ---
export const FIELD_IDS = {
  EMAIL: 'form-email',
  FULLNAME: 'form-fullName',
  PHONE: 'form-phone',
  SUBJECT: 'form-subject',
  MESSAGE: 'form-message',
  CONSENT: 'form-consent',
} as const;

// --- TIPOS DE DADOS ---
export interface NewsletterFormData {
  [FIELD_NAMES.EMAIL]: string;
  [FIELD_NAMES.FORM_LOCATION]?: string;
  [FIELD_NAMES.CONSENT]?: boolean;
}

export interface ContactFormData {
  [FIELD_NAMES.FULLNAME]: string;
  [FIELD_NAMES.EMAIL]: string;
  [FIELD_NAMES.PHONE]?: string;
  [FIELD_NAMES.SUBJECT]: string;
  [FIELD_NAMES.MESSAGE]: string;
  [FIELD_NAMES.CONSENT]: boolean;
}

// Para rastreamento GTM ou identificação de formulários
export type FormIdentifier = 
  | typeof NEWSLETTER_FORM_ID 
  | typeof CONTACT_FORM_ID;

export type FormLocation = 
  | 'footer' 
  | 'cta-section' 
  | 'blog-sidebar' 
  | 'contact-page'; 