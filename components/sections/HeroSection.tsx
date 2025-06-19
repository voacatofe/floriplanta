"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';
import OrganicFloatingElements from '../ui/OrganicFloatingElements';

// Consider adding a library like 'react-intersection-observer' or 'framer-motion' 
// for more sophisticated scroll animations if needed, but for now, 
// we'll rely on CSS transitions where applicable.

export default function HeroSection() {
  return (
    // Increased padding for more breathing room, especially on larger screens
    <section 
      className="min-h-screen py-12 lg:py-16 relative overflow-hidden flex items-center"
      style={{
        backgroundImage: 'url(/familia1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay para melhorar legibilidade do texto */}
      <div className="absolute inset-0 "></div>
      
      {/* Elementos flutuantes orgânicos */}
      <OrganicFloatingElements />
      
      {/* Fundo verde suave */}
{/*       <div className="absolute inset-0 bg-[#e8f7c0]/60 rounded-[70%_30%_50%_50%] w-[95%] h-[100%] mx-auto pointer-events-none"></div>
 */}      
      {/* Formas decorativas orgânicas - slightly adjusted opacity */}
      <div className="absolute -top-20 -left-20 w-32 h-32 bg-brand-light-green rounded-full opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[25%] left-20 w-28 h-28 bg-brand-light-green rounded-full opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Ícone - mantido */}
          <div className="hidden lg:flex absolute top-0 left-10 z-20">
            <div className="bg-brand-light-green w-16 h-16 rounded-full flex items-center justify-center shadow-sm">
              <Leaf className="w-8 h-8 text-brand-purple" />
            </div>
          </div>
          
          {/* Layout de texto - agora sem a coluna da imagem */}
          <div className="relative">
            {/* Coluna de Texto */}
            <div className="text-center lg:text-left relative">
              {/* Badge "Associação de Cannabis Medicinal" */}
              <div className="inline-block mb-4 lg:mb-6">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm text-brand-purple font-inter text-sm lg:text-base border border-brand-hover-purple/20">
                  Associação de Cannabis Medicinal
                </span>
              </div>
              
              {/* Título - Mantido conforme layout visual complexo */}
              <div className="relative max-w-[560px] mx-auto lg:mx-0 px-4  lg:px-0">
                <div className="text-center lg:text-left pl-4 mb-0 lg:mb-2">
                  <h1 className="font-futuru font-bold text-[#c2a4ff] text-6xl lg:text-[5.8rem] lg:ml-12 mr-20 leading-[0.8] tracking-tight">
                    unindo
                  </h1>
                </div>
                <div className="flex justify-center lg:justify-between items-center pl-6 lg:pl-0 -mt-3 lg:-mt-6">
                  <h1 className="font-behind mr-2 italic text-brand-purple text-7xl lg:text-[7.5rem] font-semibold leading-[0.8] tracking-tight">
                    forças
                  </h1>
                  <h1 className="font-futuru font-bold text-[#c2a4ff] text-6xl lg:text-[6.8rem] leading-[0.8] mr-8 mb-8 tracking-tight pb-0">
                    pela
                  </h1>
                </div>
                <div className="flex justify-center lg:justify-end text-right -mt-6 lg:-mt-7 pl-20">
                  <h1 className="font-behind italic text-brand-purple text-7xl lg:text-[8.5rem] font-semibold leading-[0.8] tracking-tight">
                    saúde
                  </h1>
                </div>
              </div>

              {/* Subtítulo e Botões - Movidos para baixo da imagem em telas menores, mas aqui ficam sob o texto */}
              <div className="mt-6 lg:mt-8 max-w-xl mx-auto lg:ml-0 lg:mr-0 text-center lg:text-left">
                <p className="font-inter text-base lg:text-lg text-brand-purple/90 leading-relaxed mb-6">
                  A Floriplanta é a sua associação de apoio ao tratamento com cannabis medicinal em Santa Catarina. Promovemos educação, acesso seguro e acolhimento para pacientes e suas famílias.
                </p>
                
                {/* Botões com transições e efeitos */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  <Link href="/associar" 
                    className="bg-brand-purple text-white px-5 py-2.5 rounded-lg font-inter font-medium inline-flex items-center gap-2 hover:bg-brand-hover-purple transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Torne-se Associado
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/sobre"
                    className="border-2 border-brand-purple text-brand-purple px-5 py-2.5 rounded-lg font-inter font-medium hover:bg-brand-purple hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95">
                    Saiba Mais
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Estatísticas na parte inferior - Adicionar animação sutil de entrada */}
        {/* Para animação real, seria necessário JS (Intersection Observer) */}
        <div className="flex flex-wrap justify-center mt-12 lg:mt-20">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-white/50 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-white/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-hover-purple/20 rounded-full flex items-center justify-center">
                <span className="font-futuru font-bold text-brand-purple text-lg">10+</span>
              </div>
              <span className="font-inter text-brand-purple text-xs font-medium leading-tight">Anos de<br/>Experiência</span>
            </div>
            
            <div className="h-12 w-px bg-brand-purple/20 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-light-green/60 rounded-full flex items-center justify-center">
                <span className="font-futuru font-bold text-brand-purple text-lg">500+</span>
              </div>
              <span className="font-inter text-brand-purple text-xs font-medium leading-tight">Pacientes<br/>Atendidos</span>
            </div>
            
            <div className="h-12 w-px bg-brand-purple/20 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-hover-purple/20 rounded-full flex items-center justify-center">
                <span className="font-futuru font-bold text-brand-purple text-lg">50+</span>
              </div>
              <span className="font-inter text-brand-purple text-xs font-medium leading-tight">Especialistas<br/>Parceiros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

