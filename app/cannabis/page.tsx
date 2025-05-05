import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BookOpen, HeartPulse, PlayCircle, FlaskConical, HelpCircle, Landmark } from 'lucide-react'; // Icons for sections

const subSections = [
  {
    title: "O que é Cannabis Medicinal?",
    description: "Entenda a planta, seus compostos e como ela interage com nosso corpo.",
    icon: BookOpen,
    link: "/cannabis/o-que-e",
    bgColor: "bg-brand-light-green/40",
    iconColor: "text-green-800"
  },
  {
    title: "Benefícios e Indicações",
    description: "Explore as condições de saúde onde a cannabis medicinal tem mostrado potencial terapêutico.",
    icon: HeartPulse,
    link: "/cannabis/beneficios",
    bgColor: "bg-brand-hover-purple/10",
    iconColor: "text-brand-hover-purple"
  },
  {
    title: "Como Iniciar o Tratamento",
    description: "Um guia prático com os passos essenciais para começar seu tratamento com segurança.",
    icon: PlayCircle,
    link: "/cannabis/como-iniciar",
    bgColor: "bg-brand-light-green/40",
    iconColor: "text-green-800"
  },
  {
    title: "Pesquisas Científicas",
    description: "Acesse estudos e artigos científicos que embasam o uso terapêutico da cannabis.",
    icon: FlaskConical,
    link: "/cannabis/pesquisas",
    bgColor: "bg-brand-hover-purple/10",
    iconColor: "text-brand-hover-purple"
  },
  {
    title: "Mitos e Verdades",
    description: "Desmistificando informações incorretas e esclarecendo dúvidas comuns.",
    icon: HelpCircle,
    link: "/cannabis/mitos-e-verdades",
    bgColor: "bg-brand-light-green/40",
    iconColor: "text-green-800"
  },
  {
    title: "Legislação no Brasil",
    description: "Entenda o cenário regulatório atual para o uso medicinal da cannabis no país.",
    icon: Landmark,
    link: "/cannabis/legislacao",
    bgColor: "bg-brand-hover-purple/10",
    iconColor: "text-brand-hover-purple"
  }
];

export default function CannabisInfoCenterPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4 text-center">
          {/* Optional: Add a representative header image here */}
          {/* <Image src="/cannabis-header.jpg" alt="Cannabis Medicinal" width={1200} height={400} className="rounded-lg mb-8 mx-auto" /> */}
          <BookOpen className="w-12 h-12 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Centro de Informação</h1>
          <p className="font-behind italic text-brand-hover-purple text-2xl lg:text-3xl mb-6">
            Cannabis Medicinal
          </p>
          <p className="font-inter text-brand-purple/85 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Bem-vindo ao nosso Centro de Informação sobre Cannabis Medicinal. Aqui, a Floriplanta reúne conhecimento científico atualizado e confiável para pacientes, familiares, profissionais de saúde e todos que buscam entender melhor o potencial terapêutico da cannabis. Navegue pelas seções abaixo para desmistificar conceitos, conhecer os benefícios comprovados, entender como iniciar um tratamento seguro e acompanhar as últimas novidades sobre legislação e pesquisa.
          </p>
        </div>
      </section>

      {/* Sub-sections Navigation */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {subSections.map((section, index) => (
              <Link 
                key={index} 
                href={section.link} 
                className="block bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-100"
              >
                <div className={`w-12 h-12 ${section.bgColor} rounded-full flex items-center justify-center mb-4`}>
                  <section.icon className={`w-6 h-6 ${section.iconColor}`} />
                </div>
                <h3 className="font-futuru font-bold text-brand-purple text-xl mb-2">{section.title}</h3>
                <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">
                  {section.description}
                </p>
                <span className="mt-4 inline-block text-brand-purple font-medium font-inter text-sm hover:text-brand-hover-purple transition-colors duration-300">
                  Saiba Mais &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

