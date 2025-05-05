import React from 'react';
import Link from 'next/link';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FlaskConical, BookOpen, Search, Database, Link as LinkIcon } from 'lucide-react'; // Example icons

// Reusable Sidebar Component
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
                  className={`block py-2 px-3 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${item.href === '/cannabis/pesquisas' ? 'bg-brand-light-green/50 font-medium' : ''}`}
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

// Placeholder data for research links - Replace with actual curated links
const researchAreas = [
  {
    area: "Dor Crônica",
    studies: [
      { title: "Estudo/Revisão sobre Dor Neuropática", summary: "Breve resumo do estudo 1...", link: "#" },
      { title: "Estudo/Revisão sobre Fibromialgia", summary: "Breve resumo do estudo 2...", link: "#" },
    ]
  },
  {
    area: "Epilepsia",
    studies: [
      { title: "Ensaio Clínico sobre CBD em Síndrome de Dravet", summary: "Breve resumo do estudo 1...", link: "#" },
      { title: "Revisão Sistemática sobre Canabinoides em Epilepsia Refratária", summary: "Breve resumo do estudo 2...", link: "#" },
    ]
  },
  {
    area: "Esclerose Múltipla",
    studies: [
      { title: "Estudo sobre Sativex/Mevatyl para Espasticidade", summary: "Breve resumo do estudo 1...", link: "#" },
    ]
  },
  {
    area: "Ansiedade",
    studies: [
      { title: "Revisão sobre CBD para Transtornos de Ansiedade", summary: "Breve resumo do estudo 1...", link: "#" },
    ]
  },
  // Add more areas (Oncologia, Neurologia, Psiquiatria, etc.) and studies
];

const usefulLinks = [
  { title: "PubMed", description: "Principal base de dados de literatura biomédica.", link: "https://pubmed.ncbi.nlm.nih.gov/?term=cannabis+medicinal" },
  { title: "SciELO", description: "Biblioteca eletrônica com periódicos científicos da América Latina.", link: "https://search.scielo.org/?q=cannabis+medicinal" },
  { title: "ClinicalTrials.gov", description: "Registro de ensaios clínicos conduzidos globalmente.", link: "https://clinicaltrials.gov/ct2/results?cond=Cannabis&term=&cntry=&state=&city=&dist=" },
  { title: "SBEC", description: "Sociedade Brasileira de Estudos da Cannabis.", link: "#" }, // Add actual link if available
  { title: "IACM", description: "Associação Internacional para Canabinoides como Medicamento.", link: "https://www.cannabis-med.org/" },
];

export default function PesquisasPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-hover-purple/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-center mb-4">
             <FlaskConical className="w-8 h-8 text-brand-purple mr-3" />
             <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl">Pesquisas Científicas</h1>
          </div>
           <p className="font-inter text-brand-purple/85 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            A ciência por trás da cannabis medicinal: explore estudos, revisões e artigos científicos relevantes que embasam o uso terapêutico da planta.
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
                A Floriplanta acredita na importância da ciência para validar e expandir o uso terapêutico da cannabis. Compilamos aqui links para estudos, revisões sistemáticas e artigos científicos relevantes publicados em periódicos revisados por pares. Mantenha-se atualizado com as últimas descobertas.
              </p>
              <p className="text-sm italic">
                Nota: Esta seção está em constante curadoria e atualização. As informações e links aqui presentes são um ponto de partida para a exploração da vasta literatura científica disponível.
              </p>
            </div>

            {/* Research Library */}
            <div className="mb-12">
              <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-6 flex items-center"><BookOpen className="w-6 h-6 mr-2"/>Biblioteca de Pesquisas (Exemplos)</h2>
              <div className="space-y-6">
                {researchAreas.map((area, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-futuru font-semibold text-brand-purple text-xl mb-3">{area.area}</h3>
                    <ul className="space-y-3 list-none pl-0">
                      {area.studies.map((study, studyIndex) => (
                        <li key={studyIndex} className="border-b border-gray-100 pb-3 last:border-b-0">
                          <Link href={study.link} target="_blank" rel="noopener noreferrer" className="font-inter font-medium text-brand-hover-purple hover:underline block mb-1">
                            {study.title}
                          </Link>
                          <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">
                            {study.summary}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-6 flex items-center"><Database className="w-6 h-6 mr-2"/>Links Úteis para Pesquisa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {usefulLinks.map((linkInfo, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2 flex items-center">
                      <LinkIcon className="w-4 h-4 mr-2"/> {linkInfo.title}
                    </h3>
                    <p className="font-inter text-brand-purple/80 text-sm leading-relaxed flex-grow mb-3">
                      {linkInfo.description}
                    </p>
                    <Link href={linkInfo.link} target="_blank" rel="noopener noreferrer" className="text-brand-hover-purple hover:underline font-medium text-sm mt-auto">
                      Acessar {linkInfo.title} &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

