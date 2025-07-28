"use client";

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Buscar todos os h2 e h3 depois que o conteúdo for renderizado
    const collectHeadings = () => {
      const elements = document.querySelectorAll('article h2, article h3');
      const collected: Heading[] = [];
      
      elements.forEach((element) => {
        if (element.id && element.textContent) {
          collected.push({
            id: element.id,
            text: element.textContent,
            level: element.tagName === 'H2' ? 2 : 3
          });
        }
      });
      
      setHeadings(collected);
    };

    // Aguardar um pouco para garantir que o conteúdo foi renderizado
    setTimeout(collectHeadings, 500);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    // Implementar scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0% -70% 0%',
        threshold: 0
      }
    );

    // Observar todos os headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset para o header fixo
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1">
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading.id)}
          className={`
            block w-full text-left py-1.5 px-3 rounded-lg transition-all duration-200 text-sm
            ${heading.level === 3 ? 'ml-4' : ''}
            ${activeId === heading.id 
              ? 'text-brand-green font-medium border-l-2 border-brand-green -ml-px pl-[11px]' 
              : 'text-gray-600 hover:text-brand-green'
            }
          `}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );
}