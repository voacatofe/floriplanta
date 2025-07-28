import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import { Droplet, Leaf, FileText, User, AlertTriangle, UserCheck, UserPlus } from 'lucide-react'; // Icons

export default function OleoMarePage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      {/* Page Header */}
      <section className="pt-24 pb-10 lg:pt-32 lg:pb-12 bg-gradient-to-b from-white to-brand-light-green/20"> {/* Adjusted gradient */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            {/* <Link href="/oleos" className="inline-flex items-center text-brand-purple hover:text-brand-hover-purple text-sm font-inter mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para Todos os Óleos
            </Link> */}
            <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl">Óleo Balanceado THC | CBD Full Spectrum - Maré</h1>
            <p className="font-inter text-brand-hover-purple text-lg mt-1">20mg/mL Canabinoides Totais (1:1)</p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="w-full lg:w-1/3">
              <div className="relative aspect-square bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden sticky top-24">
                <Image 
                  src="/images/products/oleo-mare-balanceado.jpg" 
                  alt="Floriplanta Óleo Balanceado THC | CBD Full Spectrum - Maré 20mg/mL"
                  layout="fill" 
                  objectFit="contain" // Use contain to show the whole bottle
                  className="p-4"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-2/3">
              {/* Description */}
              <div className="prose prose-lg max-w-none prose-headings:font-futuru prose-headings:text-brand-purple prose-a:text-brand-hover-purple hover:prose-a:text-brand-purple mb-8">
                <p className="text-lg italic text-brand-purple/85">
                  Como o fluxo da maré que alterna entre alta e baixa, nosso óleo Maré busca o equilíbrio entre forças complementares. Com proporção balanceada de THC e CBD Full Spectrum (1:1), promove a sinergia entre os canabinoides, sendo indicado para diversas condições sob prescrição médica.
                </p>
                {/* Expand description if needed */}
              </div>

              {/* Composition */}
              <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="font-futuru font-bold text-brand-purple text-xl mb-4 flex items-center"><Droplet className="w-5 h-5 mr-2"/>Composição</h2>
                <ul className="font-inter text-brand-purple/85 text-sm space-y-2">
                  <li><strong>Tipo:</strong> Full Spectrum</li>
                  <li><strong>Concentração Principal:</strong> 20 mg/mL de Canabinoides Totais</li>
                  <li><strong>Perfil:</strong> Balanceado THC:CBD (Aproximadamente 1:1)</li>
                  <li><strong>Outros Canabinoides:</strong> Contém outros canabinoides menores (CBG, CBN, etc.) e terpenos presentes naturalmente na planta (conforme laudo).</li>
                  <li><strong>Veículo/Base:</strong> Óleo de Coco Fracionado (MCT) {/* Confirmar se é MCT */}</li>
                  <li><strong>Volume do Frasco:</strong> 30 mL</li>
                </ul>
              </div>

              {/* Production Process */}
              <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="font-futuru font-bold text-brand-purple text-xl mb-4 flex items-center"><Leaf className="w-5 h-5 mr-2"/>Nosso Processo Produtivo</h2>
                <ul className="font-inter text-brand-purple/85 text-sm space-y-2">
                  <li><strong>Cultivo:</strong> Cultivo orgânico e controlado, livre de agrotóxicos, utilizando variedades selecionadas para garantir o perfil desejado de canabinoides.</li>
                  <li><strong>Extração:</strong> Método de extração [Ex: Etanol a frio / CO2 supercrítico - *Confirmar método*] que preserva a integridade dos canabinoides e terpenos (Full Spectrum).</li>
                  <li><strong>Controle de Qualidade:</strong> Rigoroso controle em todas as etapas, desde a matéria-prima até o produto final, com análises laboratoriais para garantir segurança e consistência.</li>
                </ul>
              </div>

              {/* Technical Reports (Laudos) */}
              <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="font-futuru font-bold text-brand-purple text-xl mb-4 flex items-center"><FileText className="w-5 h-5 mr-2"/>Laudos Técnicos (Transparência Total)</h2>
                <p className="font-inter text-brand-purple/85 text-sm mb-4">
                  Acesse os Certificados de Análise (COA) realizados por laboratórios terceirizados independentes, comprovando a potência e a pureza dos nossos óleos.
                </p>
                <div className="space-y-2">
                  {/* Placeholder Links - Replace with actual links when available */}
                  <Link href="#" target="_blank" rel="noopener noreferrer" className="block font-inter text-brand-hover-purple hover:underline text-sm">
                    Laudo Lote [XXXX] - Potência - Óleo Maré (PDF)
                  </Link>
                  <Link href="#" target="_blank" rel="noopener noreferrer" className="block font-inter text-brand-hover-purple hover:underline text-sm">
                    Laudo Lote [XXXX] - Pureza - Óleo Maré (PDF)
                  </Link>
                </div>
                 <p className="text-xs text-brand-purple/60 mt-3 italic">*Links serão atualizados com os laudos dos lotes mais recentes.</p>
              </div>

              {/* How to Access */}
              <div className="mb-8 bg-brand-light-green/30 p-6 rounded-xl border border-green-200">
                <h2 className="font-futuru font-bold text-green-800 text-xl mb-4 flex items-center"><UserCheck className="w-5 h-5 mr-2"/>Como Ter Acesso (Exclusivo para Associados)</h2>
                <p className="font-inter text-green-700 text-sm mb-4">
                  Este óleo é disponibilizado exclusivamente para membros ativos da Floriplanta, mediante apresentação de receita médica válida.
                </p>
                <ol className="list-decimal list-inside font-inter text-green-700 text-sm space-y-2">
                  <li><strong>Seja Associado:</strong> Se ainda não faz parte, <Link href="/associar" className="text-green-800 font-semibold hover:underline">associe-se aqui</Link>.</li>
                  <li><strong>Consulte seu Médico:</strong> Obtenha uma prescrição específica.</li>
                  <li><strong>Acesse a Área do Sócio:</strong> Faça login na sua <Link href="#" className="text-green-800 font-semibold hover:underline">Área do Sócio</Link>. {/* Update link */}</li>
                  <li><strong>Envie sua Receita:</strong> Faça o upload seguro da receita e laudo (se necessário).</li>
                  <li><strong>Aguarde a Análise:</strong> Nossa equipe analisará a documentação.</li>
                  <li><strong>Instruções para Retirada/Envio:</strong> Após aprovação, você receberá as instruções e informações sobre a contribuição associativa relacionada.</li>
                </ol>
                <div className="mt-6 flex flex-wrap gap-4">
                   <Link 
                    href="/associar" 
                    className="inline-flex items-center bg-brand-purple text-white px-4 py-2 rounded-lg font-inter text-sm font-medium hover:bg-brand-hover-purple transition-colors duration-300"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Quero me Associar
                  </Link>
                   <Link 
                    href="#" // Link to Area do Socio
                    className="inline-flex items-center bg-white text-brand-purple px-4 py-2 rounded-lg font-inter text-sm font-medium border border-brand-purple hover:bg-gray-50 transition-colors duration-300"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Acessar Área do Sócio
                  </Link>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-8 p-4 bg-yellow-100/50 border-l-4 border-yellow-400 rounded-r-lg flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-inter text-yellow-700 text-xs leading-relaxed">
                    Este produto é destinado ao uso medicinal sob prescrição e acompanhamento médico. Não garantimos resultados específicos. As informações aqui contidas são educativas e não substituem a orientação profissional. Mantenha fora do alcance de crianças. Armazene em local fresco e escuro.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

