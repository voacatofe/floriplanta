import Image from 'next/image';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Associado() {
  return (
    <main className="min-h-screen bg-[#f8f5f0] overflow-x-hidden">
      <Header />
      
      {/* Hero Section com sobreposições tipográficas */}
      <section className="relative py-24 overflow-hidden">
        {/* Formas orgânicas decorativas */}
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-[#d0f288] rounded-full opacity-30 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-[#d0f288] rounded-full opacity-20 -translate-x-1/4 translate-y-1/4"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto relative">
            {/* Título com tipografia estilizada */}
            <div className="mb-20 md:mb-32 relative">
              <h1 className="text-[#9a68c9] font-sans font-bold text-7xl md:text-8xl absolute -top-6 left-0 z-10">
                nós
              </h1>
              <h1 className="text-[#9a68c9] font-sans font-bold text-7xl md:text-8xl absolute top-10 md:top-20 left-24 z-10">
                existimos
              </h1>
              <h1 className="text-[#9a68c9] font-sans font-bold text-7xl md:text-8xl absolute top-30 md:top-40 left-8 z-10">
                por um
              </h1>
              <h1 className="text-[#d0f288] font-serif italic text-7xl md:text-8xl absolute top-50 md:top-60 left-32 z-20">
                propósito
              </h1>
              
              {/* Espaço para o texto tipográfico sobreposto */}
              <div className="h-96 md:h-[30rem]"></div>
            </div>
            
            <div className="flex flex-col items-center relative">
              <div className="w-20 h-20 bg-[#d0f288] rounded-full flex items-center justify-center absolute -top-10 -left-10 md:-left-20">
                <Image src="/Simbolo.svg" alt="Floriplanta Logo" width={40} height={40} />
              </div>
              
              <p className="text-xl text-[#5b3a8c] max-w-2xl text-center font-serif italic leading-relaxed mb-10">
                Faça parte da nossa comunidade e tenha acesso a informações, orientação médica qualificada, suporte jurídico e uma rede de apoio com pessoas que compartilham dos mesmos objetivos.
              </p>
              
              <div className="w-40 h-1 bg-[#9a68c9] mb-12 transform rotate-1"></div>
              
              <Link href="#inscricao" className="bg-[#5b3a8c] text-white px-10 py-4 font-serif italic text-xl inline-block hover:bg-[#9a68c9] transition-all duration-300 relative">
                <span className="relative z-10">Associe-se</span>
                <div className="absolute top-0 right-0 w-full h-full bg-[#d0f288] translate-x-2 translate-y-2 -z-0"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute w-72 h-72 bg-[#d0f288] rounded-full opacity-20 -right-20 top-40"></div>
        <div className="absolute w-40 h-40 bg-[#9a68c9]/20 rounded-full left-10 bottom-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative mb-20">
            <h2 className="text-[#5b3a8c] font-serif italic text-6xl absolute -top-10 left-4">
              benefícios
            </h2>
            <h2 className="text-[#9a68c9] font-sans font-bold text-5xl absolute top-10 left-24">
              dos associados
            </h2>
            
            {/* Espaço para o texto tipográfico sobreposto */}
            <div className="h-28"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 relative">
            <div className="bg-white p-8 border-b-4 border-[#9a68c9] transform transition-all duration-300 hover:-translate-y-2 group">
              <div className="mb-6 flex items-start">
                <div className="w-16 h-16 bg-[#d0f288] rounded-full flex items-center justify-center mr-4 transform group-hover:scale-110 transition-all duration-300">
                  <Image src="/icons/education.svg" alt="Educação" width={32} height={32} />
                </div>
                <h3 className="text-[#5b3a8c] font-serif italic text-2xl">Acesso à Informação</h3>
              </div>
              <p className="text-[#5b3a8c]/80 font-sans ml-20">
                Materiais educativos exclusivos, workshops e eventos sobre cannabis medicinal, pesquisas científicas atualizadas e diretrizes legais.
              </p>
            </div>
            
            <div className="bg-white p-8 border-b-4 border-[#d0f288] transform transition-all duration-300 hover:-translate-y-2 group mt-16 md:mt-32">
              <div className="mb-6 flex items-start">
                <div className="w-16 h-16 bg-[#9a68c9]/30 rounded-full flex items-center justify-center mr-4 transform group-hover:scale-110 transition-all duration-300">
                  <Image src="/icons/medical.svg" alt="Médico" width={32} height={32} />
                </div>
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl">Orientação Médica</h3>
              </div>
              <p className="text-[#5b3a8c]/80 font-serif italic ml-20">
                Acesso a médicos especializados em cannabis medicinal para orientação personalizada sobre tratamentos e dosagens.
              </p>
            </div>
            
            <div className="bg-white p-8 border-b-4 border-[#d0f288] transform transition-all duration-300 hover:-translate-y-2 group">
              <div className="mb-6 flex items-start">
                <div className="w-16 h-16 bg-[#9a68c9]/30 rounded-full flex items-center justify-center mr-4 transform group-hover:scale-110 transition-all duration-300">
                  <Image src="/icons/legal.svg" alt="Jurídico" width={32} height={32} />
                </div>
                <h3 className="text-[#5b3a8c] font-serif italic text-2xl">Suporte Jurídico</h3>
              </div>
              <p className="text-[#5b3a8c]/80 font-sans ml-20">
                Orientação legal para obtenção de habeas corpus preventivo, processos de importação e cultivo legal para fins medicinais.
              </p>
            </div>
            
            <div className="bg-white p-8 border-b-4 border-[#9a68c9] transform transition-all duration-300 hover:-translate-y-2 group mt-16 md:mt-32">
              <div className="mb-6 flex items-start">
                <div className="w-16 h-16 bg-[#d0f288] rounded-full flex items-center justify-center mr-4 transform group-hover:scale-110 transition-all duration-300">
                  <Image src="/icons/community.svg" alt="Comunidade" width={32} height={32} />
                </div>
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl">Comunidade de Apoio</h3>
              </div>
              <p className="text-[#5b3a8c]/80 font-serif italic ml-20">
                Participação em grupos de apoio, fóruns exclusivos para troca de experiências e conexão com pessoas em situações semelhantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como se tornar associado */}
      <section className="py-24 bg-[#d0f288]/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#9a68c9]/20 rounded-full"></div>
        <div className="absolute left-10 bottom-40 w-40 h-40 bg-[#9a68c9]/10 rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative mb-24">
            <h2 className="text-[#9a68c9] font-sans font-bold text-5xl absolute top-0 left-4 md:left-8">
              como
            </h2>
            <h2 className="text-[#9a68c9] font-sans font-bold text-5xl absolute top-12 left-20 md:left-32">
              se tornar
            </h2>
            <h2 className="text-[#5b3a8c] font-serif italic text-5xl absolute top-24 left-10 md:left-20">
              associado
            </h2>
            
            {/* Espaço para o texto tipográfico sobreposto */}
            <div className="h-40"></div>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="flex flex-col md:flex-row items-start mb-16 relative">
              <div className="text-[#5b3a8c] font-serif italic text-8xl absolute -left-12 top-0 opacity-10">1</div>
              <div className="bg-[#5b3a8c] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 md:mb-0 md:mr-8 relative z-10">
                1
              </div>
              <div className="flex-1 bg-white p-8 relative">
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl mb-4">Preencha o formulário de inscrição</h3>
                <p className="text-[#5b3a8c]/80 font-serif italic">
                  Complete nosso formulário com seus dados pessoais e informações sobre sua condição médica ou interesse na cannabis medicinal.
                </p>
                
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[#9a68c9] -z-10 translate-x-2 translate-y-2"></div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start mb-16 relative md:ml-16">
              <div className="text-[#5b3a8c] font-serif italic text-8xl absolute -left-12 top-0 opacity-10">2</div>
              <div className="bg-[#5b3a8c] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 md:mb-0 md:mr-8 relative z-10">
                2
              </div>
              <div className="flex-1 bg-white p-8 relative">
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl mb-4">Avaliação e entrevista</h3>
                <p className="text-[#5b3a8c]/80 font-serif italic">
                  Nossa equipe analisará seu formulário e agendará uma entrevista para conhecer melhor suas necessidades e objetivos.
                </p>
                
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[#d0f288] -z-10 translate-x-2 translate-y-2"></div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start mb-16 relative md:ml-32">
              <div className="text-[#5b3a8c] font-serif italic text-8xl absolute -left-12 top-0 opacity-10">3</div>
              <div className="bg-[#5b3a8c] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 md:mb-0 md:mr-8 relative z-10">
                3
              </div>
              <div className="flex-1 bg-white p-8 relative">
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl mb-4">Contribuição associativa</h3>
                <p className="text-[#5b3a8c]/80 font-serif italic">
                  Após aprovação, você realizará o pagamento da contribuição associativa mensal que permite sustentar nossas atividades e serviços.
                </p>
                
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[#9a68c9] -z-10 translate-x-2 translate-y-2"></div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-start relative md:ml-48">
              <div className="text-[#5b3a8c] font-serif italic text-8xl absolute -left-12 top-0 opacity-10">4</div>
              <div className="bg-[#5b3a8c] text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-6 md:mb-0 md:mr-8 relative z-10">
                4
              </div>
              <div className="flex-1 bg-white p-8 relative">
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl mb-4">Boas-vindas e integração</h3>
                <p className="text-[#5b3a8c]/80 font-serif italic">
                  Você receberá um kit de boas-vindas com material informativo e orientações para acessar todos os benefícios da associação.
                </p>
                
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[#d0f288] -z-10 translate-x-2 translate-y-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de inscrição */}
      <section id="inscricao" className="py-24 relative overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#d0f288] rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-20">
              <h2 className="text-[#9a68c9] font-sans font-bold text-6xl">
                formulário de
              </h2>
              <h2 className="text-[#5b3a8c] font-serif italic text-6xl ml-20 -mt-1">
                inscrição
              </h2>
              <div className="absolute top-0 right-0 md:right-20 w-20 h-20 bg-[#d0f288] rounded-full opacity-40"></div>
            </div>
            
            <div className="bg-white p-8 lg:p-12 relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#5b3a8c] -z-10 translate-x-4 translate-y-4"></div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="nome" className="block text-[#5b3a8c] font-serif italic text-lg mb-2">Nome completo</label>
                  <input 
                    type="text" 
                    id="nome" 
                    className="w-full px-4 py-3 border-2 border-[#9a68c9]/30 focus:border-[#5b3a8c] outline-none transition-all duration-300"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[#5b3a8c] font-sans font-bold text-lg mb-2">E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border-2 border-[#9a68c9]/30 focus:border-[#5b3a8c] outline-none transition-all duration-300"
                    placeholder="seu.email@exemplo.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-[#5b3a8c] font-serif italic text-lg mb-2">Telefone</label>
                  <input 
                    type="tel" 
                    id="telefone" 
                    className="w-full px-4 py-3 border-2 border-[#9a68c9]/30 focus:border-[#5b3a8c] outline-none transition-all duration-300"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cidade" className="block text-[#5b3a8c] font-sans font-bold text-lg mb-2">Cidade/Estado</label>
                  <input 
                    type="text" 
                    id="cidade" 
                    className="w-full px-4 py-3 border-2 border-[#9a68c9]/30 focus:border-[#5b3a8c] outline-none transition-all duration-300"
                    placeholder="Sua cidade e estado"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="interesse" className="block text-[#5b3a8c] font-serif italic text-lg mb-2">Principal interesse na cannabis medicinal</label>
                  <select 
                    id="interesse" 
                    className="w-full px-4 py-3 border-2 border-[#9a68c9]/30 focus:border-[#5b3a8c] outline-none transition-all duration-300"
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="tratamento">Tratamento médico pessoal</option>
                    <option value="familiar">Tratamento para familiar</option>
                    <option value="profissional">Interesse profissional/acadêmico</option>
                    <option value="apoiador">Apoiador da causa</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="mensagem" className="block text-[#5b3a8c] font-sans font-bold text-lg mb-2">Por que deseja se associar?</label>
                  <textarea 
                    id="mensagem" 
                    rows={5} 
                    className="w-full px-4 py-3 border-2 border-[#9a68c9]/30 focus:border-[#5b3a8c] outline-none transition-all duration-300"
                    placeholder="Conte-nos um pouco sobre seus objetivos e expectativas"
                    required
                  ></textarea>
                </div>
                
                <div className="md:col-span-2 flex items-start">
                  <input 
                    type="checkbox" 
                    id="termos" 
                    className="mt-1 mr-3 h-5 w-5"
                    required
                  />
                  <label htmlFor="termos" className="text-[#5b3a8c]/80 font-serif italic">
                    Li e concordo com os <a href="#" className="text-[#5b3a8c] underline">termos e condições</a> e com a <a href="#" className="text-[#5b3a8c] underline">política de privacidade</a> da Floriplanta.
                  </label>
                </div>
                
                <div className="md:col-span-2 text-center mt-8">
                  <button type="submit" className="bg-[#5b3a8c] text-white px-12 py-4 font-serif italic text-xl inline-block hover:bg-[#9a68c9] transition-all duration-300 relative">
                    <span className="relative z-10">Enviar inscrição</span>
                    <div className="absolute top-0 right-0 w-full h-full bg-[#d0f288] translate-x-2 translate-y-2 -z-0"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#d0f288]/20 relative overflow-hidden">
        <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-[#9a68c9]/20 rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-16">
              <h2 className="text-[#5b3a8c] font-serif italic text-6xl ml-4">
                perguntas
              </h2>
              <h2 className="text-[#9a68c9] font-sans font-bold text-5xl ml-16">
                frequentes
              </h2>
              <div className="w-10 h-10 bg-[#d0f288] rounded-full absolute top-0 left-0"></div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white p-8 relative transform transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-[#5b3a8c] font-serif italic text-2xl mb-3">Qual o valor da contribuição associativa?</h3>
                <p className="text-[#5b3a8c]/80 font-sans ml-2">
                  A contribuição mensal varia de acordo com o tipo de associação e serviços incluídos. Após a análise do seu cadastro, apresentaremos as opções disponíveis para seu perfil.
                </p>
                <div className="absolute top-0 left-0 w-2 h-full bg-[#9a68c9]"></div>
              </div>
              
              <div className="bg-white p-8 relative transform transition-all duration-300 hover:-translate-y-1 md:ml-12">
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl mb-3">Preciso ter uma prescrição médica para me associar?</h3>
                <p className="text-[#5b3a8c]/80 font-serif italic ml-2">
                  Não é obrigatório ter uma prescrição para se associar, mas para acesso a determinados serviços e produtos, a prescrição médica pode ser necessária conforme a legislação vigente.
                </p>
                <div className="absolute top-0 left-0 w-2 h-full bg-[#d0f288]"></div>
              </div>
              
              <div className="bg-white p-8 relative transform transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-[#5b3a8c] font-serif italic text-2xl mb-3">A associação fornece medicamentos à base de cannabis?</h3>
                <p className="text-[#5b3a8c]/80 font-sans ml-2">
                  A associação atua principalmente com educação, pesquisa e apoio. Para questões relacionadas a acesso a medicamentos, oferecemos orientação personalizada dentro dos limites legais.
                </p>
                <div className="absolute top-0 left-0 w-2 h-full bg-[#9a68c9]"></div>
              </div>
              
              <div className="bg-white p-8 relative transform transition-all duration-300 hover:-translate-y-1 md:ml-12">
                <h3 className="text-[#5b3a8c] font-sans font-bold text-2xl mb-3">Como funciona a assessoria jurídica?</h3>
                <p className="text-[#5b3a8c]/80 font-serif italic ml-2">
                  Nossa equipe jurídica oferece orientação sobre questões legais relacionadas ao uso medicinal, como obtenção de autorizações, habeas corpus preventivo e processos de importação.
                </p>
                <div className="absolute top-0 left-0 w-2 h-full bg-[#d0f288]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 