"use client";

import React from 'react';
import { BrainCog, Pill, ScanFace, Dna, Activity, HeartPulse } from 'lucide-react';

// Potential: Add Intersection Observer for subtle animations on scroll

// Componente de card para benefícios - Refinado com hover e transições
function BenefitCard({ 
  title, 
  description, 
  icon: Icon, 
  color
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  color: 'purple' | 'green';
}) {
  const colorClasses = color === 'purple' ? {
    bg: 'bg-brand-hover-purple/10',
    icon: 'text-brand-purple'
  } : {
    bg: 'bg-brand-light-green/40',
    icon: 'text-brand-purple' // Manter ícone roxo para consistência?
    // Ou usar uma cor derivada do verde: icon: 'text-brand-green'
  };

  return (
    <div className="bg-white rounded-xl p-6 w-full flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
      {/* Ícone com fundo colorido */}
      <div className={`rounded-full w-14 h-14 flex items-center justify-center ${colorClasses.bg} mb-2`}>
        <Icon className={`w-6 h-6 ${colorClasses.icon}`} />
      </div>
      
      {/* Título - Ajuste de fonte/tamanho se necessário, usando Futuru? */}
      <h3 className="font-futuru font-bold text-xl text-brand-purple">{title}</h3>
      
      {/* Descrição */}
      <p className="font-inter text-brand-purple/80 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-[#f6f2f9]">
      {/* Formas decorativas orgânicas */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-hover-purple/5 rounded-full transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-light-green/10 rounded-full transform -translate-x-1/2 translate-y-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Título da Seção - Refinado */}
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <h2 className="font-behind italic text-brand-hover-purple text-4xl lg:text-5xl mb-1">Benefícios</h2>
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl -mt-1">Medicinais</h2>
          <div className="w-20 h-1 bg-brand-light-green rounded-full mt-4"></div>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg mt-6 max-w-3xl mx-auto leading-relaxed">
            A cannabis medicinal possui diversos compostos com propriedades terapêuticas
            comprovadas cientificamente para o tratamento de várias condições.
          </p>
        </div>
        
        {/* Grid de Benefícios - Gap ajustado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          <BenefitCard 
            title="Dor Crônica"
            description="Propriedades analgésicas auxiliam no alívio de dores persistentes, com menos efeitos colaterais que alguns analgésicos convencionais."
            icon={Activity}
            color="green"
          />
          
          <BenefitCard 
            title="Epilepsia"
            description="CBD demonstrou eficácia na redução da frequência e intensidade de crises, especialmente em síndromes refratárias."
            icon={BrainCog}
            color="purple"
          />
          
          <BenefitCard 
            title="Esclerose Múltipla"
            description="Ajuda a reduzir espasticidade muscular e dores neuropáticas, melhorando a qualidade de vida dos pacientes."
            icon={Dna}
            color="green"
          />
          
          <BenefitCard 
            title="Ansiedade e TEPT"
            description="CBD demonstra efeito ansiolítico, auxiliando no manejo de ansiedade, estresse pós-traumático e insônia."
            icon={ScanFace}
            color="purple"
          />
          
          <BenefitCard 
            title="Náuseas e Apetite"
            description="Eficaz no controle de náuseas/vômitos (quimio) e estimula o apetite em pacientes com caquexia (câncer, HIV)."
            icon={Pill}
            color="green"
          />
          
          <BenefitCard 
            title="Condições Inflamatórias"
            description="Propriedades anti-inflamatórias podem beneficiar condições como artrite reumatoide, doença de Crohn e outras."
            icon={HeartPulse}
            color="purple"
          />
        </div>
        
        {/* Seção "O que a Ciência diz?" - Refinada */}
        <div className="mt-12 flex flex-col items-center">
          <div className="bg-white p-8 rounded-2xl max-w-4xl shadow-sm border border-gray-100">
            <h3 className="font-futuru font-bold text-brand-purple text-xl lg:text-2xl mb-4 text-center">O que a Ciência diz?</h3>
            <p className="font-inter text-brand-purple/80 leading-relaxed text-sm lg:text-base mb-4">
              Pesquisas científicas têm revelado cada vez mais o potencial terapêutico do sistema endocanabinoide humano
              e como os fitocanabinoides interagem com ele. Estudos clínicos demonstram que, sob orientação médica
              adequada, os tratamentos à base de cannabis podem proporcionar significativa melhora na qualidade de vida
              de pacientes com diversas condições.
            </p>
            <p className="font-inter text-brand-purple/80 leading-relaxed text-sm lg:text-base">
              É importante ressaltar que, como qualquer tratamento medicinal, a eficácia varia conforme o paciente,
              condição tratada e formulação utilizada, sendo fundamental o acompanhamento de profissionais
              especializados para o tratamento adequado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

