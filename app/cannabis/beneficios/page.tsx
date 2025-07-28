import React from 'react';
import Link from 'next/link'; // For linking to sources

import Footer from '@/components/layout/Footer';
import { HeartPulse, Brain, Bone, Wind, Smile, Utensils, Activity, Users, ShieldCheck, AlertTriangle } from 'lucide-react'; // Example icons

// Reusable Sidebar Component (assuming it's in a shared location or copied)
// For simplicity, copying the definition here. Ideally, import from a shared components folder.
const CannabisSidebarNav = () => {
  const navItems = [
    { title: 'Visão Geral', href: '/cannabis' },
    { title: 'O que é?', href: '/cannabis/o-que-e' },
    { title: 'Benefícios', href: '/cannabis/beneficios' },
    { title: 'Como Iniciar', href: '/cannabis/como-iniciar' },
    { title: 'Pesquisas', href: '/cannabis/pesquisas' },
    { title: 'Mitos e Verdades', href: '/cannabis/mitos-e-verdades' },
    { title: 'Legislação', href: '/cannabis/legislacao' },
  ];

  return (
    <aside className="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 sticky top-24">
        <h3 className="font-futuru font-bold text-brand-purple mb-4 text-lg">Navegar na Seção</h3>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  className={`block py-2 px-3 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${item.href === '/cannabis/beneficios' ? 'bg-brand-light-green/50 font-medium' : ''}`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

// Placeholder data for conditions - Add actual links to sources/studies
const conditions = [
  {
    icon: Bone,
    title: 'Dor Crônica',
    text: 'Canabinoides como CBD e THC podem modular a percepção da dor, sendo úteis em dores neuropáticas, oncológicas, fibromialgia e outras condições dolorosas persistentes.',
    sourceLink: '#', // Add link to study/review
  },
  {
    icon: Brain, // Changed icon
    title: 'Epilepsia',
    text: 'O CBD, especialmente em formulações purificadas, é aprovado para tratar formas raras e graves de epilepsia infantil (Síndromes de Dravet e Lennox-Gastaut), reduzindo significativamente a frequência das crises.',
    sourceLink: '#', // Add link to study/review
  },
  {
    icon: Activity, // Changed icon
    title: 'Esclerose Múltipla',
    text: 'Combinações de THC e CBD (como o Sativex/Mevatyl) são eficazes na redução da espasticidade muscular e da dor associada à condição.',
    sourceLink: '#', // Add link to study/review
  },
  {
    icon: Smile,
    title: 'Transtornos de Ansiedade e TEPT',
    text: 'O CBD possui propriedades ansiolíticas, ajudando a reduzir sintomas de ansiedade generalizada, ansiedade social e TEPT, além de melhorar a qualidade do sono.',
    sourceLink: '#', // Add link to study/review
  },
  {
    icon: Wind, // Changed icon
    title: 'Náuseas e Vômitos (Quimioterapia)',
    text: 'O THC é um antiemético eficaz, ajudando pacientes oncológicos a controlar náuseas e vômitos durante a quimioterapia.',
    sourceLink: '#', // Add link to study/review
  },
  {
    icon: Utensils,
    title: 'Perda de Apetite e Caquexia',
    text: 'O THC pode estimular o apetite, sendo útil para pacientes com perda de peso associada ao câncer, HIV/AIDS ou outras condições.',
    sourceLink: '#', // Add link to study/review
  },
  {
    icon: ShieldCheck, // Changed icon
    title: 'Doenças Inflamatórias Intestinais',
    text: 'Canabinoides demonstram potencial anti-inflamatório no trato gastrointestinal (Crohn, Colite Ulcerativa), podendo auxiliar no manejo dos sintomas.',
    sourceLink: '#', // Add link to study/review
  },
  {
    icon: Users, // Changed icon
    title: 'Transtorno do Espectro Autista (TEA)',
    text: 'Estudos preliminares sugerem que o CBD pode ajudar a melhorar sintomas como irritabilidade, hiperatividade e problemas de comunicação em alguns pacientes com TEA.',
    sourceLink: '#', // Add link to study/review
  },
  // Add other conditions like Parkinson, Alzheimer, Insomnia, etc.
];

export default function BeneficiosPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      

      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-hover-purple/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-center mb-4">
             <HeartPulse className="w-8 h-8 text-brand-purple mr-3" />
             <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl">Benefícios e Indicações</h1>
          </div>
           <p className="font-inter text-brand-purple/85 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Aplicações terapêuticas comprovadas e potenciais da cannabis medicinal, sempre com base em evidências científicas e acompanhamento médico.
          </p>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row">
          <CannabisSidebarNav />
          <article className="w-full lg:w-3/4 lg:pl-8">
            
            <div className="prose prose-lg max-w-none prose-headings:font-futuru prose-headings:text-brand-purple prose-a:text-brand-hover-purple hover:prose-a:text-brand-purple mb-12">
              <p>
                A pesquisa científica tem demonstrado o potencial da cannabis medicinal no tratamento e manejo de sintomas de uma ampla gama de condições. É fundamental ressaltar que o tratamento deve ser sempre individualizado e acompanhado por um profissional de saúde qualificado.
              </p>
            </div>

            {/* Conditions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {conditions.map((condition, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
                  <div className="flex items-center mb-3">
                    <condition.icon className="w-6 h-6 text-brand-purple mr-3 flex-shrink-0" />
                    <h3 className="font-futuru font-bold text-brand-purple text-xl">{condition.title}</h3>
                  </div>
                  <p className="font-inter text-brand-purple/80 text-sm leading-relaxed flex-grow mb-3">
                    {condition.text}
                  </p>
                  {condition.sourceLink !== '#' && (
                    <Link href={condition.sourceLink} target="_blank" rel="noopener noreferrer" className="text-xs font-inter text-brand-hover-purple hover:underline mt-auto">
                      Ver fonte/estudo
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-12 lg:mt-16 p-6 bg-yellow-100/50 border-l-4 border-yellow-400 rounded-r-lg flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-futuru font-bold text-yellow-800 mb-2">Atenção Importante</h4>
                <p className="font-inter text-yellow-700 text-sm leading-relaxed">
                  As informações apresentadas nesta página são de caráter exclusivamente educativo e informativo, baseadas em pesquisas científicas disponíveis até o momento. Elas **não substituem** a consulta, o diagnóstico ou o tratamento médico profissional. A automedicação é perigosa. Converse sempre com um médico ou profissional de saúde qualificado antes de iniciar, alterar ou interromper qualquer tratamento, incluindo aqueles com cannabis medicinal. A indicação e a dosagem adequadas dependem da avaliação individual de cada paciente.
                </p>
              </div>
            </div>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

