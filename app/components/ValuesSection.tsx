"use client";

import React from 'react';
import { Heart, Book, UserPlus, Scale } from 'lucide-react';

// Potential: Add Intersection Observer for subtle animations on scroll

export default function ValuesSection() {
  return (
    <section className="py-16 lg:py-24 relative bg-brand-light-green/30 overflow-hidden">
      {/* Formas decorativas orgânicas - Ajuste de opacidade */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-brand-light-green/50 rounded-full transform translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-brand-hover-purple/5 rounded-full transform -translate-x-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Título da Seção - Refinado */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="flex flex-col items-center">
              <h2 className="font-behind italic text-brand-hover-purple text-4xl lg:text-5xl mb-1">Nossos</h2>
              <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl -mt-1">Valores</h2>
              <div className="w-20 h-1 bg-brand-light-green rounded-full mt-4"></div>
            </div>
            <p className="font-inter text-brand-purple/80 text-base lg:text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
              Nossos valores são a bússola que guia cada passo da Floriplanta, 
              refletindo nosso compromisso com a saúde, a dignidade e a justiça social.
            </p>
          </div>
          
          {/* Grid de Valores - Adicionado efeito hover e transição */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[ // Array para facilitar a renderização e manutenção
              { icon: Heart, title: "Empatia", text: "Reconhecemos a jornada única de cada paciente, acolhendo suas necessidades com compreensão e sensibilidade.", iconBg: "bg-brand-hover-purple/15" },
              { icon: Book, title: "Educação", text: "Compartilhamos conhecimento baseado em ciência, combatendo desinformação e preconceitos com fatos e pesquisas.", iconBg: "bg-brand-light-green/50" },
              { icon: UserPlus, title: "Inclusão", text: "Trabalhamos para garantir que o acesso aos benefícios da cannabis medicinal seja um direito para todos que necessitam.", iconBg: "bg-brand-hover-purple/15" },
              { icon: Scale, title: "Responsabilidade", text: "Atuamos com ética, transparência e compromisso tanto com nossos associados quanto com a sociedade.", iconBg: "bg-brand-light-green/50" },
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className={`rounded-full w-14 h-14 flex items-center justify-center ${value.iconBg} mb-4`}>
                  <value.icon className="text-brand-purple w-6 h-6" />
                </div>
                <h3 className="font-futuru font-bold text-brand-purple text-xl mb-3">{value.title}</h3>
                <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
          
          {/* Seção Promessa - Refinada */}
          <div className="mt-16 lg:mt-20 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {/* Ícone decorativo */}
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-brand-purple/5 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-brand-hover-purple/10 flex items-center justify-center">
                  {/* Ícone pode ser alterado para algo mais representativo da promessa, ex: CheckSquare */}
                  <Heart className="w-7 h-7 text-brand-purple" /> 
                </div>
              </div>
              
              {/* Texto da Promessa */}
              <div className="text-center md:text-left">
                <h3 className="font-futuru font-bold text-brand-purple text-xl mb-3">Nossa Promessa</h3>
                <p className="font-inter text-brand-purple/80 leading-relaxed text-sm">
                  Assumimos o compromisso de ser uma voz ativa e responsável no movimento pela cannabis medicinal, 
                  priorizando sempre a melhoria da qualidade de vida dos pacientes através de informação de qualidade, 
                  apoio contínuo e advocacy estratégico. Acreditamos que com compaixão, conhecimento e persistência, 
                  podemos transformar não apenas vidas individuais, mas toda a perspectiva social sobre o tratamento 
                  com cannabis medicinal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

