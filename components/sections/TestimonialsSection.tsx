'use client';

import React from 'react';
import { Star } from 'lucide-react'; // Example icon

// Placeholder data - replace with real testimonials when available
const testimonials = [
  {
    quote: 'Desde que me associei à Floriplanta, minha qualidade de vida melhorou imensamente. O acesso ao óleo e o apoio da equipe foram fundamentais no meu tratamento para dor crônica.',
    name: 'Associado(a) Exemplo',
    location: 'Florianópolis, SC',
  },
  {
    quote: 'Encontrei na Floriplanta a informação e o acolhimento que precisava para entender o tratamento do meu filho com CBD. Sou muito grata por todo o suporte.',
    name: 'Mãe/Pai Exemplo',
    location: 'São José, SC',
  },
  {
    quote: 'Como médico, vejo a importância do trabalho sério da Floriplanta em educar e facilitar o acesso seguro à cannabis medicinal. Recomendo a associação aos meus pacientes.',
    name: 'Dr(a). Exemplo',
    location: 'Palhoça, SC',
  },
];

export default function TestimonialsSection() {
  // If no real testimonials are available, this component could return null 
  // or a message indicating testimonials are coming soon.
  if (!testimonials || testimonials.length === 0) {
    return null; // Or render a placeholder
  }

  return (
    <section className="py-16 lg:py-20 bg-[#f0f9e8]"> {/* Light green background */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-4">Histórias que Inspiram</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg mt-4 max-w-2xl mx-auto">
            Veja como a Floriplanta e a cannabis medicinal têm feito a diferença na vida de nossos associados.
          </p>
        </div>
        {/* Using a simple grid for now, could be a carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-brand-purple/80 italic font-inter text-sm leading-relaxed flex-grow mb-4">
                " {testimonial.quote} "
              </blockquote>
              <footer className="mt-auto">
                <p className="font-futuru font-semibold text-brand-purple">{testimonial.name}</p>
                <p className="font-inter text-xs text-brand-purple/70">{testimonial.location}</p>
              </footer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

