'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';
import {
  NEWSLETTER_FORM_ID,
  FIELD_NAMES,
  FIELD_IDS,
} from '@/app/lib/forms.config';

export default function BlogSidebarNewsletterForm() {
  const uniqueInputId = `${FIELD_IDS.EMAIL}-blog-sidebar`;

  const {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useNewsletterForm({ formLocation: 'blog-sidebar' });

  return (
    <div className="bg-brand-purple p-6 rounded-lg shadow-md text-white">
      <h3 className="font-futuru font-bold mb-3 text-lg flex items-center">
        <Mail className="w-5 h-5 mr-2" />
        Receba Novidades
      </h3>
      <p className="font-inter text-sm mb-4">
        Assine nossa newsletter para ficar por dentro das últimas notícias e artigos.
      </p>
      <form 
        id={NEWSLETTER_FORM_ID} 
        onSubmit={handleSubmit} 
        className="space-y-3"
      >
        <div>
          <label htmlFor={uniqueInputId} className="sr-only">
            Seu melhor e-mail
          </label>
          <input 
            type="email" 
            name={FIELD_NAMES.EMAIL}
            id={uniqueInputId}
            value={formData[FIELD_NAMES.EMAIL]}
            onChange={handleChange}
            placeholder="Seu melhor e-mail" 
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2 border border-brand-purple/50 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-sm text-brand-purple"
          />
        </div>
        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-light-green text-brand-purple font-semibold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors duration-300"
        >
          {isSubmitting ? 'Enviando...' : 'Assinar'}
        </button>
      </form>
    </div>
  );
} 