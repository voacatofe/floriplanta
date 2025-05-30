import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedSections from '@/components/sections/FeaturedSections';
import ValuesSection from '@/components/sections/ValuesSection';
import MissionSection from '@/components/sections/MissionSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogHighlightSection from '@/components/sections/BlogHighlightSection';
import CtaNewsletterSection from '@/components/sections/CtaNewsletterSection';

export default function Home() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col">
        <HeroSection />
      </div>

      {/* Introdução à Associação */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-4">Bem-vindo à Floriplanta</h2>
            <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed mb-6">
              Somos uma associação sem fins lucrativos dedicada a transformar vidas através do acesso seguro, consciente e responsável à cannabis medicinal. Nossa missão é construir uma comunidade sólida em Santa Catarina, democratizando o acesso à informação de qualidade e ao tratamento, lutando por políticas públicas mais justas e inclusivas. Acreditamos no poder da união, da educação e da empatia para cultivar saúde e semear esperança.
            </p>
            <Link href="/sobre" className="font-inter font-medium text-brand-purple hover:text-brand-hover-purple underline transition-colors duration-300">
              Saiba mais sobre nossa história e missão
            </Link>
          </div>
        </div>
      </section>

      {/* Seções de Destaque */}
      <FeaturedSections />

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

      {/* Depoimentos */}
      <TestimonialsSection />

      {/* Últimas Notícias do Blog */}
      <BlogHighlightSection />

      {/* Chamada para Ação e Newsletter */}
      <CtaNewsletterSection />

      <Footer />
    </main>
  );
} 