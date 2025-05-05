import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, Book, UserPlus, Scale, Target, Eye, Users, FileText, Handshake } from 'lucide-react'; // Added more icons

// Placeholder data for team and partners - replace with real data
const teamMembers = [
  { name: "Nome Completo 1", role: "Presidente", bio: "Breve bio ou motivação...", image: "/placeholder-team-1.jpg" },
  { name: "Nome Completo 2", role: "Diretor(a) Científico(a)", bio: "Breve bio ou motivação...", image: "/placeholder-team-2.jpg" },
  { name: "Nome Completo 3", role: "Coordenador(a) de Acolhimento", bio: "Breve bio ou motivação...", image: "/placeholder-team-3.jpg" },
];

const partners = [
  { name: "Logo Parceiro 1", link: "#", image: "/placeholder-partner-1.png" },
  { name: "Logo Parceiro 2", link: "#", image: "/placeholder-partner-2.png" },
  { name: "Logo Parceiro 3", link: "#", image: "/placeholder-partner-3.png" },
  { name: "Logo Parceiro 4", link: "#", image: "/placeholder-partner-4.png" },
];

export default function SobreNosPage() {
  return (
    <main className="bg-[#f8f5f0] dark:bg-dark-bg overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-[#f0f9e8] dark:from-dark-bg dark:to-[#1e2a1e]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-4xl lg:text-5xl mb-4">Sobre a Floriplanta</h1>
          <p className="font-behind italic text-brand-hover-purple dark:text-dark-brand-purple text-2xl lg:text-3xl">
            Cultivando Saúde, Semeando Comunidade
          </p>
          {/* Optional: Add a representative header image here */}
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 lg:py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-3xl lg:text-4xl mb-6 text-center">Uma Jornada pela Saúde e Dignidade</h2>
            <div className="font-inter text-brand-purple/85 dark:text-dark-text text-base lg:text-lg leading-relaxed space-y-4">
              <p>
                A Floriplanta nasceu da união de pacientes, familiares e profissionais de saúde que compartilhavam uma visão: garantir o acesso digno e seguro à cannabis medicinal como ferramenta terapêutica em Santa Catarina. 
                {/* TODO: Adaptar e expandir com base na história real da Floriplanta */}
              </p>
              <p>
                Desde [Ano de Fundação], enfrentamos barreiras legais e sociais, sempre pautados pela ciência, pela empatia e pela urgência de quem busca alívio e qualidade de vida. Acreditamos no poder da informação para quebrar preconceitos e na força da comunidade para promover mudanças significativas. Nossa trajetória é marcada pela luta por direitos, pela busca incessante por conhecimento e pelo acolhimento de cada pessoa que nos procura.
              </p>
              <p>
                Hoje, somos uma referência no estado, conectando pacientes a tratamentos eficazes, oferecendo suporte integral e advogando por políticas públicas que reconheçam o valor terapêutico da cannabis. Continuamos firmes em nosso propósito, cultivando saúde e semeando esperança a cada dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="py-16 lg:py-20 bg-brand-light-green/30 dark:bg-dark-brand-green/10">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-3xl lg:text-4xl mb-12 text-center">O Que Nos Guia</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
            {/* Missão */}
            <div className="text-center p-6 bg-white dark:bg-dark-bg/80 rounded-xl shadow-sm">
              <Target className="w-10 h-10 text-brand-purple dark:text-dark-brand-purple mx-auto mb-4" />
              <h3 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-2xl mb-3">Missão</h3>
              <p className="font-inter text-brand-purple/80 dark:text-dark-text text-sm leading-relaxed">
                Construir uma comunidade sólida para democratizar o acesso à informação e ao tratamento com o uso da cannabis medicinal em Santa Catarina, através de um movimento de educação, acolhimento e advocacy por políticas públicas justas.
              </p>
            </div>
            {/* Visão */}
            <div className="text-center p-6 bg-white dark:bg-dark-bg/80 rounded-xl shadow-sm">
              <Eye className="w-10 h-10 text-brand-purple dark:text-dark-brand-purple mx-auto mb-4" />
              <h3 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-2xl mb-3">Visão</h3>
              <p className="font-inter text-brand-purple/80 dark:text-dark-text text-sm leading-relaxed">
                Ser a principal referência em Santa Catarina no apoio a pacientes e na promoção do uso consciente e responsável da cannabis medicinal, contribuindo para uma sociedade mais informada, saudável e inclusiva.
              </p>
            </div>
            {/* Valores Intro - Spanning full width on mobile/medium */}
            <div className="md:col-span-1 text-center p-6 bg-white dark:bg-dark-bg/80 rounded-xl shadow-sm flex flex-col justify-center">
               <Heart className="w-10 h-10 text-brand-purple dark:text-dark-brand-purple mx-auto mb-4" />
              <h3 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-2xl mb-3">Valores</h3>
              <p className="font-inter text-brand-purple/80 dark:text-dark-text text-sm leading-relaxed">
                Nossos pilares fundamentais que orientam cada ação.
              </p>
            </div>
          </div>
          {/* Valores Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[ 
                { icon: Heart, title: "Empatia", text: "Colocamo-nos no lugar de cada paciente, oferecendo escuta ativa, acolhimento e suporte humanizado.", iconBg: "bg-brand-hover-purple/15 dark:bg-dark-brand-purple/20" },
                { icon: Book, title: "Educação", text: "Combatemos a desinformação com conhecimento científico sólido, promovendo a conscientização.", iconBg: "bg-brand-light-green/50 dark:bg-dark-brand-green/20" },
                { icon: UserPlus, title: "Inclusão", text: "Lutamos para que todos que necessitam tenham acesso justo e equitativo ao tratamento.", iconBg: "bg-brand-hover-purple/15 dark:bg-dark-brand-purple/20" },
                { icon: Scale, title: "Responsabilidade", text: "Atuamos com ética, transparência e compromisso inabalável com nossos associados e a sociedade.", iconBg: "bg-brand-light-green/50 dark:bg-dark-brand-green/20" },
                { icon: Handshake, title: "Justiça Social", text: "Advogamos por políticas públicas que garantam os direitos dos pacientes e removam barreiras ao acesso.", iconBg: "bg-brand-hover-purple/15 dark:bg-dark-brand-purple/20" }, // Using Handshake for Justice
              ].map((value, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-dark-bg/80 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className={`rounded-full w-12 h-12 flex items-center justify-center ${value.iconBg} mb-3`}>
                    <value.icon className="text-brand-purple dark:text-dark-brand-purple w-5 h-5" />
                  </div>
                  <h4 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-lg mb-2">{value.title}</h4>
                  <p className="font-inter text-brand-purple/80 dark:text-dark-text text-xs leading-relaxed">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 lg:py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-3xl lg:text-4xl mb-6 text-center">As Pessoas por Trás da Floriplanta</h2>
          <p className="font-inter text-brand-purple/80 dark:text-dark-text text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            Conheça a equipe dedicada que trabalha diariamente para cumprir a missão da Floriplanta. Somos pacientes, familiares, profissionais de saúde e voluntários unidos pelo mesmo propósito.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center bg-gray-50 dark:bg-dark-bg/80 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  width={120} 
                  height={120} 
                  className="rounded-full mx-auto mb-4 border-4 border-brand-light-green dark:border-dark-brand-green"
                />
                <h3 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-xl mb-1">{member.name}</h3>
                <p className="font-inter font-medium text-brand-hover-purple dark:text-dark-brand-purple text-sm mb-2">{member.role}</p>
                <p className="font-inter text-brand-purple/70 dark:text-dark-text text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
            {/* Add a note if the team is larger or if it's a general representation */}
          </div>
        </div>
      </section>

      {/* Transparência */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0] dark:bg-dark-bg/90">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FileText className="w-10 h-10 text-brand-purple dark:text-dark-brand-purple mx-auto mb-4" />
            <h2 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-3xl lg:text-4xl mb-6">Nosso Compromisso com a Transparência</h2>
            <p className="font-inter text-brand-purple/80 dark:text-dark-text text-base lg:text-lg leading-relaxed mb-8">
              Acreditamos que a transparência é fundamental para construir e manter a confiança da nossa comunidade. Disponibilizamos aqui documentos importantes sobre nossa atuação e governança.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Replace # with actual links when available */}
              <Link href="#" className="font-inter text-brand-purple dark:text-dark-brand-purple underline hover:text-brand-hover-purple dark:hover:text-white transition-colors duration-300 text-sm">Estatuto Social</Link>
              <Link href="#" className="font-inter text-brand-purple dark:text-dark-brand-purple underline hover:text-brand-hover-purple dark:hover:text-white transition-colors duration-300 text-sm">Relatório Anual de Atividades</Link>
              <Link href="#" className="font-inter text-brand-purple dark:text-dark-brand-purple underline hover:text-brand-hover-purple dark:hover:text-white transition-colors duration-300 text-sm">Prestação de Contas</Link>
              {/* Add more links as needed */}
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="py-16 lg:py-20 bg-white dark:bg-dark-bg">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple dark:text-dark-brand-purple text-3xl lg:text-4xl mb-6 text-center">Fortalecendo Nossa Rede</h2>
          <p className="font-inter text-brand-purple/80 dark:text-dark-text text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
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
            <p className="font-inter text-brand-purple/80 dark:text-dark-text mb-4">Quer colaborar com a Floriplanta?</p>
            <Link 
              href="/contato" 
              className="bg-brand-purple dark:bg-dark-brand-purple text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-brand-hover-purple dark:hover:bg-opacity-90 transition-colors duration-300"
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

