import React from 'react';
import Link from 'next/link';
import Footer from "@/components/layout/Footer";
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

            <h3>RDC nº 660/2022 - Importação para Uso Próprio</h3>
            <p>
              A resolução mais atual para importação pessoal, que trouxe importantes simplificações:
            </p>
            <ul>
              <li><strong>Cadastro válido por 2 anos</strong> (anteriormente era anual)</li>
              <li><strong>Prescrição válida por 6 meses</strong> para múltiplas importações</li>
              <li><strong>Análise simplificada automática</strong> para produtos constantes em Nota Técnica da Anvisa</li>
              <li><strong>Intermediação permitida</strong> por hospitais, unidades governamentais de saúde e operadoras de planos de saúde</li>
              <li><strong>Múltiplas formas de importação:</strong> registro no sistema de comércio exterior, bagagem acompanhada ou remessa expressa</li>
              <li><strong>Proibida importação por remessa postal</strong></li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              <Link href="https://www.in.gov.br/en/web/dou/-/resolucao-rdc-n-660-de-30-de-marco-de-2022-389908959" target="_blank" rel="noopener noreferrer">[Ver RDC 660/2022 completa]</Link>
            </p>

            <h3>RDC nº 327/2019 - Produtos Farmacêuticos</h3>
            <p>
              Ainda vigente para produtos vendidos em farmácias, dispõe sobre os procedimentos para a concessão da Autorização Sanitária para a fabricação e a importação, bem como estabelece requisitos para a comercialização, prescrição, dispensação, monitoramento e fiscalização de produtos de Cannabis para fins medicinais.
            </p>

            <h3>Principais Mudanças com a RDC 660/2022</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 my-4">
              <h4 className="font-semibold text-green-800 mb-2">Facilitações Implementadas:</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• <strong>Renovação menos frequente:</strong> Cadastro válido por 2 anos ao invés de 1 ano</li>
                <li>• <strong>Menos burocracia:</strong> Prescrição válida por 6 meses para múltiplas importações</li>
                <li>• <strong>Aprovação mais rápida:</strong> Análise automática para produtos pré-aprovados</li>
                <li>• <strong>Mais opções de importação:</strong> Inclusive bagagem acompanhada em viagens</li>
                <li>• <strong>Apoio institucional:</strong> Hospitais e planos de saúde podem intermediar</li>
              </ul>
            </div>

            <h3>Documentos Necessários para Importação</h3>
            <p>Conforme a RDC 660/2022, para cada importação são necessários:</p>
            <ul>
              <li>Formulário de petição</li>
              <li>Conhecimento da carga embarcada</li>
              <li>Fatura comercial</li>
              <li>Prescrição médica válida (6 meses de validade)</li>
              <li>Comprovante de endereço do paciente</li>
            </ul>
            <p className="text-sm text-gray-600">
              <strong>Exceção:</strong> Na importação por bagagem acompanhada, dispensam-se os três primeiros documentos, sendo necessário apenas portar cópia da autorização da Anvisa.
            </p>

            <h3>Responsabilidades e Limitações</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Importante saber:</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• O uso é <strong>estritamente pessoal e intransferível</strong></li>
                <li>• É <strong>proibida a venda, doação ou entrega a terceiros</strong></li>
                <li>• O paciente assume total responsabilidade pelos efeitos e eventos adversos</li>
                <li>• Não há comprovação oficial de qualidade, segurança e eficácia pela Anvisa</li>
                <li>• O produto deve ser de estabelecimentos regularizados no país de origem</li>
              </ul>
            </div>

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

