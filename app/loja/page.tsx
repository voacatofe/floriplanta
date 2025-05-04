import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Loja() {
  return (
    <main className="min-h-screen bg-[#f8f5f0] overflow-x-hidden">
      <Header />
      
      {/* Hero Section com sobreposições tipográficas */}
      <section className="relative py-24 overflow-hidden">
        {/* Formas orgânicas decorativas */}
        <div className="absolute top-0 left-0 w-[60vw] h-[60vw] bg-[#d0f288] rounded-full opacity-30 -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#9a68c9]/20 rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative mb-24">
            <h1 className="text-[#9a68c9] font-sans font-bold text-8xl absolute top-0 left-4">
              alô
            </h1>
            <h1 className="text-[#9a68c9] font-sans font-bold text-7xl absolute top-20 left-20">
              comu-
            </h1>
            <h1 className="text-[#9a68c9] font-sans font-bold text-7xl absolute top-40 left-40">
              nidade!
            </h1>
            <p className="text-[#5b3a8c] font-serif italic text-xl absolute top-64 left-32">
              Bemvindo
            </p>
            
            {/* Espaço para o texto tipográfico sobreposto */}
            <div className="h-80"></div>
          </div>
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-xl text-[#5b3a8c] font-serif italic leading-relaxed mb-8">
              Nossa loja está em construção. Em breve, teremos disponíveis produtos cuidadosamente selecionados para nossos associados.
            </p>
            
            <div className="w-32 h-1 bg-[#9a68c9] mx-auto mb-10"></div>
            
            <div className="w-24 h-24 bg-[#d0f288] rounded-full flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute inset-0 border-2 border-[#9a68c9] rounded-full animate-ping"></div>
              <Image 
                src="/Simbolo.svg"
                alt="Floriplanta Logo"
                width={48}
                height={48}
                className="relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Em breve */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute w-40 h-40 bg-[#d0f288]/50 rounded-full top-20 left-10"></div>
        <div className="absolute w-60 h-60 bg-[#9a68c9]/20 rounded-full -bottom-20 right-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto relative">
            <div className="relative mb-20">
              <h2 className="text-[#5b3a8c] font-serif italic text-7xl absolute top-0 left-0">
                Obje
              </h2>
              <h2 className="text-[#5b3a8c] font-serif italic text-7xl absolute top-16 left-20">
                tivos
              </h2>
              
              {/* Espaço para o texto tipográfico sobreposto */}
              <div className="h-40"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#5b3a8c] text-xl font-sans mb-12 relative">
                  Com uma visão clara de futuro, trabalhamos para desmistificar preconceitos e fomentar um diálogo aberto sobre os benefícios e as potencialidades da cannabis.
                  <span className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#d0f288] rounded-full"></span>
                </p>
                
                <div className="p-8 border-4 border-[#5b3a8c] relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-white -z-10 translate-x-4 translate-y-4"></div>
                  <h3 className="text-[#5b3a8c] font-serif italic text-2xl mb-6">Enquanto isso...</h3>
                  <p className="text-[#5b3a8c]/80 font-sans mb-8">
                    Entre em contato conosco para mais informações sobre o que está por vir ou para deixar seu email e ser notificado quando nossa loja estiver disponível.
                  </p>
                  <Link href="/contato" className="bg-[#5b3a8c] text-white px-8 py-3 font-serif italic text-lg inline-block hover:bg-[#9a68c9] transition-all duration-300 relative">
                    <span className="relative z-10">Entre em contato</span>
                    <div className="absolute top-0 right-0 w-full h-full bg-[#d0f288] translate-x-2 translate-y-2 -z-0"></div>
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute w-full h-full bg-[#9a68c9]/20 rounded-[60%_40%_70%_30%] -z-10 transform -rotate-6 -translate-x-6 translate-y-6"></div>
                <div className="absolute w-full h-full bg-[#d0f288]/30 rounded-[40%_60%_30%_70%] -z-10 transform rotate-6 translate-x-6 -translate-y-6"></div>
                <Image 
                  src="/Familia.png" 
                  alt="Família unida" 
                  width={500} 
                  height={400}
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Notificação e formulário */}
      <section className="py-24 bg-[#d0f288]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#9a68c9]/20 rounded-full translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-16">
              <h2 className="text-[#9a68c9] font-sans font-bold text-5xl">
                valores
              </h2>
              <h2 className="text-[#9a68c9] font-sans font-bold text-5xl ml-16">
                princípios
              </h2>
              <h2 className="text-[#5b3a8c] font-serif italic text-5xl ml-8">
                e crenças
              </h2>
              
              {/* Espaço para o texto tipográfico sobreposto */}
              <div className="h-32"></div>
            </div>
            
            <div className="bg-white p-8 relative mb-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#5b3a8c] -z-10 -translate-x-4 -translate-y-4"></div>
              
              <h3 className="text-[#5b3a8c] font-serif italic text-2xl mb-4">
                Seja notificado!
              </h3>
              <p className="text-[#5b3a8c]/80 font-sans mb-8">
                Deixe seu email para ser um dos primeiros a saber quando nossa loja estiver disponível:
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Seu melhor email" 
                  className="flex-1 px-4 py-3 border-2 border-[#9a68c9]/30 focus:border-[#5b3a8c] outline-none transition-all duration-300"
                />
                <button className="bg-[#5b3a8c] text-white px-6 py-3 font-serif italic inline-block hover:bg-[#9a68c9] transition-all duration-300 relative">
                  <span className="relative z-10">Notifique-me</span>
                  <div className="absolute top-0 right-0 w-full h-full bg-[#d0f288] translate-x-2 translate-y-2 -z-0"></div>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-[#d0f288] rounded-full absolute -top-8 -left-8 flex items-center justify-center">
                <p className="font-sans text-xs text-[#5b3a8c] font-bold text-center">IMPACTO POSITIVO</p>
              </div>
              
              <h3 className="text-[#5b3a8c] font-serif italic text-2xl mb-6">
                O que esperar em breve:
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#9a68c9]/30 rounded-full flex-shrink-0 mr-4"></div>
                  <div>
                    <h4 className="text-[#5b3a8c] font-sans font-bold text-xl">Óleos Medicinais</h4>
                    <p className="text-[#5b3a8c]/80 font-serif italic">
                      Óleos de CBD e full spectrum de diferentes concentrações para tratamentos específicos e necessidades individuais.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start ml-8">
                  <div className="w-12 h-12 bg-[#d0f288] rounded-full flex-shrink-0 mr-4"></div>
                  <div>
                    <h4 className="text-[#5b3a8c] font-serif italic text-xl">Cosméticos Naturais</h4>
                    <p className="text-[#5b3a8c]/80 font-sans">
                      Linha de produtos com canabinoides para cuidados da pele, alívio de dores musculares e relaxamento.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#9a68c9]/30 rounded-full flex-shrink-0 mr-4"></div>
                  <div>
                    <h4 className="text-[#5b3a8c] font-sans font-bold text-xl">Material Educativo</h4>
                    <p className="text-[#5b3a8c]/80 font-serif italic">
                      Livros, guias e materiais informativos sobre cannabis medicinal, cultivo responsável e legislação.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-[#d0f288] rounded-full flex items-center justify-center">
                <p className="font-sans text-xs text-[#5b3a8c] font-bold text-center">QUALIDADE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 