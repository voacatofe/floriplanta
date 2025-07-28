'use client';

import React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { useNewsletterForm } from '@/hooks/useNewsletterForm';
import {
  NEWSLETTER_FORM_ID,
  FIELD_NAMES,
  FIELD_IDS,
} from '@/app/lib/forms.config';

export default function CtaNewsletterSection() {
  const uniqueInputId = `${FIELD_IDS.EMAIL}-cta`;

  const {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useNewsletterForm({ formLocation: 'cta-section' });

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-brand-purple to-brand-hover-purple text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full opacity-50"></div>
      <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-brand-light-green/10 rounded-full opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-futuru font-bold text-3xl lg:text-4xl mb-4">Faça Parte da Transformação</h2>
          <p className="font-inter text-base lg:text-lg opacity-90 leading-relaxed mb-8">
            Junte-se à Floriplanta e contribua para um futuro com mais saúde, informação e acesso à cannabis medicinal. Associe-se ou receba nossas novidades!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
            <Link 
              href="/associar" 
              className="bg-brand-light-green text-brand-purple px-6 py-3 rounded-lg font-inter font-semibold hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Associe-se Agora
            </Link>
            {/* Optional: Add another primary CTA if needed */}
          </div>

          {/* Newsletter Form */}
          <div className="max-w-lg mx-auto">
            <h3 className="font-inter font-semibold mb-3">Receba nossas novidades:</h3>
            <form 
              id={NEWSLETTER_FORM_ID}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <label htmlFor={uniqueInputId} className="sr-only">Email</label>
              <input 
                type="email" 
                name={FIELD_NAMES.EMAIL}
                id={uniqueInputId}
                value={formData[FIELD_NAMES.EMAIL]}
                onChange={handleChange}
                placeholder="Seu melhor e-mail"
                required
                className="flex-grow px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-light-green"
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className="bg-white text-brand-purple px-5 py-2 rounded-md font-inter font-medium inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-300"
                disabled={isSubmitting}
              >
                <Mail className="w-4 h-4" />
                {isSubmitting ? 'Inscrevendo...' : 'Inscrever'}
              </button>
            </form>
            <p className="text-xs opacity-70 mt-3">
              Respeitamos sua privacidade. Não enviamos spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

