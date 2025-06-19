import React from 'react';
import Footer from "@/components/layout/Footer";
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react'; // Icons for myth/truth

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
                  className={`block py-2 px-3 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${item.href === '/cannabis/mitos-e-verdades' ? 'bg-brand-light-green/50 font-medium' : ''}`}
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

// Placeholder data for myths and truths - Add more as needed
const mythsTruths = [
  {
    myth: "Cannabis medicinal vicia tanto quanto o uso recreativo.",
    truth: "O potencial de dependência varia com o composto (THC > CBD) e forma de uso. Tratamentos com CBD ou baixas doses de THC, sob acompanhamento médico, apresentam risco consideravelmente menor que o uso recreativo de altas doses de THC. Muitos pacientes usam cannabis medicinal para reduzir o uso de medicamentos mais viciantes, como opioides."
  },
  {
    myth: "Cannabis medicinal é uma \"cura milagrosa\" para todas as doenças.",
    truth: "Embora promissora, não é uma panaceia. Sua eficácia varia, e funciona melhor como parte de um tratamento integrado, sob orientação médica. É crucial ter expectativas realistas e baseadas em evidências."
  },
  {
    myth: "Usar óleo de CBD vai me deixar \"chapado(a)\".",
    truth: "O CBD (Canabidiol) é não psicoativo, não causa euforia ou intoxicação associada ao THC. Produtos ricos em CBD e com baixo/nenhum THC não alteram a percepção ou cognição significativamente."
  },
  {
    myth: "Qualquer óleo de cânhamo (hemp oil) vendido online serve como cannabis medicinal.",
    truth: "Muitos óleos de cânhamo são derivados das sementes e contêm pouco ou nenhum canabinoide (CBD/THC). Produtos medicinais devem ter composição (concentração de canabinoides) especificada e comprovada por laudos."
  },
  {
    myth: "Cannabis medicinal é ilegal no Brasil.",
    truth: "O uso medicinal é regulamentado. A Anvisa permite importação e venda de alguns produtos em farmácias (com prescrição). O cultivo medicinal ainda depende de autorização judicial (Habeas Corpus), mas há movimento pela regulamentação."
  },
  // Add more myths here
];

export default function MitosVerdadesPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      

      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-center mb-4">
             <HelpCircle className="w-8 h-8 text-brand-purple mr-3" />
             <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl">Mitos e Verdades</h1>
          </div>
           <p className="font-inter text-brand-purple/85 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Desmistificando a cannabis medicinal: esclarecendo dúvidas comuns e combatendo a desinformação com fatos e evidências científicas.
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
                Muita desinformação ainda cerca o uso medicinal da cannabis. Vamos esclarecer alguns dos mitos mais comuns com base em fatos e evidências científicas.
              </p>
            </div>

            {/* Myths and Truths List */}
            <div className="space-y-8">
              {mythsTruths.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  {/* Myth */}
                  <div className="flex items-start mb-3">
                    <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-futuru font-semibold text-red-700 text-lg">Mito:</h3>
                      <p className="font-inter text-brand-purple/90 italic">{item.myth}</p>
                    </div>
                  </div>
                  {/* Truth */}
                  <div className="flex items-start border-t border-gray-200 pt-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-futuru font-semibold text-green-800 text-lg">Verdade:</h3>
                      <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">{item.truth}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

