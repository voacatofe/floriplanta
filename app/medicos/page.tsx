import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Stethoscope, Users, Droplet, BookOpen, Network, ShieldCheck, Handshake, FileText, Send, Mail, Phone, HelpCircle, CheckCircle } from 'lucide-react'; // Icons

const partnershipBenefits = [
  {
    icon: Users,
    title: "Pacientes Informados e Acolhidos",
    text: "Encaminhe seus pacientes para uma associação que oferece suporte, informação e acolhimento, complementando o tratamento prescrito."
  },
  {
    icon: Droplet,
    title: "Acesso a Produtos de Qualidade",
    text: "Tenha a segurança de prescrever produtos com controle de qualidade rastreável, produzidos pela associação e com laudos disponíveis."
  },
  {
    icon: BookOpen,
    title: "Educação Continuada",
    text: "Participe de eventos científicos, webinars, grupos de estudo e tenha acesso a materiais atualizados sobre cannabis medicinal."
  },
  {
    icon: Network,
    title: "Rede de Colaboração",
    text: "Troque experiências com outros profissionais prescritores e parceiros da associação, fortalecendo a prática clínica."
  },
  {
    icon: ShieldCheck,
    title: "Suporte Regulatório",
    text: "Receba orientação sobre as normas da ANVISA, processos de prescrição e documentação necessária para o acesso legal dos pacientes."
  },
  {
    icon: Handshake,
    title: "Contribuição Social",
    text: "Associe sua prática a uma causa importante, ajudando a ampliar o acesso a tratamentos que podem transformar vidas."
  }
];

const prescriptionSteps = [
  { number: 1, title: "Avaliação e Prescrição", text: "Realize a avaliação clínica e emita a prescrição médica conforme as normas da ANVISA, especificando produto, concentração, posologia e CID." },
  { number: 2, title: "Laudo Médico", text: "Elabore um laudo médico detalhado que justifique a indicação terapêutica." },
  { number: 3, title: "Orientação ao Paciente", text: "Oriente o paciente a procurar a Floriplanta para iniciar o processo de associação, informando sobre a necessidade da prescrição e do laudo." },
  { number: 4, title: "Processo de Associação (Paciente)", text: "O paciente realizará o cadastro e envio da documentação diretamente para a associação." },
  { number: 5, title: "Análise e Liberação (Floriplanta)", text: "Nossa equipe analisará a documentação e procederá com a associação e orientações para acesso ao óleo." },
  { number: 6, title: "Comunicação (Opcional)", text: "Disponibilizamos um canal para profissionais tirarem dúvidas sobre o processo ou produtos." }
];

const faqs = [
  {
    question: "Quais produtos a Floriplanta oferece?",
    answer: "Atualmente, produzimos os óleos Terral (CBD Full Spectrum), Swell (THC Full Spectrum) e Maré (Balanceado Full Spectrum), todos com 20mg/mL. Os laudos de análise estão disponíveis para consulta na seção 'Nossos Óleos'."
  },
  {
    question: "A Floriplanta oferece suporte na definição da dosagem?",
    answer: "A definição da dosagem é um ato médico. No entanto, oferecemos materiais de referência e podemos conectar profissionais para troca de experiências, sempre respeitando a autonomia prescritiva."
  },
  {
    question: "Como funciona a comunicação sobre o paciente encaminhado?",
    answer: "A comunicação sobre o paciente é protegida por sigilo. Só compartilhamos informações com o profissional prescritor mediante consentimento explícito do paciente, conforme a LGPD."
  },
  {
    question: "Há algum custo para o profissional se tornar parceiro?",
    answer: "Não há custos para estabelecer uma parceria informal de encaminhamento e colaboração. Para parcerias formais com benefícios adicionais, entre em contato para discutirmos as possibilidades."
  }
];

export default function MedicosPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-hover-purple/10">
        <div className="container mx-auto px-4 text-center">
          <Stethoscope className="w-10 h-10 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Para Profissionais de Saúde</h1>
          <p className="font-inter text-brand-purple/85 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
            Colabore com a Floriplanta: Expandindo o Acesso à Cannabis Medicinal com Segurança e Evidência
          </p>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed max-w-4xl mx-auto">
            Convidamos você a conhecer nosso trabalho e a explorar como podemos colaborar para oferecer tratamentos seguros, eficazes e acessíveis. Acreditamos que a parceria entre associações e profissionais de saúde é essencial para desmistificar o uso terapêutico da cannabis e garantir os melhores resultados.
          </p>
        </div>
      </section>

      {/* Why Collaborate Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Por Que Colaborar com a Floriplanta?</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            Ao se tornar um parceiro da Floriplanta, você e seus pacientes terão acesso a:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <benefit.icon className="w-10 h-10 text-brand-purple mb-4" />
                <h3 className="font-futuru font-semibold text-brand-purple text-xl mb-2">{benefit.title}</h3>
                <p className="font-inter text-brand-purple/80 text-sm leading-relaxed flex-grow">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence-Based Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Cannabis Medicinal Baseada em Evidências</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            Comprometidos com a prática médica responsável, disponibilizamos um acervo de informações técnicas e científicas:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Cards - Link to actual resources */}
            <div className="bg-brand-light-green/20 p-6 rounded-xl border border-brand-light-green">
              <BookOpen className="w-8 h-8 text-brand-purple mb-3" />
              <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2">Biblioteca de Estudos</h3>
              <p className="font-inter text-brand-purple/85 text-sm leading-relaxed mb-3">Acesse compilações de artigos científicos, revisões sistemáticas e ensaios clínicos.</p>
              <Link href="/cannabis/pesquisas" className="font-inter text-brand-hover-purple hover:underline text-sm font-medium">Explorar Pesquisas &rarr;</Link>
            </div>
            <div className="bg-brand-light-green/20 p-6 rounded-xl border border-brand-light-green">
              <FileText className="w-8 h-8 text-brand-purple mb-3" />
              <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2">Guias e Protocolos</h3>
              <p className="font-inter text-brand-purple/85 text-sm leading-relaxed mb-3">Materiais de referência sobre dosagem, titulação, interações e monitoramento.</p>
              <Link href="#" className="font-inter text-brand-hover-purple hover:underline text-sm font-medium">Acessar Guias (em breve) &rarr;</Link>
            </div>
            <div className="bg-brand-light-green/20 p-6 rounded-xl border border-brand-light-green">
              <Droplet className="w-8 h-8 text-brand-purple mb-3" />
              <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-2">Laudos e Certificados</h3>
              <p className="font-inter text-brand-purple/85 text-sm leading-relaxed mb-3">Acesso transparente aos laudos de análise dos óleos Floriplanta.</p>
              <Link href="/oleos" className="font-inter text-brand-hover-purple hover:underline text-sm font-medium">Ver Laudos por Produto &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prescription Guide Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Prescrevendo via Floriplanta</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            Facilitamos o processo para que seus pacientes tenham acesso ao tratamento prescrito:
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            {prescriptionSteps.map((step) => (
              <div key={step.number} className="flex items-start bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 bg-brand-purple text-white rounded-full flex items-center justify-center mr-4 font-futuru font-bold text-lg">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-1">{step.title}</h3>
                  <p className="font-inter text-brand-purple/85 text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
             <p className="text-xs text-brand-purple/60 text-center italic">Canal de dúvidas para profissionais: <a href="mailto:medicos@floriplanta.org.br" className="underline">medicos@floriplanta.org.br</a></p> {/* Example Email */}
          </div>
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="py-16 lg:py-20 bg-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <Handshake className="w-10 h-10 text-brand-light-green mx-auto mb-4" />
          <h2 className="font-futuru font-bold text-3xl lg:text-4xl mb-4">Torne-se um Profissional Parceiro</h2>
          <p className="font-inter text-brand-light-green text-lg mb-8 max-w-3xl mx-auto">
            Se você se identifica com nossos valores e deseja fazer parte da nossa rede de colaboradores, entre em contato. Buscamos profissionais comprometidos com a saúde integrativa e o uso consciente da cannabis medicinal.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 mb-8">
            <a href="mailto:parcerias@floriplanta.org.br" className="inline-flex items-center text-white hover:text-brand-light-green transition-colors">
              <Mail className="w-5 h-5 mr-2" /> parcerias@floriplanta.org.br {/* Example Email */}
            </a>
            <a href="tel:+55XXXXXXXXXX" className="inline-flex items-center text-white hover:text-brand-light-green transition-colors">
              <Phone className="w-5 h-5 mr-2" /> [Telefone para Parcerias]
            </a>
          </div>
          <Link 
            href="#" // Link to a specific contact form for professionals
            className="inline-flex items-center bg-white text-brand-purple px-6 py-3 rounded-lg font-inter font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            <Send className="w-5 h-5 mr-2" />
            Registrar Interesse em Parceria
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-10 text-center flex items-center justify-center"><HelpCircle className="w-8 h-8 mr-3"/>Dúvidas Comuns de Profissionais</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <details>
                  <summary className="font-futuru font-semibold text-brand-purple cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-brand-purple ml-2">+</span>
                  </summary>
                  <p className="font-inter text-brand-purple/85 text-sm leading-relaxed mt-3 pt-3 border-t border-gray-100">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

