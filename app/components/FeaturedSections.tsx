"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Users, Stethoscope, Droplet } from 'lucide-react'; // Example icons, adjust as needed

const sections = [
  {
    title: "Cannabis Medicinal: Entenda",
    text: "Acesse informações confiáveis sobre benefícios, indicações, pesquisas científicas e como iniciar o tratamento com segurança.",
    icon: BookOpen,
    link: "/cannabis",
    buttonText: "Explore o Centro de Informação",
    bgColor: "bg-brand-hover-purple/10",
    iconColor: "text-brand-hover-purple"
  },
  {
    title: "Associe-se à Floriplanta",
    text: "Junte-se à nossa comunidade, tenha acesso a benefícios exclusivos, incluindo nossos óleos, e fortaleça a luta pelo acesso à cannabis medicinal.",
    icon: Users,
    link: "/associar",
    buttonText: "Veja Como se Associar",
    bgColor: "bg-brand-light-green/40",
    iconColor: "text-green-800"
  },
  {
    title: "Médicos e Profissionais de Saúde",
    text: "Encontre recursos científicos, informações sobre prescrição e como colaborar com a Floriplanta para apoiar seus pacientes.",
    icon: Stethoscope,
    link: "/medicos", // Assuming this page will be created
    buttonText: "Acesse a Área Médica",
    bgColor: "bg-brand-hover-purple/10",
    iconColor: "text-brand-hover-purple"
  },
  {
    title: "Conheça Nossos Óleos",
    text: "Produzidos com rigor e qualidade para nossos associados. Veja a composição, laudos e como ter acesso mediante prescrição médica.",
    icon: Droplet,
    link: "/oleos", // Assuming this page will be created
    buttonText: "Saiba Mais Sobre os Óleos",
    bgColor: "bg-brand-light-green/40",
    iconColor: "text-green-800"
  }
];

export default function FeaturedSections() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-4">Explore Nossas Áreas</h2>
          {/* Optional: Add introductory text here if needed */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="flex flex-col bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-12 h-12 ${section.bgColor} rounded-full flex items-center justify-center mb-4`}>
                <section.icon className={`w-6 h-6 ${section.iconColor}`} />
              </div>
              <h3 className="font-futuru font-bold text-brand-purple text-xl mb-3">{section.title}</h3>
              <p className="font-inter text-brand-purple/80 text-sm leading-relaxed flex-grow mb-4">{section.text}</p>
              <Link 
                href={section.link} 
                className="mt-auto inline-block text-center bg-brand-purple text-white px-4 py-2 rounded-lg font-inter text-sm font-medium hover:bg-brand-hover-purple transition-colors duration-300"
              >
                {section.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

