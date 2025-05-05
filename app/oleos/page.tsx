import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Droplet, AlertTriangle, UserPlus } from 'lucide-react'; // Icons

const oilTypes = [
  {
    name: "Terral",
    title: "Óleo CBD Full Spectrum - Terral",
    description: "Assim como o vento terral acalma o mar, nosso óleo Terral, rico em Canabidiol (CBD) Full Spectrum, traz relaxamento e equilíbrio. Ideal para auxiliar no manejo da ansiedade, inflamações e na busca por bem-estar geral.",
    concentration: "20mg/mL de Canabinoides Totais (predominantemente CBD)",
    image: "/images/products/oleo-terral-cbd.jpg",
    link: "/oleos/terral" // Link to individual page
  },
  {
    name: "Swell",
    title: "Óleo THC Full Spectrum - Swell",
    description: "Com a potência e energia das grandes ondulações (swell), nosso óleo Swell, rico em Tetrahidrocanabinol (THC) Full Spectrum, alinha-se a um efeito mais estimulante e expansivo. Indicado sob prescrição para condições como dor crônica e falta de apetite.",
    concentration: "20mg/mL de Canabinoides Totais (predominantemente THC)",
    image: "/images/products/oleo-swell-thc.jpg",
    link: "/oleos/swell" // Link to individual page
  },
  {
    name: "Maré",
    title: "Óleo Balanceado THC | CBD Full Spectrum - Maré",
    description: "Como o fluxo da maré que alterna entre alta e baixa, nosso óleo Maré busca o equilíbrio entre forças complementares. Com proporção balanceada de THC e CBD Full Spectrum (1:1), promove a sinergia entre os canabinoides.",
    concentration: "20mg/mL de Canabinoides Totais (Aprox. 10mg/mL THC + 10mg/mL CBD)",
    image: "/images/products/oleo-mare-balanceado.jpg",
    link: "/oleos/mare" // Link to individual page
  }
];

export default function NossosOleosPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4 text-center">
          <Droplet className="w-10 h-10 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Conheça os Óleos da Floriplanta</h1>
          <p className="font-inter text-brand-purple/85 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            Na Floriplanta, dedicamo-nos a produzir óleos de cannabis medicinal de alta qualidade, cultivados e processados com rigor e cuidado, seguindo boas práticas para garantir a segurança e eficácia para nossos associados.
          </p>
          
          {/* Important Notice */}
          <div className="max-w-2xl mx-auto p-4 bg-yellow-100/60 border border-yellow-300 rounded-lg flex items-center justify-center text-yellow-800 mb-8">
            <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="font-inter text-sm font-medium">
              Importante: Os óleos são exclusivos para associados, mediante prescrição médica válida.
            </p>
          </div>

          <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            Nosso objetivo não é vender um produto, mas sim viabilizar o acesso a um tratamento seguro e de qualidade, como parte do suporte integral que oferecemos à nossa comunidade. Explore abaixo nossas formulações.
          </p>

          <Link 
            href="/associar" 
            className="inline-flex items-center bg-brand-purple text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-brand-hover-purple transition-colors duration-300"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Ainda não é associado? Saiba como
          </Link>
        </div>
      </section>

      {/* Oil Formulations Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Nossas Formulações: Terral, Swell e Maré</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            Inspirados nos elementos naturais de Florianópolis, desenvolvemos três formulações Full Spectrum para atender às diversas necessidades terapêuticas, sempre sob orientação médica.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {oilTypes.map((oil) => (
              <div 
                key={oil.name} 
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-100"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image 
                    src={oil.image} 
                    alt={oil.title} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-futuru font-bold text-brand-purple text-2xl mb-2">{oil.name}</h3>
                  <p className="font-inter text-brand-hover-purple text-sm font-medium mb-3">{oil.title}</p>
                  <p className="font-inter text-brand-purple/80 text-sm leading-relaxed flex-grow mb-4">
                    {oil.description}
                  </p>
                  <p className="font-inter text-brand-purple/70 text-xs mb-4">
                    <strong>Concentração:</strong> {oil.concentration}
                  </p>
                  <Link 
                    href={oil.link} 
                    className="mt-auto inline-block text-center bg-brand-light-green text-brand-purple px-4 py-2 rounded-lg font-inter text-sm font-semibold hover:bg-opacity-80 transition-all duration-300"
                  >
                    Ver Detalhes e Laudos
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

