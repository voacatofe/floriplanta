import React from 'react';
import Image from 'next/image'; // If needed for infographics
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { BookOpen, Brain, Atom, Thermometer, Dna, Zap, Leaf } from 'lucide-react'; // Example icons

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
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="font-futuru font-bold text-brand-purple mb-4 text-lg">Navegar na Seção</h3>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href} 
                  className="block py-2 px-3 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200"
                  // Add active state styling if needed based on current path
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

export default function OQueEPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-center mb-4">
             <BookOpen className="w-8 h-8 text-brand-purple mr-3" />
             <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl">O que é Cannabis Medicinal?</h1>
          </div>
           <p className="font-inter text-brand-purple/85 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Desvendando a planta, seus compostos ativos e a interação com o nosso organismo através do Sistema Endocanabinoide.
          </p>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row">
          <CannabisSidebarNav />
          <article className="w-full lg:w-3/4 lg:pl-8 prose prose-lg max-w-none prose-headings:font-futuru prose-headings:text-brand-purple prose-a:text-brand-hover-purple hover:prose-a:text-brand-purple">
            
            <p>
              A <em>Cannabis Sativa L.</em> é uma planta utilizada há milênios por suas propriedades medicinais. O termo "Cannabis Medicinal" refere-se ao uso terapêutico da planta e de seus compostos ativos, conhecidos como canabinoides, para tratar ou aliviar sintomas de diversas condições de saúde.
            </p>

            <h2 className="flex items-center"><Brain className="w-6 h-6 mr-2"/>O Sistema Endocanabinoide (SEC)</h2>
            <p>
              Nosso corpo possui um sistema complexo chamado Sistema Endocanabinoide (SEC), composto por receptores (CB1 e CB2), endocanabinoides (produzidos pelo próprio corpo, como a anandamida) e enzimas. O SEC desempenha um papel crucial na regulação de diversas funções fisiológicas, incluindo dor, humor, apetite, sono, memória e resposta imune. Os canabinoides da planta (fitocanabinoides) interagem com esse sistema, modulando suas funções e produzindo efeitos terapêuticos.
            </p>
            {/* Placeholder for SEC infographic */}
            {/* <div className="my-6 p-4 bg-brand-light-green/30 rounded-lg text-center">
              [Infográfico sobre o Sistema Endocanabinoide]
            </div> */}

            <h2 className="flex items-center"><Atom className="w-6 h-6 mr-2"/>Principais Canabinoides</h2>
            <p>
              A cannabis contém centenas de compostos, mas os mais estudados por seus efeitos medicinais são:
            </p>
            <ul>
              <li><strong>Canabidiol (CBD):</strong> Não psicoativo, conhecido por suas propriedades ansiolíticas, anti-inflamatórias, anticonvulsivantes e neuroprotetoras.</li>
              <li><strong>Tetrahidrocanabinol (THC):</strong> Principal composto psicoativo, responsável pela sensação de "euforia", mas também com importantes propriedades analgésicas, antieméticas (contra náuseas) e estimulantes de apetite.</li>
              <li><strong>Canabigerol (CBG):</strong> Não psicoativo, estudado por potenciais efeitos anti-inflamatórios, antibacterianos e neuroprotetores.</li>
              <li><strong>Canabinol (CBN):</strong> Levemente psicoativo, associado a efeitos sedativos e relaxantes.</li>
            </ul>
            {/* Placeholder for molecule structures */}
            {/* <div className="my-6 grid grid-cols-2 gap-4">
              <div className="p-2 bg-white rounded shadow-sm text-center">[Estrutura CBD]</div>
              <div className="p-2 bg-white rounded shadow-sm text-center">[Estrutura THC]</div>
            </div> */}

            <h2 className="flex items-center"><Leaf className="w-6 h-6 mr-2"/>Terpenos</h2>
            <p>
              São compostos aromáticos encontrados na cannabis e em muitas outras plantas. Eles não apenas conferem o cheiro e sabor característicos de cada variedade (strain), mas também podem interagir com os canabinoides (efeito entourage ou comitiva), modulando e potencializando seus efeitos terapêuticos. Exemplos incluem Mirceno, Limoneno, Pineno e Linalol.
            </p>
            {/* Placeholder for terpene examples */}
            {/* <div className="my-6 p-4 bg-brand-light-green/30 rounded-lg">
              [Exemplos visuais de terpenos e seus aromas/efeitos]
            </div> */}

            <h2 className="flex items-center"><Zap className="w-6 h-6 mr-2"/>Efeito Entourage (Comitiva)</h2>
            <p>
              Acredita-se que a ação conjunta de diversos canabinoides e terpenos presentes na planta (produtos "full spectrum" ou "broad spectrum") pode ser mais eficaz do que o uso de canabinoides isolados, devido à sinergia entre os compostos.
            </p>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

