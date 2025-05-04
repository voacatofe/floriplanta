"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="h-screen py-8 lg:py-12 bg-[#f8f5f0] relative overflow-hidden flex items-center">
      {/* Fundo verde suave como na imagem de referência */}
      <div className="absolute inset-0 bg-[#e8f7c0]/60 rounded-[70%_30%_50%_50%] w-[95%] h-[100%] mx-auto"></div>
      
      {/* Formas decorativas orgânicas - simplificadas */}
      <div className="absolute -top-20 -left-20 w-32 h-32 bg-[#d0f288] rounded-full opacity-80"></div>
      <div className="absolute bottom-[25%] left-20 w-28 h-28 bg-[#d0f288] rounded-full opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Logo/ícone como na imagem de referência */}
          <div className="hidden lg:flex absolute top-0 left-10 z-20">
            <div className="bg-[#d0f288] w-16 h-16 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-[#5b3a8c]" />
            </div>
          </div>
          
          {/* Layout de texto do título seguindo a referência visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center relative">
            <div className="text-center lg:text-left relative">
              {/* Badge "Associação de Cannabis Medicinal" */}
              <div className="inline-block mb-4 lg:mb-6">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm text-[#5b3a8c] font-inter text-sm lg:text-base border border-[#9a68c9]/20">
                  Associação de Cannabis Medicinal
                </span>
              </div>
              
              {/* Título implementado para corresponder exatamente à imagem de referência */}
              <div className="relative max-w-[560px] mx-auto lg:mx-0">
                {/* unindo - na parte superior */}
                <div className="text-center lg:text-left pl-4 mb-0 lg:mb-2">
                  <h1 className="font-futuru font-bold text-[#c2a4ff] text-6xl lg:text-[5.8rem] leading-[0.8] tracking-tight">
                    unindo
                  </h1>
                </div>
                
                {/* Wrapper para "forças" e "pela" em uma linha */}
                <div className="flex justify-between items-center -mt-3 lg:-mt-6">
                  {/* forças - à esquerda */}
                  <h1 className="font-behind italic text-[#5b3a8c] text-7xl lg:text-[5.5rem] font-semibold leading-[0.8] tracking-tight">
                    forças
                  </h1>
                  
                  {/* pela - à direita, ligeiramente para baixo */}
                  <h1 className="font-futuru font-bold text-[#c2a4ff] text-6xl lg:text-[9.8rem] leading-[0.8] mr-8 mb-8 tracking-tight pb-0">
                    pela
                  </h1>
                </div>
                
                {/* saúde - na parte inferior direita */}
                <div className="text-right -mt-3 lg:-mt-6 pr-4">
                  <h1 className="font-behind italic text-[#5b3a8c] text-7xl lg:text-[8.5rem] font-semibold leading-[0.8] tracking-tight">
                    saúde
                  </h1>
                </div>
              </div>
            </div>
            
            {/* Imagem orgânica ao lado do título */}
            <div className="hidden lg:block relative">
              {/* Moldura orgânica para a imagem */}
              <div className="relative z-10 overflow-hidden p-2 flex justify-end">
                <div className="relative overflow-hidden rounded-[60%_40%_45%_55%/40%_50%_50%_60%] border-8 border-[#e8f7c0] shadow-lg w-full max-w-md">
                  <Image 
                    src="/family-lying-grass-park.jpg" 
                    alt="Família deitada na grama" 
                    width={600} 
                    height={500} 
                    className="object-cover w-full h-full"
                    priority
                  />
                  {/* Sobreposição de cor suave para integração com o tema */}
                  <div className="absolute inset-0 bg-[#9a68c9]/5"></div>
                </div>
              </div>
            </div>
            
            {/* Conteúdo secundário */}
            <div className="mt-6 lg:mt-8 max-w-xl mx-auto lg:ml-0 lg:mr-0 text-center lg:text-left col-span-full lg:col-span-1">
              <p className="font-inter text-base lg:text-lg text-[#5b3a8c]/90 leading-relaxed mb-6">
                Associação que promove educação sobre cannabis medicinal, defende direitos de usuários e fomenta pesquisa científica.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link href="/associado" 
                  className="bg-[#5b3a8c] text-white px-5 py-2.5 rounded-lg font-inter font-medium inline-flex items-center gap-2 hover:bg-[#9a68c9] transition-all duration-300">
                  Torne-se Associado
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/sobre"
                  className="border-2 border-[#5b3a8c] text-[#5b3a8c] px-5 py-2.5 rounded-lg font-inter font-medium hover:bg-[#5b3a8c] hover:text-white transition-all duration-300">
                  Saiba Mais
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Estatísticas na parte inferior */}
        <div className="flex flex-wrap justify-center mt-8 lg:mt-16">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-white/30 backdrop-blur-sm px-6 py-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#9a68c9]/20 rounded-full flex items-center justify-center">
                <span className="font-futuru font-bold text-[#5b3a8c] text-lg">10+</span>
              </div>
              <span className="font-inter text-[#5b3a8c] text-xs font-medium">Anos de<br/>Experiência</span>
            </div>
            
            <div className="h-12 w-px bg-[#5b3a8c]/20 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#d0f288]/50 rounded-full flex items-center justify-center">
                <span className="font-futuru font-bold text-[#5b3a8c] text-lg">500+</span>
              </div>
              <span className="font-inter text-[#5b3a8c] text-xs font-medium">Pacientes<br/>Atendidos</span>
            </div>
            
            <div className="h-12 w-px bg-[#5b3a8c]/20 hidden md:block"></div>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#9a68c9]/20 rounded-full flex items-center justify-center">
                <span className="font-futuru font-bold text-[#5b3a8c] text-lg">50+</span>
              </div>
              <span className="font-inter text-[#5b3a8c] text-xs font-medium">Especialistas<br/>Parceiros</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 