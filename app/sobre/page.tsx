import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import { Users, Heart, BookOpen, Scale, Handshake, Target, Eye, FileText } from 'lucide-react';

// Dados reais da diretoria da Floriplanta
const diretores = [
  { 
    name: 'Isadora Malohlava', 
    role: 'Presidente', 
    image: '/Diretores/Isadora Malohlava - Presidente.jpg',
    gradientFrom: 'from-brand-purple/20',
    gradientTo: 'to-brand-hover-purple/30',
  },
  { 
    name: 'Leonardo Penna', 
    role: 'Vice-Presidente', 
    image: '/Diretores/Leonardo Penna - Vice presidente.jpg',
    gradientFrom: 'from-brand-light-green/40',
    gradientTo: 'to-brand-purple/20',
  },
  { 
    name: 'Rodrigo Amorim', 
    role: 'Tesoureiro e Arquiteto', 
    image: '/Diretores/Rodrigo Amorim - Tesoureiro e Arquiteto.jpg',
    gradientFrom: 'from-brand-hover-purple/20',
    gradientTo: 'to-brand-light-green/40',
  },
  { 
    name: 'Dr. Rodolfo Hellmann', 
    role: 'Diretor Médico e Psiquiatra', 
    image: '/Diretores/Rodolfo Hellmann - Diretor médico e médico psiquiatra.jpg',
    gradientFrom: 'from-brand-purple/30',
    gradientTo: 'to-brand-hover-purple/20',
  },
  { 
    name: 'Paula Machinski', 
    role: 'Farmacêutica', 
    image: '/Diretores/Paula Machinski - Farmaceutica.jpg',
    gradientFrom: 'from-brand-light-green/50',
    gradientTo: 'to-brand-purple/30',
  },
  { 
    name: 'Vinícius Gomes', 
    role: 'Engenheiro Químico', 
    image: '/Diretores/Vinicius Gomes - Engenheiro quimico.jpg',
    gradientFrom: 'from-brand-hover-purple/30',
    gradientTo: 'to-brand-light-green/30',
  },
  { 
    name: 'Jade Macedo', 
    role: 'Gestora de Projetos', 
    image: '/Diretores/Jade Macedo - Gestora de projeots.jpg',
    gradientFrom: 'from-brand-purple/20',
    gradientTo: 'to-brand-hover-purple/40',
  },
  { 
    name: 'Bruna Pfiffer', 
    role: 'Diretora Jurídica', 
    image: '/Diretores/Bruna pfiffer - Diretora Juridica Floriplanta.jpg',
    gradientFrom: 'from-brand-light-green/30',
    gradientTo: 'to-brand-purple/40',
  },
  { 
    name: 'Daniel Pontes', 
    role: 'Financeiro', 
    image: '/Diretores/Daniel Pontes - Financeiro.jpg',
    gradientFrom: 'from-brand-purple/20',
    gradientTo: 'to-brand-hover-purple/30',
  },
];

const partners = [
  { name: 'Logo Parceiro 1', link: '#', image: '/placeholder-partner-1.png' },
  { name: 'Logo Parceiro 2', link: '#', image: '/placeholder-partner-2.png' },
  { name: 'Logo Parceiro 3', link: '#', image: '/placeholder-partner-3.png' },
  { name: 'Logo Parceiro 4', link: '#', image: '/placeholder-partner-4.png' },
];

export default function SobreNosPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-[#f0f9e8]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Sobre a Floriplanta</h1>
          <p className="font-behind italic text-brand-hover-purple text-2xl lg:text-3xl">
            Cultivando Saúde, Semeando Comunidade
          </p>
          {/* Optional: Add a representative header image here */}
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Uma Jornada pela Saúde e Dignidade</h2>
            <div className="font-inter text-brand-purple/85 text-base lg:text-lg leading-relaxed space-y-4">
              <p>
                A Floriplanta nasceu da união de pacientes, familiares e profissionais de diversas áreas que compartilhavam uma visão: garantir o acesso digno e seguro à cannabis medicinal como ferramenta terapêutica em Santa Catarina.
                {/* TODO: Adaptar e expandir com base na história real da Floriplanta */}
              </p>
              <p>
                Desde a fundação, em 2024, temos enfrentado barreiras legais, mas seguimos reivindicando o espaço do associativismo e a saúde como direitos, sempre nos pautando pela ciência, pela empatia e pela urgência de quem busca alívio e qualidade de vida. Acreditamos no poder da informação para quebrar preconceitos e na força da coletividade para promover mudanças significativas. Nossa trajetória é marcada pela luta por direitos, pela busca incessante por conhecimento e pelo acolhimento de cada pessoa que nos procura.
              </p>
              <p>
                Temos o objetivo de conectar pacientes a tratamentos eficazes, oferecendo suporte integral e advogando por políticas públicas que reconheçam o valor terapêutico da cannabis. Continuamos firmes em nosso propósito, cultivando saúde e semeando esperança a cada dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 lg:py-20 bg-brand-light-green/30">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-12 text-center">O Que Nos Guia</h2>
          
          {/* Missão e Visão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Missão */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Target className="w-10 h-10 text-brand-purple mx-auto mb-4" />
              <h3 className="font-futuru font-bold text-brand-purple text-2xl mb-3">Missão</h3>
              <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">
                Construir uma comunidade sólida para democratizar o acesso à informação e ao tratamento com o uso da cannabis medicinal em Santa Catarina, através de um movimento de educação, acolhimento e ativismopor políticas públicas justas.
              </p>
            </div>
            
            {/* Visão */}
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <Eye className="w-10 h-10 text-brand-purple mx-auto mb-4" />
              <h3 className="font-futuru font-bold text-brand-purple text-2xl mb-3">Visão</h3>
              <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">
                Ser uma referência no apoio a pacientes e na promoção do uso consciente e responsável da cannabis medicinal, contribuindo para uma sociedade mais informada, saudável e inclusiva.
              </p>
            </div>
          </div>

          {/* Valores Section */}
          <div className="text-center mb-12">
            <div className="flex flex-col items-center">
              <Heart className="w-10 h-10 text-brand-purple mb-4" />
              <h3 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-3">Valores</h3>
              <p className="font-inter text-brand-purple/80 text-base lg:text-lg max-w-2xl leading-relaxed">
                Nossos pilares fundamentais que orientam cada ação.
              </p>
            </div>
          </div>

          {/* Valores Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[ 
              { icon: Heart, title: 'Empatia', text: 'Colocamo-nos no lugar de cada paciente, oferecendo escuta ativa, acolhimento e suporte humanizado.', iconBg: 'bg-brand-hover-purple/15' },
              { icon: BookOpen, title: 'Educação', text: 'Combatemos a desinformação com conhecimento científico sólido, promovendo a conscientização.', iconBg: 'bg-brand-light-green/50' },
              { icon: Users, title: 'Inclusão', text: 'Lutamos para que todos que necessitam tenham acesso justo e equitativo ao tratamento.', iconBg: 'bg-brand-hover-purple/15' },
              { icon: Scale, title: 'Responsabilidade', text: 'Atuamos com ética, transparência e compromisso inabalável com nossos associados e a sociedade.', iconBg: 'bg-brand-light-green/50' },
              { icon: Handshake, title: 'Justiça Social', text: 'Advogamos por políticas públicas que garantam os direitos dos pacientes e removam barreiras ao acesso.', iconBg: 'bg-brand-hover-purple/15' },
            ].map((value, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className={`rounded-full w-12 h-12 flex items-center justify-center ${value.iconBg} mb-3`}>
                  <value.icon className="text-brand-purple w-5 h-5" />
                </div>
                <h4 className="font-futuru font-bold text-brand-purple text-lg mb-2">{value.title}</h4>
                <p className="font-inter text-brand-purple/80 text-xs leading-relaxed">
                  {value.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Diretoria */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-4 text-center">Nossa Diretoria</h2>
            <p className="font-inter text-brand-purple/70 text-base lg:text-lg text-center max-w-3xl mx-auto mb-16">
              Conheça os profissionais dedicados que lideram a Floriplanta, cada um trazendo sua expertise única para fortalecer nossa missão de democratizar o acesso à cannabis medicinal em Santa Catarina.
            </p>
            
            {/* Grid de Diretores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {diretores.map((diretor, index) => (
                <div key={index} className="group">
                  <div className={`relative overflow-hidden rounded-2xl mb-6 bg-gradient-to-br ${diretor.gradientFrom} ${diretor.gradientTo} aspect-[4/5]`}>
                    <Image 
                      src={diretor.image} 
                      alt={diretor.name} 
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-futuru font-bold text-brand-purple text-lg mb-2 text-center">{diretor.name}</h3>
                  <p className="font-inter text-brand-purple/70 text-sm text-center font-medium">{diretor.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-10 h-10 text-brand-purple mx-auto mb-4" />
            <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6">Nosso Compromisso com a Transparência</h2>
            <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed mb-8">
              Acreditamos que a transparência é fundamental para construir e manter a confiança da nossa comunidade. Disponibilizamos aqui documentos importantes sobre nossa atuação e governança.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/estatuto_social.pdf" className="font-inter text-brand-purple underline hover:text-brand-hover-purple transition-colors duration-300 text-sm" target="_blank" rel="noopener noreferrer">Estatuto Social</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Fortalecendo Nossa Rede</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            Acreditamos no poder da colaboração. A Floriplanta se orgulha de contar com o apoio de diversas organizações, profissionais e instituições que compartilham nossos valores e contribuem para nossa missão.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 mb-12">
            {partners.map((partner, index) => (
              <Link key={index} href={partner.link} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image 
                  src={partner.image} 
                  alt={partner.name} 
                  width={140} 
                  height={70} 
                  objectFit="contain"
                />
              </Link>
            ))}
          </div>
          <div className="text-center">
            <p className="font-inter text-brand-purple/80 mb-4">Quer colaborar com a Floriplanta?</p>
            <Link 
              href="/contato" 
              className="bg-brand-purple text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-brand-hover-purple transition-colors duration-300"
            >
              Entre em Contato
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

