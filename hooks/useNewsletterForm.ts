import { useState, FormEvent } from 'react';
import { toast } from 'sonner';
import {
  NEWSLETTER_FORM_ID,
  FIELD_NAMES,
  type FormLocation,
} from '@/app/lib/forms.config';
import { useGTM } from '@/hooks/useGTM';

interface UseNewsletterFormProps {
  formLocation: FormLocation;
  requireConsent?: boolean;
}

interface NewsletterFormState {
  [FIELD_NAMES.EMAIL]: string;
  [FIELD_NAMES.CONSENT]?: boolean;
}

export function useNewsletterForm({ formLocation, requireConsent = false }: UseNewsletterFormProps) {
  const { trackFormStart, trackFormSubmit } = useGTM();
  const [formData, setFormData] = useState<NewsletterFormState>({
    [FIELD_NAMES.EMAIL]: '',
    ...(requireConsent && { [FIELD_NAMES.CONSENT]: false }),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (!hasStartedForm) {
      trackFormStart(NEWSLETTER_FORM_ID, { [FIELD_NAMES.FORM_LOCATION]: formLocation });
      setHasStartedForm(true);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (requireConsent && !formData[FIELD_NAMES.CONSENT]) {
      toast.error('Você precisa concordar com os termos para se inscrever.');
      return;
    }

    const emailValue = formData[FIELD_NAMES.EMAIL];
    if (!emailValue) {
      toast.error('Por favor, insira seu e-mail.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      toast.error('Por favor, insira um e-mail válido.');
      return;
    }

    setIsSubmitting(true);

    const gtmFormData: Record<string, string | boolean> = {
      [FIELD_NAMES.FORM_LOCATION]: formLocation,
      email_provided: !!emailValue,
      [FIELD_NAMES.EMAIL]: emailValue,
    };
    if (requireConsent && formData[FIELD_NAMES.CONSENT] !== undefined) {
      gtmFormData[FIELD_NAMES.CONSENT] = formData[FIELD_NAMES.CONSENT]!;
    }

    trackFormSubmit(NEWSLETTER_FORM_ID, gtmFormData);

    setTimeout(() => {
      toast.success('Obrigado por se inscrever! Fique de olho na sua caixa de entrada.');
      setFormData({
        [FIELD_NAMES.EMAIL]: '',
        ...(requireConsent && { [FIELD_NAMES.CONSENT]: false }),
      });
      setHasStartedForm(false);
      setIsSubmitting(false);
    }, 300);
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
} 