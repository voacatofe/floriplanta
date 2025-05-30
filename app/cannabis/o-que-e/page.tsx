import React, { ReactNode } from 'react';
import Image from 'next/image'; // If needed for infographics
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Brain, Atom, Thermometer, Dna, Zap, Leaf, Info, Bomb, Droplet, Flower, LucideIcon } from 'lucide-react'; // Example icons

// Component for the sidebar navigation within the cannabis section
const CannabisSidebarNav = () => {
  const navItems = [
    { title: "Visão Geral", href: "/cannabis" },
    { title: "O que é?", href: "/cannabis/o-que-e" },
    { title: "Benefícios", href: "/cannabis/beneficios" },
    { title: "Como Iniciar", href: "/cannabis/como-iniciar" },
    { title: "Pesquisas", href: "/cannabis/pesquisas" },
    { title: "Mitos e Verdades", href: "/cannabis/mitos-e-verdades" },
    { title: "Legislação", href: "/cannabis/legislacao" },
  ];

  // Basic sidebar, consider making it sticky or more advanced based on layout needs
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
                  className={`block py-2 px-3 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${item.href === '/cannabis/o-que-e' ? 'bg-brand-light-green/50 font-medium' : ''}`}
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

// Interfaces para os componentes
interface InfoBoxProps {
  children: ReactNode;
}

interface CanabinoidCardProps {
  name: string;
  abbr: string;
  description: string;
  icon: LucideIcon;
  highlight: boolean;
}

interface TerpenoCardProps {
  name: string;
  aroma: string;
  effects: string;
  icon: LucideIcon;
}

// Componente para InfoBox
const InfoBox = ({ children }: InfoBoxProps) => {
  return (
    <div className="bg-brand-light-green/20 border-l-4 border-brand-purple rounded-r-lg p-4 my-6 flex items-start">
      <Info className="w-5 h-5 text-brand-purple mr-3 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-brand-purple/90 font-inter">
        {children}
      </div>
    </div>
  );
};

// Componente para Card de Canabinoide
const CanabinoidCard = ({ name, abbr, description, icon: IconComponent, highlight }: CanabinoidCardProps) => {
  return (
    <div className={`p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md ${highlight ? 'bg-gradient-to-br from-white to-brand-light-green/30' : 'bg-white'}`}>
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-brand-purple/10 flex items-center justify-center mr-3">
          <IconComponent className="w-5 h-5 text-brand-purple" />
        </div>
        <div>
          <h3 className="font-futuru font-semibold text-brand-purple text-lg">{name} <span className="text-sm font-normal text-brand-purple/70">({abbr})</span></h3>
        </div>
      </div>
      <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

// Componente para Card de Terpeno
const TerpenoCard = ({ name, aroma, effects, icon: IconComponent }: TerpenoCardProps) => {
  return (
    <div className="p-4 rounded-xl shadow-sm border border-gray-100 bg-white transition-all duration-300 hover:shadow-md">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-brand-hover-purple/10 flex items-center justify-center mr-2">
          <IconComponent className="w-4 h-4 text-brand-hover-purple" />
        </div>
        <h3 className="font-futuru font-medium text-brand-purple text-base">{name}</h3>
      </div>
      <div className="mb-1">
        <span className="text-xs font-medium text-brand-purple/50 uppercase tracking-wider">Aroma</span>
        <p className="font-inter text-brand-purple/80 text-sm">{aroma}</p>
      </div>
      <div>
        <span className="text-xs font-medium text-brand-purple/50 uppercase tracking-wider">Efeitos</span>
        <p className="font-inter text-brand-purple/80 text-sm">{effects}</p>
      </div>
    </div>
  );
};

export default function OQueEPage() {
  // Dados de canabinoides
  const canabinoides = [
    {
      name: "Canabidiol",
      abbr: "CBD",
      description: "Não psicoativo, conhecido por suas propriedades ansiolíticas, anti-inflamatórias, anticonvulsivantes e neuroprotetoras. É o canabinoide mais estudado para fins medicinais.",
      icon: Droplet,
      highlight: true
    },
    {
      name: "Tetrahidrocanabinol",
      abbr: "THC",
      description: "Principal composto psicoativo, responsável pela sensação de 'euforia', mas também com importantes propriedades analgésicas, antieméticas (contra náuseas) e estimulantes de apetite.",
      icon: Bomb,
      highlight: true
    },
    {
      name: "Canabigerol",
      abbr: "CBG",
      description: "Não psicoativo, estudado por potenciais efeitos anti-inflamatórios, antibacterianos e neuroprotetores. Considerado o 'canabinoide mãe'.",
      icon: Dna,
      highlight: false
    },
    {
      name: "Canabinol",
      abbr: "CBN",
      description: "Levemente psicoativo, associado a efeitos sedativos e relaxantes. É formado pela degradação do THC e mais comum em plantas envelhecidas.",
      icon: Flower,
      highlight: false
    }
  ];

  // Dados de terpenos
  const terpenos = [
    {
      name: "Mirceno",
      aroma: "Terroso, amendoado, herbal",
      effects: "Relaxante, sedativo, analgésico",
      icon: Leaf
    },
    {
      name: "Limoneno",
      aroma: "Cítrico, limão, refrescante",
      effects: "Elevação do humor, anti-ansiedade",
      icon: Zap
    },
    {
      name: "Pineno",
      aroma: "Pinho, refrescante, bosque",
      effects: "Alerta mental, anti-inflamatório",
      icon: Thermometer
    },
    {
      name: "Linalol",
      aroma: "Floral, lavanda, doce",
      effects: "Relaxante, ansiolítico, sedativo",
      icon: Flower
    }
  ];

  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center mb-6">
             <div className="w-20 h-20 rounded-full bg-brand-light-green/30 flex items-center justify-center mb-4">
               <BookOpen className="w-10 h-10 text-brand-purple" />
          </div>
             <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-4">O que é Cannabis Medicinal?</h1>
             <p className="font-inter text-brand-purple/85 text-center text-base lg:text-lg leading-relaxed max-w-3xl">
            Desvendando a planta, seus compostos ativos e a interação com o nosso organismo através do Sistema Endocanabinoide.
          </p>
          </div>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row">
          <CannabisSidebarNav />
          
          <article className="w-full lg:w-3/4 lg:pl-8">
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-10">
              <h2 className="font-futuru font-bold text-brand-purple text-2xl mb-4">O que é Cannabis Medicinal?</h2>
              <p className="font-inter text-brand-purple/85 text-lg leading-relaxed mb-6">
              A <em>Cannabis Sativa L.</em> é uma planta utilizada há milênios por suas propriedades medicinais. O termo "Cannabis Medicinal" refere-se ao uso terapêutico da planta e de seus compostos ativos, conhecidos como canabinoides, para tratar ou aliviar sintomas de diversas condições de saúde.
            </p>
              <InfoBox>
                A cannabis medicinal é utilizada para diversos fins terapêuticos, incluindo controle de dor, redução de náuseas, estímulo de apetite, controle de convulsões, entre muitos outros. Seu status legal varia entre países e regiões.
              </InfoBox>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4">
                  <Brain className="w-6 h-6 text-brand-purple" />
                </div>
                <h2 className="font-futuru font-bold text-brand-purple text-2xl">O Sistema Endocanabinoide (SEC)</h2>
              </div>
              
              <p className="font-inter text-brand-purple/85 leading-relaxed mb-6">
                Nosso corpo possui um sistema complexo chamado Sistema Endocanabinoide (SEC), composto por receptores (CB1 e CB2), endocanabinoides (produzidos pelo próprio corpo, como a anandamida) e enzimas. O SEC desempenha um papel crucial na regulação de diversas funções fisiológicas, incluindo:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Dor</p>
                </div>
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Humor</p>
                </div>
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Apetite</p>
                </div>
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Sono</p>
                </div>
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Memória</p>
                </div>
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Imunidade</p>
                </div>
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Inflamação</p>
                </div>
                <div className="bg-brand-light-green/20 rounded-lg p-3 text-center">
                  <p className="font-futuru font-medium text-brand-purple">Digestão</p>
                </div>
              </div>
              
              <p className="font-inter text-brand-purple/85 leading-relaxed">
                Os canabinoides da planta (fitocanabinoides) interagem com esse sistema, modulando suas funções e produzindo efeitos terapêuticos.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4">
                  <Atom className="w-6 h-6 text-brand-purple" />
                </div>
                <h2 className="font-futuru font-bold text-brand-purple text-2xl">Principais Canabinoides</h2>
              </div>
              
              <p className="font-inter text-brand-purple/85 leading-relaxed mb-6">
                A cannabis contém mais de 100 compostos, mas alguns são particularmente importantes para aplicações medicinais:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {canabinoides.map((canabinoide, index) => (
                  <CanabinoidCard 
                    key={index}
                    name={canabinoide.name}
                    abbr={canabinoide.abbr}
                    description={canabinoide.description}
                    icon={canabinoide.icon}
                    highlight={canabinoide.highlight}
                  />
                ))}
              </div>
              
              <InfoBox>
                Os medicamentos à base de cannabis podem conter um único canabinoide isolado (como o CBD puro) ou uma combinação de vários compostos (chamados de "espectro completo" ou "amplo espectro").
              </InfoBox>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mb-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4">
                  <Leaf className="w-6 h-6 text-brand-purple" />
                </div>
                <h2 className="font-futuru font-bold text-brand-purple text-2xl">Terpenos</h2>
              </div>
              
              <p className="font-inter text-brand-purple/85 leading-relaxed mb-6">
                São compostos aromáticos encontrados na cannabis e em muitas outras plantas. Eles não apenas conferem o cheiro e sabor característicos de cada variedade (strain), mas também podem interagir com os canabinoides, modulando e potencializando seus efeitos terapêuticos.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {terpenos.map((terpeno, index) => (
                  <TerpenoCard 
                    key={index}
                    name={terpeno.name}
                    aroma={terpeno.aroma}
                    effects={terpeno.effects}
                    icon={terpeno.icon}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-brand-purple" />
                </div>
                <h2 className="font-futuru font-bold text-brand-purple text-2xl">Efeito Entourage (Comitiva)</h2>
              </div>
              
              <div className="flex flex-col md:flex-row items-center mb-6 bg-brand-light-green/20 rounded-xl p-6">
                <div className="md:w-1/3 flex justify-center md:justify-start mb-4 md:mb-0">
                  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Zap className="w-12 h-12 text-brand-purple/70" />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left md:pl-6">
                  <h3 className="font-futuru font-semibold text-brand-purple text-xl mb-2">A importância da sinergia</h3>
                  <p className="font-inter text-brand-purple/85 leading-relaxed">
              Acredita-se que a ação conjunta de diversos canabinoides e terpenos presentes na planta (produtos "full spectrum" ou "broad spectrum") pode ser mais eficaz do que o uso de canabinoides isolados, devido à sinergia entre os compostos.
            </p>
                </div>
              </div>
              
              <p className="font-inter text-brand-purple/85 leading-relaxed">
                Este efeito sinérgico é especialmente importante na cannabis medicinal, pois ajuda a potencializar os benefícios terapêuticos e, em alguns casos, pode reduzir efeitos indesejados. Por esse motivo, muitos médicos e pesquisadores recomendam produtos de espectro completo ao invés de canabinoides isolados para determinadas condições.
              </p>
            </div>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

