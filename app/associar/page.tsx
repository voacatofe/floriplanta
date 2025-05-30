import React from 'react';
import Link from 'next/link';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Users, HeartHandshake, Droplet, BookOpen, Scale, CalendarDays, Handshake, UserCheck, FileText, Mail, Phone, HelpCircle, CheckCircle, Upload, Clock, Send } from 'lucide-react'; // Icons

const benefits = [
  {
    icon: Users, // Changed to represent network
    title: "Rede de Profissionais",
    text: "Conecte-se com médicos prescritores e outros profissionais de saúde parceiros, facilitando o acesso a acompanhamento qualificado."
  },
  {
    icon: Droplet,
    title: "Acesso aos Óleos Floriplanta",
    text: "Possibilidade de obter os óleos produzidos pela associação (Terral, Swell, Maré), mediante prescrição médica e cumprimento dos requisitos."
  },
  {
    icon: HeartHandshake,
    title: "Acolhimento e Suporte",
    text: "Participe de grupos de apoio, troque experiências com outros pacientes e familiares, e receba orientação da nossa equipe."
  },
  {
    icon: BookOpen,
    title: "Informação Qualificada",
    text: "Acesso a palestras, workshops, materiais educativos e conteúdos exclusivos sobre cannabis medicinal, saúde e bem-estar."
  },
  {
    icon: Scale,
    title: "Orientação Jurídica e Social",
    text: "Suporte inicial e direcionamento para questões legais relacionadas ao tratamento e acesso a direitos."
  },
  {
    icon: CalendarDays,
    title: "Participação em Eventos",
    text: "Descontos ou acesso gratuito a eventos, cursos e atividades promovidas pela associação."
  },
  {
    icon: Handshake,
    title: "Fortalecimento da Causa",
    text: "Sua associação contribui diretamente para a manutenção das atividades, defesa dos direitos dos pacientes e luta pela regulamentação justa."
  }
];

const memberTypes = [
  { 
    title: "Paciente", 
    description: "Pessoa com indicação médica para uso de cannabis medicinal, comprovada por prescrição e laudo."
  },
  { 
    title: "Familiar/Responsável Legal", 
    description: "Parente ou responsável legal por um paciente que fará uso da cannabis medicinal."
  },
  { 
    title: "Apoiador/Colaborador", 
    description: "Pessoa física ou jurídica que apoia a causa e deseja contribuir com as atividades da associação."
  }
];

const steps = [
  { icon: Send, title: "Preencha o Formulário", text: "Clique no botão abaixo e preencha o formulário de pré-cadastro com suas informações básicas." },
  { icon: Upload, title: "Envie os Documentos", text: "Após o pré-cadastro, você receberá um e-mail com as instruções para envio seguro dos documentos necessários (veja lista abaixo)." },
  { icon: Clock, title: "Análise", text: "Nossa equipe analisará seu cadastro e documentação." },
  { icon: CheckCircle, title: "Boas-Vindas", text: "Após a aprovação, você receberá seu número de associado e acesso à Área do Sócio." }
];

const faqs = [
  {
    question: "Preciso ser paciente para me associar?",
    answer: "Não necessariamente. Você pode se associar como Apoiador/Colaborador para fortalecer a causa, mesmo sem ser paciente."
  },
  {
    question: "Quanto tempo leva o processo de associação?",
    answer: "Após o envio correto de todos os documentos, a análise leva em média 5 dias úteis."
  },
  {
    question: "A associação garante o recebimento imediato do óleo?",
    answer: "A associação é o primeiro passo. O acesso ao óleo depende da análise da prescrição médica, da disponibilidade do produto e do cumprimento das normas internas. Nossa equipe orientará sobre os prazos e procedimentos após a associação."
  },
  {
    question: "Posso me associar se moro em outra cidade/estado?",
    answer: "Sim, aceitamos associados de todo o Brasil. A logística de envio dos óleos (quando aplicável e aprovado) será combinada individualmente."
  }
];

export default function AssociarPage() {
  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <Header />

      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4 text-center">
          <Users className="w-10 h-10 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Junte-se à Floriplanta</h1>
          <p className="font-inter text-brand-purple/85 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
            Fortaleça a Comunidade, Transforme Vidas
          </p>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
            Fazer parte da Floriplanta é integrar uma comunidade acolhedora que luta pelo direito à saúde através da cannabis medicinal. Ao se associar, você fortalece nossa voz e contribui para que mais pessoas possam se beneficiar.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Por Que se Associar?</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            Ao se tornar um membro da Floriplanta, você tem acesso a uma série de benefícios exclusivos:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
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

      {/* Membership Types Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Quem Pode se Associar?</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            A Floriplanta acolhe diferentes perfis de membros, todos unidos pelo propósito de promover o acesso à saúde:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberTypes.map((type, index) => (
              <div key={index} className="bg-brand-light-green/20 p-6 rounded-xl border border-brand-light-green">
                <h3 className="font-futuru font-bold text-brand-purple text-xl mb-2">{type.title}</h3>
                <p className="font-inter text-brand-purple/85 text-sm leading-relaxed">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center">Como se Associar - Passo a Passo</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center max-w-3xl mx-auto mb-12">
            O processo de associação é simples e pode ser iniciado online:
          </p>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-1">{index + 1}. {step.title}</h3>
                <p className="font-inter text-brand-purple/80 text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="#" // Link to the actual online form
              className="inline-flex items-center bg-brand-purple text-white px-8 py-3 rounded-lg font-inter font-medium hover:bg-brand-hover-purple transition-colors duration-300 text-lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Iniciar Pré-Cadastro Online
            </Link>
            <p className="text-xs text-brand-purple/60 mt-3 italic">*Você será direcionado para nosso formulário seguro.</p>
          </div>
        </div>
      </section>

      {/* Required Documents Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-6 text-center flex items-center justify-center"><FileText className="w-8 h-8 mr-3"/>Documentos Necessários</h2>
            <p className="font-inter text-brand-purple/80 text-base lg:text-lg text-center mb-8">
              Para efetivar sua associação, solicitamos os seguintes documentos (o envio será feito de forma segura após o pré-cadastro):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-3">Para Todos os Associados:</h3>
                <ul className="list-disc list-inside font-inter text-brand-purple/85 text-sm space-y-1">
                  <li>Documento de Identidade com foto (RG ou CNH)</li>
                  <li>CPF</li>
                  <li>Comprovante de Residência recente</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-futuru font-semibold text-brand-purple text-lg mb-3">Para Pacientes (Além dos acima):</h3>
                <ul className="list-disc list-inside font-inter text-brand-purple/85 text-sm space-y-1">
                  <li>Prescrição Médica válida</li>
                  <li>Laudo Médico detalhado</li>
                </ul>
                <h3 className="font-futuru font-semibold text-brand-purple text-lg mt-4 mb-3">Para Familiares/Responsáveis (Além dos básicos):</h3>
                <ul className="list-disc list-inside font-inter text-brand-purple/85 text-sm space-y-1">
                  <li>Documentos do Paciente (Prescrição e Laudo)</li>
                  <li>Documento de vínculo/responsabilidade legal</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-brand-purple/60 mt-4 text-center italic">*Instruções detalhadas e link para upload seguro serão enviados por e-mail após o pré-cadastro.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-[#f8f5f0]">
        <div className="container mx-auto px-4">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-10 text-center flex items-center justify-center"><HelpCircle className="w-8 h-8 mr-3"/>Perguntas Frequentes</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <details>
                  <summary className="font-futuru font-semibold text-brand-purple cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-brand-purple ml-2">+</span> {/* Simple indicator */} 
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

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-futuru font-bold text-3xl lg:text-4xl mb-4">Ainda tem Dúvidas?</h2>
          <p className="font-inter text-brand-light-green text-lg mb-8">
            Se você tiver qualquer outra pergunta sobre o processo de associação, entre em contato conosco.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10">
            <a href="tel:+55XXXXXXXXXX" className="inline-flex items-center text-white hover:text-brand-light-green transition-colors">
              <Phone className="w-5 h-5 mr-2" /> [Número de Telefone/WhatsApp]
            </a>
            <a href="mailto:associacao@floriplanta.org.br" className="inline-flex items-center text-white hover:text-brand-light-green transition-colors">
              <Mail className="w-5 h-5 mr-2" /> associacao@floriplanta.org.br {/* Example Email */}
            </a>
            <Link href="/contato" className="inline-flex items-center text-white hover:text-brand-light-green transition-colors">
              <Send className="w-5 h-5 mr-2" /> Página de Contato Geral
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

