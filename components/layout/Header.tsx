"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

interface HeaderProps {
  forceBackground?: boolean;
}

export default function Header({ forceBackground = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (forceBackground || offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (forceBackground) {
      setScrolled(true);
    } else {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [forceBackground]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled || forceBackground ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="flex items-center relative">
                {/* Logo Completo - Visível quando não scrollado */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    scrolled ? 'opacity-0 scale-90 pointer-events-none absolute' : 'opacity-100 scale-100'
                  }`}
                >
                  <Image 
                    src="/Logomarca 2.svg"
                    alt="Floriplanta Logo Completo" 
                    width={140} 
                    height={40}
                    className="object-contain"
                    priority
                  />
                </div>
                
                {/* Símbolo - Visível quando scrollado */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none absolute'
                  }`}
                >
                  <Image 
                    src="/Simbolo.svg"
                    alt="Floriplanta Símbolo" 
                    width={36} 
                    height={40}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Menu Flutuante em Pílula - Desktop */}
          <nav className="hidden lg:flex">
            <div className="bg-white/90 backdrop-blur-md rounded-full px-8 py-3 shadow-lg border border-white/20">
              <div className="flex items-center gap-8">
                <Link href="/" 
                  className="font-futuru font-medium text-brand-purple hover:text-brand-hover-purple transition-all duration-200 text-sm relative group">
                  Início
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link href="/sobre" 
                  className="font-futuru font-medium text-brand-purple hover:text-brand-hover-purple transition-all duration-200 text-sm relative group">
                  Sobre
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link href="/cannabis" 
                  className="font-futuru font-medium text-brand-purple hover:text-brand-hover-purple transition-all duration-200 text-sm relative group">
                  Cannabis Medicinal
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link href="/associar" 
                  className="font-futuru font-medium text-brand-purple hover:text-brand-hover-purple transition-all duration-200 text-sm relative group">
                  Associe-se
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link href="/blog" 
                  className="font-futuru font-medium text-brand-purple hover:text-brand-hover-purple transition-all duration-200 text-sm relative group">
                  Blog
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-200"></span>
                </Link>
                <Link href="/contato" 
                  className="font-futuru font-medium text-brand-purple hover:text-brand-hover-purple transition-all duration-200 text-sm relative group">
                  Contato
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-200"></span>
                </Link>
              </div>
            </div>
          </nav>
          
          {/* Botão Área do Associado + Menu Mobile */}
          <div className="flex items-center gap-4">
            <Link href="/associado"
              className="hidden lg:flex items-center gap-2 bg-brand-green hover:bg-brand-hover-green text-white px-6 py-2.5 rounded-full font-futuru font-medium transition-all duration-200 text-sm shadow-lg hover:shadow-xl transform hover:scale-105">
              <User className="w-4 h-4" />
              <span>Área do Associado</span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden flex items-center justify-center p-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/20 hover:bg-white/95 transition-all duration-200" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-brand-purple" />
              ) : (
                <Menu className="w-5 h-5 text-brand-purple" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-0 bg-white/95 backdrop-blur-md z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="p-6 pt-20">
          <nav className="flex flex-col gap-6">
            <Link href="/" 
              className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple transition-colors duration-200 py-3 text-center border-b border-gray-200/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link href="/sobre" 
              className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple transition-colors duration-200 py-3 text-center border-b border-gray-200/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link href="/cannabis" 
              className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple transition-colors duration-200 py-3 text-center border-b border-gray-200/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Cannabis Medicinal
            </Link>
            <Link href="/associar" 
              className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple transition-colors duration-200 py-3 text-center border-b border-gray-200/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Associe-se
            </Link>
            <Link href="/blog" 
              className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple transition-colors duration-200 py-3 text-center border-b border-gray-200/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link href="/contato" 
              className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple transition-colors duration-200 py-3 text-center border-b border-gray-200/50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            
            <div className="flex justify-center mt-8">
              <Link href="/associado"
                className="flex items-center gap-3 bg-brand-green hover:bg-brand-hover-green text-white px-8 py-4 rounded-full font-futuru font-medium transition-all duration-200 shadow-lg transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Área do Associado</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

