import React from 'react';
import Link from 'next/link';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Landmark, FileText, Scale, Leaf, AlertTriangle } from 'lucide-react'; // Example icons

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
                  className={`block py-2 px-3 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${item.href === '/cannabis/legislacao' ? 'bg-brand-light-green/50 font-medium' : ''}`}
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

export default function LegislacaoPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-hover-purple/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center text-center mb-4">
             <Landmark className="w-8 h-8 text-brand-purple mr-3" />
             <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl">Legislação no Brasil</h1>
          </div>
           <p className="font-inter text-brand-purple/85 text-center text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Entendendo o cenário regulatório brasileiro para o uso medicinal da cannabis, suas permissões, restrições e perspectivas futuras.
          </p>
        </div>
      </section>

      {/* Main Content Area with Sidebar */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row">
          <CannabisSidebarNav />
          <article className="w-full lg:w-3/4 lg:pl-8 prose prose-lg max-w-none prose-headings:font-futuru prose-headings:text-brand-purple prose-a:text-brand-hover-purple hover:prose-a:text-brand-purple">
            
            <p>
              A regulamentação da cannabis medicinal no Brasil está em constante evolução. Compreender as normas atuais é essencial para pacientes, médicos e associações.
            </p>

            <h2 className="flex items-center"><FileText className="w-6 h-6 mr-2"/>Regulamentação da Anvisa</h2>
            <p>
              A Agência Nacional de Vigilância Sanitária (Anvisa) possui Resoluções da Diretoria Colegiada (RDCs) que normatizam a importação e a fabricação/comercialização de produtos de cannabis para fins medicinais. As principais são:
            </p>
            <ul>
              <li>
                <strong>RDC nº 660/2022 (e atualizações):</strong> Define os critérios e procedimentos para a importação de Produto derivado de Cannabis por pessoa física, para uso próprio, mediante prescrição de profissional legalmente habilitado. 
                <Link href="https://www.in.gov.br/en/web/dou/-/resolucao-rdc-n-660-de-30-de-marco-de-2022-390472999" target="_blank" rel="noopener noreferrer" className="text-xs ml-1">(Link para RDC)</Link>
              </li>
              <li>
                <strong>RDC nº 327/2019 (e atualizações):</strong> Dispõe sobre os procedimentos para a concessão da Autorização Sanitária para a fabricação e a importação, bem como estabelece requisitos para a comercialização, prescrição, dispensação, monitoramento e fiscalização de produtos de Cannabis para fins medicinais (vendidos em farmácias).
                <Link href="https://www.in.gov.br/en/web/dou/-/resolucao-rdc-n-327-de-11-de-dezembro-de-2019-232669072" target="_blank" rel="noopener noreferrer" className="text-xs ml-1">(Link para RDC)</Link>
              </li>
            </ul>
            <p>
              É fundamental consultar o <Link href="https://www.gov.br/anvisa/pt-br/assuntos/medicamentos/cannabis" target="_blank" rel="noopener noreferrer">portal da Anvisa</Link> para obter as informações mais atualizadas sobre o processo de importação e os produtos autorizados.
            </p>

            <h2 className="flex items-center"><Scale className="w-6 h-6 mr-2"/>Habeas Corpus para Cultivo Medicinal</h2>
            <p>
              Embora o cultivo da cannabis ainda seja proibido no Brasil pela Lei de Drogas (Lei nº 11.343/2006), pacientes têm conseguido na justiça o direito de cultivar a planta para fins exclusivamente medicinais, por meio de Habeas Corpus preventivo. 
            </p>
            <p>
              Essa via garante um salvo-conduto para que o paciente (ou seu responsável legal) possa cultivar a quantidade de plantas necessária para seu tratamento, conforme laudo e prescrição médica, sem risco de ser criminalizado por tráfico de drogas. É um processo judicial individual, que exige comprovação da necessidade terapêutica, da incapacidade de arcar com os custos dos produtos importados/farmacêuticos e da adequação do cultivo caseiro.
            </p>
            <p>
              Associações como a Floriplanta podem oferecer orientação jurídica e suporte para pacientes que buscam essa alternativa, conectando-os a advogados especializados.
            </p>

            <h2 className="flex items-center"><Leaf className="w-6 h-6 mr-2"/>Projetos de Lei e Perspectivas Futuras</h2>
            <p>
              Diversos projetos de lei tramitam no Congresso Nacional buscando ampliar e facilitar o acesso à cannabis medicinal no Brasil. Os principais debates envolvem:
            </p>
            <ul>
              <li>Regulamentação do cultivo da cannabis para fins medicinais e industriais (cânhamo) em território nacional.</li>
              <li>Ampliação da lista de produtos disponíveis no SUS e em farmácias.</li>
              <li>Simplificação dos processos de autorização e prescrição.</li>
              <li>Fomento à pesquisa científica nacional com a planta.</li>
            </ul>
            <p>
              Acompanhar esses debates e participar ativamente das discussões é fundamental para garantir que a legislação avance de forma a beneficiar os pacientes que necessitam do tratamento. 
              {/* Optional: Link to a page tracking relevant PLs */}
            </p>

            <div className="mt-12 lg:mt-16 p-6 bg-blue-100/50 border-l-4 border-blue-400 rounded-r-lg flex items-start">
              <AlertTriangle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-futuru font-bold text-blue-800 mb-2">Importante</h4>
                <p className="font-inter text-blue-700 text-sm leading-relaxed">
                  A legislação sobre cannabis medicinal está em constante mudança. As informações aqui apresentadas refletem o cenário atual, mas podem sofrer alterações. Consulte sempre fontes oficiais (Anvisa, Diário Oficial) e busque orientação jurídica especializada para casos específicos, especialmente relacionados ao cultivo.
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

