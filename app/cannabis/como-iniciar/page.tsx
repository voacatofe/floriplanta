import React from 'react';
import Link from 'next/link';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import { PlayCircle, Stethoscope, FileText, Truck, Users, Pill, Droplet, Cloud, Hand, TrendingUp, ListChecks, AlertTriangle, ShieldCheck } from 'lucide-react'; // Example icons

// Reusable Sidebar Component (assuming it's in a shared location or copied)
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
                  className={`block py-2 px-3 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${item.href === '/cannabis/como-iniciar' ? 'bg-brand-light-green/50 font-medium' : ''}`}
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

const steps = [
  {
    icon: Stethoscope,
    title: "Consulte um Médico Prescritor",
    text: "Este é o passo mais importante. Apenas um médico pode avaliar sua condição, indicar se a cannabis medicinal é apropriada, definir a formulação (CBD, THC, proporções), via de administração e dosagem inicial. Procure profissionais com experiência na área.",
    links: [
      // { text: "Encontre Profissionais Parceiros", href: "/medicos" } // Link to be added when page exists
    ]
  },
  {
    icon: FileText,
    title: "Obtenha a Prescrição Médica",
    text: "A receita é essencial e deve conter detalhes como nome do paciente, produto (composição), posologia e quantidade necessária."
  },
  {
    icon: Truck, // Changed icon to represent access/delivery
    title: "Escolha a Via de Acesso ao Produto",
    text: "Existem diferentes formas de obter o produto legalmente:",
    subpoints: [
      { title: "Importação (Via Anvisa)", text: "Pacientes podem importar produtos mediante autorização da Anvisa (processo envolve cadastro, envio da receita e laudo).", link: { text: "Guia Anvisa (em breve)", href: "#" } },
      { title: "Associações de Pacientes", text: "Associações como a Floriplanta podem fornecer acesso a óleos para associados, mediante prescrição.", link: { text: "Associe-se", href: "/associar" } },
      { title: "Farmácias (Produtos Aprovados)", text: "Alguns produtos específicos estão disponíveis em farmácias, geralmente com custo elevado." },
      { title: "Habeas Corpus para Cultivo", text: "Autorização judicial para cultivo medicinal é possível em casos específicos, exigindo assessoria jurídica.", link: { text: "Saiba mais em Legislação", href: "/cannabis/legislacao" } }
    ]
  },
  {
    icon: Pill, // Changed icon to represent administration methods
    title: "Entenda as Vias de Administração",
    text: "A forma como você utiliza o produto influencia o início e a duração do efeito:",
    subpoints: [
      { title: "Oral/Sublingual (Óleos, Tinturas, Cápsulas)", icon: Droplet, text: "Efeito mais duradouro, início de ação em 30-90 minutos." },
      { title: "Inalatória (Vaporização)", icon: Cloud, text: "Efeito rápido (minutos), útil para alívio imediato, duração menor. Requer vaporizador." },
      { title: "Tópica (Cremes, Pomadas)", icon: Hand, text: "Ação localizada na pele/músculos, sem efeitos sistêmicos significativos." }
    ]
  },
  {
    icon: TrendingUp,
    title: "Comece com Doses Baixas e Ajuste Gradualmente",
    text: "A dosagem ideal varia. Siga a orientação médica: 'Start Low, Go Slow'. Inicie com doses baixas, aumentando gradualmente conforme resposta e tolerância, até encontrar a dose mínima eficaz."
  },
  {
    icon: ListChecks,
    title: "Monitore os Efeitos",
    text: "Mantenha um diário para registrar dose, horários, efeitos percebidos (positivos e negativos) e intensidade dos sintomas. Isso ajudará o médico a ajustar o tratamento.",
    links: [
      // { text: "Baixar Modelo de Diário (PDF)", href: "#" } // Link to be added
    ]
  },
  {
    icon: AlertTriangle,
    title: "Esteja Ciente dos Possíveis Efeitos Adversos",
    text: "Embora geralmente bem tolerada, a cannabis pode causar efeitos colaterais, especialmente com THC (tontura, boca seca, sonolência, alterações de humor, taquicardia). O CBD é menos propenso a causar efeitos adversos. Comunique qualquer efeito indesejado ao seu médico."
  },
  {
    icon: ShieldCheck,
    title: "Qualidade e Segurança",
    text: "Certifique-se de que o produto utilizado tenha controle de qualidade e laudos de análise que comprovem sua composição (concentração de canabinoides) e ausência de contaminantes."
  }
];

export default function ComoIniciarPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-center mb-4">
             <PlayCircle className="w-8 h-8 text-brand-purple mr-3" />
             <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl">Como Iniciar o Tratamento</h1>
          </div>
           <p className="font-inter text-brand-purple/85 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Um guia prático com os passos essenciais para começar seu tratamento com cannabis medicinal de forma segura e eficaz, sempre com acompanhamento médico.
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
                Iniciar um tratamento com cannabis medicinal requer informação, orientação médica e paciência. Siga estes passos para um começo seguro e eficaz:
              </p>
            </div>

            {/* Steps List */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center mr-6 mt-1">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-grow bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-futuru font-bold text-brand-purple text-xl mb-2">{index + 1}. {step.title}</h3>
                    <p className="font-inter text-brand-purple/80 text-sm leading-relaxed mb-3">
                      {step.text}
                    </p>
                    {step.subpoints && (
                      <ul className="list-disc list-inside space-y-2 pl-4 mb-3">
                        {step.subpoints.map((sub, subIndex) => (
                          <li key={subIndex} className="font-inter text-brand-purple/80 text-sm leading-relaxed">
                            {sub.icon && <sub.icon className="inline-block w-4 h-4 mr-1 text-brand-hover-purple align-text-bottom"/>}
                            <strong>{sub.title}:</strong> {sub.text}
                            {sub.link && 
                              <Link href={sub.link.href} className="text-brand-hover-purple hover:underline ml-1 text-xs">
                                ({sub.link.text})
                              </Link>
                            }
                          </li>
                        ))}
                      </ul>
                    )}
                    {step.links && step.links.length > 0 && (
                      <div className="mt-3 space-x-4">
                        {step.links.map((link, linkIndex) => (
                          <Link key={linkIndex} href={link.href} className="text-brand-hover-purple hover:underline font-medium text-sm">
                            {link.text} &rarr;
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

             {/* Disclaimer */}
            <div className="mt-12 lg:mt-16 p-6 bg-yellow-100/50 border-l-4 border-yellow-400 rounded-r-lg flex items-start">
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-futuru font-bold text-yellow-800 mb-2">Atenção Importante</h4>
                <p className="font-inter text-yellow-700 text-sm leading-relaxed">
                  Este guia oferece orientações gerais. A jornada de cada paciente é única. Siga sempre as recomendações do seu médico prescritor. A automedicação pode ser prejudicial à sua saúde.
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

