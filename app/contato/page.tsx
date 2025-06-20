"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Footer from "@/components/layout/Footer";
import { MapPin, Mail, Send, Instagram, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useGTM } from '@/hooks/useGTM';
import PageTracker from '@/components/PageTracker';
import {
  CONTACT_FORM_ID,
  FIELD_NAMES,
  FIELD_IDS,
  type ContactFormData
} from '@/app/lib/forms.config';

export default function ContatoPage() {
  const { trackFormStart, trackFormSubmit, trackContactClick } = useGTM();
  
  const initialFormData: ContactFormData = {
    [FIELD_NAMES.FULLNAME]: '',
    [FIELD_NAMES.EMAIL]: '',
    [FIELD_NAMES.PHONE]: '',
    [FIELD_NAMES.SUBJECT]: '',
    [FIELD_NAMES.MESSAGE]: '',
    [FIELD_NAMES.CONSENT]: false,
  };

  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (!hasStartedForm) {
      trackFormStart(CONTACT_FORM_ID, { [FIELD_NAMES.FORM_LOCATION]: 'contact-page' }); 
      setHasStartedForm(true);
    }
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData[FIELD_NAMES.CONSENT]) {
      toast.error("Você precisa concordar com os termos para continuar.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('loading');

    trackFormSubmit(CONTACT_FORM_ID, {
      [FIELD_NAMES.FORM_LOCATION]: 'contact-page',
      [FIELD_NAMES.SUBJECT]: formData[FIELD_NAMES.SUBJECT],
      has_phone: formData[FIELD_NAMES.PHONE] ? 'yes' : 'no'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
        setSubmitStatus('success');
        setFormData(initialFormData);
        setHasStartedForm(false);
      } else {
        const errorResult = await response.json().catch(() => ({}));
        toast.error(errorResult.message || 'Ocorreu um erro ao enviar sua mensagem.');
        console.error('Form submission error:', response.statusText, errorResult);
        setSubmitStatus('error');
      }
    } catch (error) {
      toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
      console.error('Form submission error (catch):', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <PageTracker pageName="Contato" pageCategory="Institucional" />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4 text-center">
          <Mail className="w-10 h-10 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Fale Conosco</h1>
          <p className="font-inter text-brand-purple/85 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
            Sua mensagem é importante para nós!
          </p>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Tem dúvidas, sugestões ou precisa de mais informações? A equipe da Floriplanta está à disposição para ajudar. Utilize o formulário abaixo ou escolha um dos nossos outros canais de atendimento.
          </p>
          <p className="font-inter text-sm text-brand-purple/70 mt-4 max-w-3xl mx-auto">
            Antes de enviar: Verifique nossa seção de <Link href="/cannabis/mitos-e-verdades" className="underline hover:text-brand-hover-purple">Perguntas Frequentes</Link> ou as páginas de <Link href="/associar" className="underline hover:text-brand-hover-purple">Associe-se</Link> e <Link href="/medicos" className="underline hover:text-brand-hover-purple">Para Profissionais</Link>.
          </p>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Contact Form */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-6">Envie sua Mensagem</h2>
              <form 
                id={CONTACT_FORM_ID}
                onSubmit={handleSubmit} 
                className="space-y-4 bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100"
              >
                <div>
                  <label htmlFor={FIELD_IDS.FULLNAME} className="block text-sm font-medium text-brand-purple/90 mb-1">Nome Completo *</label>
                  <input 
                    type="text" 
                    name={FIELD_NAMES.FULLNAME}
                    id={FIELD_IDS.FULLNAME}
                    required 
                    value={formData[FIELD_NAMES.FULLNAME]} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm" 
                  />
                </div>
                <div>
                  <label htmlFor={FIELD_IDS.EMAIL} className="block text-sm font-medium text-brand-purple/90 mb-1">E-mail *</label>
                  <input 
                    type="email" 
                    name={FIELD_NAMES.EMAIL}
                    id={FIELD_IDS.EMAIL}
                    required 
                    value={formData[FIELD_NAMES.EMAIL]} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm" 
                  />
                </div>
                <div>
                  <label htmlFor={FIELD_IDS.PHONE} className="block text-sm font-medium text-brand-purple/90 mb-1">Telefone/WhatsApp</label>
                  <input 
                    type="tel" 
                    name={FIELD_NAMES.PHONE}
                    id={FIELD_IDS.PHONE}
                    value={formData[FIELD_NAMES.PHONE]} 
                    onChange={handleChange} 
                    placeholder="(XX) XXXXX-XXXX" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm" 
                  />
                </div>
                <div>
                  <label htmlFor={FIELD_IDS.SUBJECT} className="block text-sm font-medium text-brand-purple/90 mb-1">Assunto *</label>
                  <select 
                    name={FIELD_NAMES.SUBJECT}
                    id={FIELD_IDS.SUBJECT}
                    required 
                    value={formData[FIELD_NAMES.SUBJECT]} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm bg-white"
                  >
                    <option value="" disabled>Selecione um assunto</option>
                    <option value="Dúvidas Gerais">Dúvidas Gerais</option>
                    <option value="Associação">Associação</option>
                    <option value="Parcerias">Parcerias</option>
                    <option value="Imprensa">Imprensa</option>
                    <option value="Loja">Loja (Merchandising)</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={FIELD_IDS.MESSAGE} className="block text-sm font-medium text-brand-purple/90 mb-1">Sua Mensagem *</label>
                  <textarea 
                    name={FIELD_NAMES.MESSAGE}
                    id={FIELD_IDS.MESSAGE}
                    rows={5} 
                    required 
                    value={formData[FIELD_NAMES.MESSAGE]} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50 focus:border-brand-purple text-sm"
                  ></textarea>
                </div>
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    name={FIELD_NAMES.CONSENT}
                    id={FIELD_IDS.CONSENT}
                    checked={formData[FIELD_NAMES.CONSENT]} 
                    onChange={handleChange} 
                    className="h-4 w-4 text-brand-purple border-gray-300 rounded focus:ring-brand-purple mt-1 mr-2" 
                  />
                  <label htmlFor={FIELD_IDS.CONSENT} className="text-xs text-brand-purple/80">
                    Concordo com o uso dos meus dados conforme a <Link href="/privacidade" className="underline hover:text-brand-hover-purple">Política de Privacidade</Link>. *
                  </label>
                </div>
                <div>
                  <button 
                    type="submit"
                    name="submit" 
                    disabled={isSubmitting || !formData[FIELD_NAMES.CONSENT]}
                    className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-purple hover:bg-brand-hover-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    <Send className="w-5 h-5 ml-2" />
                  </button>
                </div>
                {submitStatus === 'success' && (
                  <p className="text-sm text-center text-green-600 bg-green-100 p-3 rounded-md">Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-md">Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.</p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="w-full lg:w-1/2">
              <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-6">Nossos Contatos</h2>
              <div className="space-y-6 font-inter text-brand-purple/90">
                <div className="flex items-start">
                  <MessageCircle className="w-5 h-5 mr-3 mt-1 text-brand-purple flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <a 
                      href="https://wa.me/5548988078312" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-brand-hover-purple"
                      onClick={() => trackContactClick('whatsapp', 'contact-page')}
                    >
                      (48) 98807-8312
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-1 text-brand-purple flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <a 
                      href="mailto:contato@floriplanta.com" 
                      className="hover:text-brand-hover-purple"
                      onClick={() => trackContactClick('email', 'contact-page')}
                    >
                      contato@floriplanta.com
                    </a>
                    <p className="text-xs text-brand-purple/70 mt-1">Para assuntos específicos (Associação, Parcerias, Loja), use o seletor de assunto no formulário.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-brand-purple flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Nosso Endereço</h3>
                    <p>Rua Laurindo Januário da Silveira, 3695</p>
                    <p>Canto da Lagoa, Florianópolis - SC</p>
                    <p>88062-201</p>
                    <p className="text-xs text-brand-purple/70 mt-1">*(Atendimento presencial apenas com agendamento prévio)*</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                 <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-4">Siga-nos</h2>
                 <div className="flex space-x-5">
                    <a 
                      href="https://www.instagram.com/flori.planta/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-brand-purple hover:text-brand-hover-purple transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                 </div>
              </div>

              {/* Optional Map - Commented out for now 
              <div className="mt-10 pt-6 border-t border-gray-200">
                 <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-4">Onde Estamos</h2>
                 <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.809543160853!2d-48.5189686849398!3d-27.5998709828368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95273800f7f5e6b1%3A0x8b3e4a6a1f7b8c5d!2sFlorian%C3%B3polis%2C%20SC!5e0!3m2!1sen!2sbr!4v1678886400000!5m2!1sen!2sbr" 
                     width="100%" 
                     height="100%" 
                     style={{ border:0 }} 
                     allowFullScreen={true} 
                     loading="lazy" 
                     referrerPolicy="no-referrer-when-downgrade">
                   </iframe>
                 </div>
              </div>
              */}

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

