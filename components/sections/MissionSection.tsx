"use client";

import React from 'react';
import { Wand2 } from 'lucide-react';

interface MissionSectionProps {
  title?: string;
  description?: string;
  bgColor?: 'purple' | 'green' | 'light';
}

export default function MissionSection({
  title = "missão",
  description = "Nossa missão é construir uma comunidade sólida para democratizar o acesso à informação e o tratamento com o uso da cannabis medicinal, através de um movimento de desobediência civil e pacífica.",
  bgColor = 'purple'
}: MissionSectionProps) {
  
  const getBgColor = () => {
    switch(bgColor) {
      case 'purple': return 'bg-[#5b3a8c] text-white';
      case 'green': return 'bg-[#d0f288] text-[#5b3a8c]';
      default: return 'bg-[#f8f5f0] text-[#5b3a8c]';
    }
  };
  
  const getAccentColor = () => {
    switch(bgColor) {
      case 'purple': return '#d0f288';
      case 'green': return '#5b3a8c';
      default: return '#9a68c9';
    }
  };

  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${getBgColor()}`}>
      {/* Formas decorativas */}
      <div className="absolute top-0 left-0 w-60 h-60 rounded-full opacity-20" 
        style={{ background: getAccentColor() }}></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10" 
        style={{ background: getAccentColor() }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-current/20 mb-6">
              <Wand2 className="w-4 h-4" />
              <span className="font-inter text-sm font-medium">Floriplanta</span>
            </div>
            
            <h2 className="font-behind italic text-6xl md:text-8xl mb-8 relative text-center">
              {title}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-20 md:w-32 rounded-full" 
                style={{ background: getAccentColor() }}></div>
            </h2>
            
            <p className="font-inter text-lg md:text-xl opacity-90 leading-relaxed text-center max-w-3xl">
              {description}
            </p>
            
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <div className="px-4 py-2 rounded-full text-sm font-medium border font-inter" 
                style={{ borderColor: `${getAccentColor()}50`, color: getAccentColor() }}>
                Educação
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium border font-inter" 
                style={{ borderColor: `${getAccentColor()}50`, color: getAccentColor() }}>
                Pesquisa
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium border font-inter" 
                style={{ borderColor: `${getAccentColor()}50`, color: getAccentColor() }}>
                Acesso
              </div>
              <div className="px-4 py-2 rounded-full text-sm font-medium border font-inter" 
                style={{ borderColor: `${getAccentColor()}50`, color: getAccentColor() }}>
                Saúde
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Elemento decorativo inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: getAccentColor() }}></div>
    </section>
  );
}