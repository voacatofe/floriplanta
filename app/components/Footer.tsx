"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-purple text-white pt-16 pb-8 relative overflow-hidden">
      {/* Formas orgânicas decorativas - Ajuste de opacidade e posicionamento */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-brand-hover-purple/10 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] md:w-[35vw] md:h-[35vw] bg-brand-light-green/5 rounded-full -translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Ajuste no gap para melhor espaçamento em telas menores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Coluna 1: Logo e informações */}
          <div className="flex flex-col">
            <div className="mb-6">
              {/* Usar um logo específico para fundo escuro se disponível, ou garantir contraste */}
              <Image
                src="/Logomarca 1.svg" // Assumindo que Logomarca 1 é a versão branca/clara
                alt="Floriplanta Logo"
                width={150}
                height={60} // Ajustar altura se necessário
                className="object-contain h-auto" // Permitir ajuste automático da altura
              />
            </div>
            <p className="font-inter text-white/90 mb-6 leading-relaxed text-sm">
              Associação dedicada à promoção da cannabis medicinal 
              e ao suporte aos pacientes, através da educação, pesquisa 
              e advocacy por políticas públicas mais inclusivas.
            </p>
            {/* Ícones sociais com melhor espaçamento e transição */}
            <div className="flex gap-3">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Floriplanta"
                className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200">
                <Instagram size={18} />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Floriplanta"
                className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200">
                <Facebook size={18} />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube da Floriplanta"
                className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200">
                <Youtube size={18} />
              </Link>
            </div>
          </div>
          
          {/* Coluna 2: Links rápidos */}
          <div className="flex flex-col">
            <h3 className="font-futuru font-bold text-white text-lg mb-5">Links Rápidos</h3>
            <div className="flex flex-col gap-3">
              <Link href="/sobre" className="font-inter text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm">
                Sobre Nós
              </Link>
              <Link href="/cannabis" className="font-inter text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm">
                Cannabis Medicinal
              </Link>
              <Link href="/associar" className="font-inter text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm">
                Como se Associar
              </Link>
              <Link href="/blog" className="font-inter text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm">
                Blog e Notícias
              </Link>
              <Link href="/duvidas" className="font-inter text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm">
                Perguntas Frequentes
              </Link>
              <Link href="/contato" className="font-inter text-white/90 hover:text-white hover:underline transition-colors duration-200 text-sm">
                Contato
              </Link>
            </div>
          </div>
          
          {/* Coluna 3: Contato */}
          <div className="flex flex-col">
            <h3 className="font-futuru font-bold text-white text-lg mb-5">Contato</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-light-green mt-0.5 flex-shrink-0" />
                <p className="font-inter text-white/90 text-sm">
                  Rua Exemplo, 123, Bairro<br />
                  Florianópolis, SC - 88000-000
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-light-green flex-shrink-0" />
                <a href="tel:+5548999999999" className="font-inter text-white/90 hover:text-white transition-colors duration-200 text-sm">(48) 99999-9999</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-light-green flex-shrink-0" />
                <a href="mailto:contato@floriplanta.org" className="font-inter text-white/90 hover:text-white transition-colors duration-200 text-sm">contato@floriplanta.org</a>
              </div>
            </div>
          </div>
          
          {/* Coluna 4: Horários e Newsletter */}
          <div className="flex flex-col">
            <h3 className="font-futuru font-bold text-white text-lg mb-5">Horário</h3>
            <div className="flex flex-col gap-2 text-sm mb-5">
              <div className="flex justify-between">
                <p className="font-inter text-white/90">Segunda-Sexta:</p>
                <p className="font-inter text-white font-medium">09:00 - 18:00</p>
              </div>
              <div className="flex justify-between">
                <p className="font-inter text-white/90">Sábado:</p>
                <p className="font-inter text-white font-medium">10:00 - 14:00</p>
              </div>
              <div className="flex justify-between">
                <p className="font-inter text-white/90">Domingo:</p>
                <p className="font-inter text-white font-medium">Fechado</p>
              </div>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="font-futuru font-semibold text-white mb-2 text-base">Newsletter</h4>
              <p className="font-inter text-white/90 text-sm mb-3">
                Receba novidades sobre cannabis medicinal e nossos eventos.
              </p>
              <form className="flex flex-col sm:flex-row gap-2 mt-2">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input 
                  id="footer-email"
                  type="email" 
                  placeholder="Seu melhor email" 
                  required
                  className="px-3 py-2 rounded-lg text-sm bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-brand-light-green focus:border-transparent text-white placeholder-white/60 font-inter flex-grow"
                />
                <button 
                  type="submit"
                  className="bg-brand-light-green text-brand-purple px-4 py-2 rounded-lg font-inter font-semibold text-sm hover:bg-[#c0e86e] transition-colors duration-200 transform hover:scale-105 active:scale-95"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Linha divisória e links inferiores */}
        <div className="border-t border-white/15 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-white/80 text-xs text-center md:text-left">
            © {currentYear} Floriplanta. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 md:gap-6">
            <Link href="/privacidade" className="font-inter text-white/80 text-xs hover:text-white hover:underline transition-colors duration-200">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="font-inter text-white/80 text-xs hover:text-white hover:underline transition-colors duration-200">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

