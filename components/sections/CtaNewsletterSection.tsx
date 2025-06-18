"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function CtaNewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Por favor, insira seu e-mail.");
      return;
    }
    // console.log('Subscribing email:', email);
    toast.success(`Obrigado por se inscrever, ${email}!`);
    setEmail("");
  };

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
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email</label>
              <input 
                type="email" 
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                required
                className="flex-grow px-4 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-light-green"
              />
              <button 
                type="submit" 
                className="bg-white text-brand-purple px-5 py-2 rounded-md font-inter font-medium inline-flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                Inscrever
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

