"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder data - replace with actual blog post data fetching
const recentPosts = [
  {
    id: 1,
    title: "Cannabis Medicinal e Ansiedade: Como o CBD Pode Ajudar?",
    excerpt: "Explore como o Canabidiol (CBD), um composto não psicoativo da cannabis, tem mostrado potencial no manejo dos sintomas de ansiedade...",
    image: "/placeholder-blog-1.jpg", // Replace with actual image path
    link: "/blog/cannabis-ansiedade" // Replace with actual blog post link
  },
  {
    id: 2,
    title: "O que é o Sistema Endocanabinoide e Por Que Ele é Importante?",
    excerpt: "Descubra o sistema endocanabinoide (SEC), uma complexa rede de sinalização celular presente em nosso corpo, e seu papel na regulação de diversas funções...",
    image: "/placeholder-blog-2.jpg", // Replace with actual image path
    link: "/blog/sistema-endocanabinoide" // Replace with actual blog post link
  },
  {
    id: 3,
    title: "Como Obter Autorização da ANVISA para Uso de Cannabis Medicinal",
    excerpt: "Um guia passo a passo atualizado sobre o processo para solicitar a autorização da ANVISA para importação e uso de produtos à base de cannabis...",
    image: "/placeholder-blog-3.jpg", // Replace with actual image path
    link: "/blog/autorizacao-anvisa" // Replace with actual blog post link
  }
];

export default function BlogHighlightSection() {
  // If no posts are available, this component could return null
  if (!recentPosts || recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-4">Fique por Dentro</h2>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg mt-4 max-w-2xl mx-auto">
            Acompanhe as últimas novidades, pesquisas e eventos sobre cannabis medicinal no nosso blog.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {recentPosts.map((post) => (
            <div 
              key={post.id} 
              className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <Link href={post.link} className="block aspect-video relative">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className="transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-futuru font-bold text-brand-purple text-lg mb-2">
                  <Link href={post.link} className="hover:text-brand-hover-purple transition-colors duration-300">
                    {post.title}
                  </Link>
                </h3>
                <p className="font-inter text-brand-purple/80 text-sm leading-relaxed flex-grow mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href={post.link} 
                  className="mt-auto inline-block text-brand-purple font-medium font-inter text-sm hover:text-brand-hover-purple transition-colors duration-300"
                >
                  Leia Mais &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link 
            href="/blog" // Assuming /blog is the main blog page
            className="bg-brand-purple text-white px-6 py-3 rounded-lg font-inter font-medium hover:bg-brand-hover-purple transition-colors duration-300"
          >
            Ver todas as notícias
          </Link>
        </div>
      </div>
    </section>
  );
}

