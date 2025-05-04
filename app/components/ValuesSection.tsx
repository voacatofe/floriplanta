"use client";

import React from 'react';
import { Heart, Book, UserPlus, Scale } from 'lucide-react';

export default function ValuesSection() {
  return (
    <section className="py-16 lg:py-24 relative bg-[#e8f7c0]/40 overflow-hidden">
      {/* Formas decorativas orgânicas */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-[#d0f288]/30 rounded-full transform translate-x-1/3"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-[#9a68c9]/10 rounded-full transform -translate-x-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex flex-col items-center">
              <h2 className="font-behind italic text-[#9a68c9] text-4xl lg:text-5xl mb-2">Nossos</h2>
              <h2 className="font-futuru font-bold text-[#5b3a8c] text-3xl lg:text-4xl">Valores</h2>
              <div className="w-20 h-1.5 bg-[#d0f288] rounded-full mt-4"></div>
            </div>
            <p className="font-inter text-[#5b3a8c]/80 text-lg mt-6 max-w-3xl mx-auto">
              Nossos valores fundamentais que orientam cada uma de nossas ações
              e decisões, sempre com foco no bem-estar e dignidade dos pacientes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-[#9a68c9]/20 mb-4">
                <Heart className="text-[#5b3a8c] w-6 h-6" />
              </div>
              <h3 className="font-futuru font-bold text-[#5b3a8c] text-xl mb-3">Empatia</h3>
              <p className="font-inter text-[#5b3a8c]/80">
                Reconhecemos a jornada única de cada paciente, acolhendo suas necessidades com compreensão e sensibilidade.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-[#d0f288]/40 mb-4">
                <Book className="text-[#5b3a8c] w-6 h-6" />
              </div>
              <h3 className="font-futuru font-bold text-[#5b3a8c] text-xl mb-3">Educação</h3>
              <p className="font-inter text-[#5b3a8c]/80">
                Compartilhamos conhecimento baseado em ciência, combatendo desinformação e preconceitos com fatos e pesquisas.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-[#9a68c9]/20 mb-4">
                <UserPlus className="text-[#5b3a8c] w-6 h-6" />
              </div>
              <h3 className="font-futuru font-bold text-[#5b3a8c] text-xl mb-3">Inclusão</h3>
              <p className="font-inter text-[#5b3a8c]/80">
                Trabalhamos para garantir que o acesso aos benefícios da cannabis medicinal seja um direito para todos que necessitam.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full w-14 h-14 flex items-center justify-center bg-[#d0f288]/40 mb-4">
                <Scale className="text-[#5b3a8c] w-6 h-6" />
              </div>
              <h3 className="font-futuru font-bold text-[#5b3a8c] text-xl mb-3">Responsabilidade</h3>
              <p className="font-inter text-[#5b3a8c]/80">
                Atuamos com ética, transparência e compromisso tanto com nossos associados quanto com a sociedade.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#5b3a8c]/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#9a68c9]/30 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#5b3a8c]" />
                </div>
              </div>
              
              <div>
                <h3 className="font-futuru font-bold text-[#5b3a8c] text-xl mb-3">Nossa Promessa</h3>
                <p className="font-inter text-[#5b3a8c]/80 leading-relaxed">
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