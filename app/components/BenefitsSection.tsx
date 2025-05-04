"use client";

import React from 'react';
import { BrainCog, Pill, ScanFace, Dna, Activity, HeartPulse } from 'lucide-react';

// Componente de card para benefícios
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
  const getColor = () => {
    switch(color) {
      case 'purple': return {
        bg: 'bg-[#9a68c9]/10',
        icon: 'text-[#5b3a8c]'
      };
      default: return {
        bg: 'bg-[#d0f288]/30',
        icon: 'text-[#5b3a8c]'
      };
    }
  };

  const { bg, icon } = getColor();
  
  return (
    <div className="bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-xl p-6 w-full flex flex-col gap-4">
      <div className={`rounded-full w-14 h-14 flex items-center justify-center ${bg}`}>
        <Icon className={`w-6 h-6 ${icon}`} />
      </div>
      
      <h3 className="font-behind italic text-xl text-[#5b3a8c]">{title}</h3>
      
      <p className="font-inter text-[#5b3a8c]/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-[#f6f2f9]">
      {/* Formas decorativas orgânicas */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#9a68c9]/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d0f288]/10 rounded-full transform -translate-x-1/2 translate-y-1/3"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <h2 className="font-behind italic text-[#9a68c9] text-4xl lg:text-5xl mb-2">Benefícios</h2>
          <h2 className="font-futuru font-bold text-[#5b3a8c] text-3xl lg:text-4xl">Medicinais</h2>
          <div className="w-20 h-1.5 bg-[#d0f288] rounded-full mt-4"></div>
          <p className="font-inter text-[#5b3a8c]/80 text-lg mt-6 max-w-3xl mx-auto">
            A cannabis medicinal possui diversos compostos com propriedades terapêuticas
            comprovadas cientificamente para o tratamento de várias condições.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <BenefitCard 
            title="Dor Crônica"
            description="Canabinoides possuem propriedades analgésicas que auxiliam no alívio de diversas condições de dor persistente, apresentando menos efeitos colaterais que opioides tradicionais."
            icon={Activity}
            color="green"
          />
          
          <BenefitCard 
            title="Epilepsia"
            description="O CBD demonstrou eficácia significativa na redução da frequência e intensidade de crises epilépticas, especialmente em síndromes refratárias como Dravet e Lennox-Gastaut."
            icon={BrainCog}
            color="purple"
          />
          
          <BenefitCard 
            title="Esclerose Múltipla"
            description="Canabinoides ajudam a reduzir a espasticidade muscular e dores neuropáticas associadas à esclerose múltipla, melhorando a qualidade de vida dos pacientes."
            icon={Dna}
            color="green"
          />
          
          <BenefitCard 
            title="Ansiedade e PTSD"
            description="O CBD demonstra efeito ansiolítico significativo, auxiliando no manejo de transtornos de ansiedade, estresse pós-traumático e insônia, sem os efeitos psicoativos do THC."
            icon={ScanFace}
            color="purple"
          />
          
          <BenefitCard 
            title="Náuseas e Apetite"
            description="Canabinoides são eficazes no controle de náuseas e vômitos causados por quimioterapia, além de estimular o apetite em pacientes com caquexia por câncer ou HIV/AIDS."
            icon={Pill}
            color="green"
          />
          
          <BenefitCard 
            title="Condições Inflamatórias"
            description="As propriedades anti-inflamatórias dos canabinoides podem beneficiar condições como artrite reumatoide, doença de Crohn e outras doenças autoimunes."
            icon={HeartPulse}
            color="purple"
          />
        </div>
        
        <div className="mt-12 flex flex-col items-center">
          <div className="bg-white p-8 rounded-2xl max-w-4xl shadow-sm">
            <h3 className="font-futuru font-bold text-[#5b3a8c] text-2xl mb-4 text-center">O que a Ciência diz?</h3>
            <p className="font-inter text-[#5b3a8c]/80 leading-relaxed mb-4">
              Pesquisas científicas têm revelado cada vez mais o potencial terapêutico do sistema endocanabinoide humano
              e como os fitocanabinoides interagem com ele. Estudos clínicos demonstram que, sob orientação médica
              adequada, os tratamentos à base de cannabis podem proporcionar significativa melhora na qualidade de vida
              de pacientes com diversas condições.
            </p>
            <p className="font-inter text-[#5b3a8c]/80 leading-relaxed">
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