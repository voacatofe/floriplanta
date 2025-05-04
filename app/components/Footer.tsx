"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#5b3a8c] text-white pt-16 pb-8 relative overflow-hidden">
      {/* Formas orgânicas decorativas */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#9a68c9]/20 rounded-full translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#d0f288]/10 rounded-full -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Logo e informações */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Image
                src="/logo-white.png"
                alt="Floriplanta"
                width={150}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="font-inter text-white/90 mb-6 leading-relaxed">
              Associação dedicada à promoção da cannabis medicinal 
              e ao suporte aos pacientes, através da educação, pesquisa 
              e advocacy por políticas públicas mais inclusivas.
            </p>
            <div className="flex gap-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Facebook size={18} />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Youtube size={18} />
              </Link>
            </div>
          </div>
          
          {/* Coluna 2: Links rápidos */}
          <div className="flex flex-col">
            <h3 className="font-futuru font-bold text-white text-xl mb-6">Links Rápidos</h3>
            <div className="flex flex-col gap-3">
              <Link href="/sobre" className="font-inter text-white/90 hover:text-white transition-colors">
                Sobre Nós
              </Link>
              <Link href="/cannabis" className="font-inter text-white/90 hover:text-white transition-colors">
                Cannabis Medicinal
              </Link>
              <Link href="/associar" className="font-inter text-white/90 hover:text-white transition-colors">
                Como se Associar
              </Link>
              <Link href="/blog" className="font-inter text-white/90 hover:text-white transition-colors">
                Blog e Notícias
              </Link>
              <Link href="/duvidas" className="font-inter text-white/90 hover:text-white transition-colors">
                Perguntas Frequentes
              </Link>
              <Link href="/contato" className="font-inter text-white/90 hover:text-white transition-colors">
                Contato
              </Link>
            </div>
          </div>
          
          {/* Coluna 3: Contato */}
          <div className="flex flex-col">
            <h3 className="font-futuru font-bold text-white text-xl mb-6">Contato</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d0f288] mt-1 flex-shrink-0" />
                <p className="font-inter text-white/90">
                  Rua Exemplo, 123, Bairro<br />
                  Florianópolis, SC - 88000-000
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#d0f288] flex-shrink-0" />
                <p className="font-inter text-white/90">(48) 99999-9999</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d0f288] flex-shrink-0" />
                <p className="font-inter text-white/90">contato@floriplanta.org</p>
              </div>
            </div>
          </div>
          
          {/* Coluna 4: Horários */}
          <div className="flex flex-col">
            <h3 className="font-futuru font-bold text-white text-xl mb-6">Horário de Atendimento</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="font-inter text-white/90">Segunda-Sexta:</p>
                <p className="font-inter text-white">09:00 - 18:00</p>
              </div>
              <div className="flex justify-between">
                <p className="font-inter text-white/90">Sábado:</p>
                <p className="font-inter text-white">10:00 - 14:00</p>
              </div>
              <div className="flex justify-between">
                <p className="font-inter text-white/90">Domingo:</p>
                <p className="font-inter text-white">Fechado</p>
              </div>
              <div className="h-px bg-white/20 my-3"></div>
              <div>
                <h4 className="font-futuru font-medium text-white mb-2">Newsletter</h4>
                <p className="font-inter text-white/90 text-sm mb-3">
                  Inscreva-se para receber novidades sobre cannabis medicinal e nossos eventos.
                </p>
                <form className="flex gap-2 mt-2">
                  <input 
                    type="email" 
                    placeholder="Seu email" 
                    className="px-3 py-2 rounded-lg text-sm bg-white/10 border border-white/20 focus:outline-none focus:border-[#d0f288] text-white placeholder-white/50 font-inter flex-grow"
                  />
                  <button 
                    type="submit"
                    className="bg-[#d0f288] text-[#5b3a8c] px-4 py-2 rounded-lg font-inter font-medium text-sm hover:bg-[#c8ec7a] transition-colors"
                  >
                    Inscrever
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-white/80 text-sm text-center md:text-left">
            © {currentYear} Floriplanta. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="font-inter text-white/80 text-sm hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="font-inter text-white/80 text-sm hover:text-white transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 