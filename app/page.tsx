import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ValuesSection from './components/ValuesSection';
import MissionSection from './components/MissionSection';
import BenefitsSection from './components/BenefitsSection';

export default function Home() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col">
        <HeroSection />
      </div>

      {/* Valores e princípios */}
      <ValuesSection />

      {/* Missão */}
      <MissionSection 
        bgColor="purple"
        title="missão"
        description="Nossa missão é construir uma comunidade sólida para democratizar o acesso à informação e o tratamento com o uso da cannabis medicinal, através de um movimento de desobediência civil e pacífica."
      />

      {/* Benefícios */}
      <BenefitsSection />

      {/* Comunidade */}
      <section className="py-24 relative overflow-hidden">
        {/* Fundo decorativo */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f5f0] via-[#f9f8ff] to-[#f0f9e8] opacity-70"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#d0f288] rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Título "nós existimos por um propósito" */}
            <div className="flex flex-col items-center mb-16">
              <div className="bg-[#d0f288] w-20 h-20 rounded-full flex items-center justify-center mb-8">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <Image src="/Simbolo.svg" alt="Floriplanta Símbolo" width={30} height={30} />
                </div>
              </div>
              
              <h2 className="font-behind italic text-[#5b3a8c] text-5xl md:text-6xl text-center mb-8">
                nós existimos por um
              </h2>
              <h2 className="font-behind italic text-[#9a68c9] text-6xl md:text-7xl text-center">
                propósito
              </h2>
              
              <div className="w-20 h-1 bg-[#d0f288] mt-6 mb-10 rounded-full"></div>
              
              <p className="font-inter text-[#5b3a8c]/80 text-lg text-center max-w-2xl mb-10">
                Juntos, estamos construindo uma comunidade que transforma vidas através do acesso seguro, consciente e responsável à cannabis medicinal.
              </p>
              
              <Link href="/associado" className="bg-[#5b3a8c] text-white px-8 py-3 rounded-xl font-behind italic text-xl inline-block hover:bg-[#9a68c9] transition-all duration-300">
                Faça Parte
              </Link>
            </div>
            
            {/* Elementos de Impacto */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#9a68c9]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-futuru font-bold text-[#5b3a8c]">01</span>
                </div>
                <h3 className="font-behind italic text-[#5b3a8c] text-xl mb-2">Impacto Positivo</h3>
                <p className="font-inter text-sm text-[#5b3a8c]/80">Promovemos mudanças que impactam positivamente a vida das pessoas.</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#d0f288]/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-futuru font-bold text-[#5b3a8c]">02</span>
                </div>
                <h3 className="font-behind italic text-[#5b3a8c] text-xl mb-2">Compromisso Social</h3>
                <p className="font-inter text-sm text-[#5b3a8c]/80">Trabalhamos com responsabilidade e compromisso com o bem-estar social.</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-[#9a68c9]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-futuru font-bold text-[#5b3a8c]">03</span>
                </div>
                <h3 className="font-behind italic text-[#5b3a8c] text-xl mb-2">Equidade e Responsabilidade</h3>
                <p className="font-inter text-sm text-[#5b3a8c]/80">Buscamos garantir equidade no acesso aos benefícios da cannabis medicinal.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 