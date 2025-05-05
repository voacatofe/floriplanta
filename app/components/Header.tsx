"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Aumentar o offset para a transição ocorrer um pouco mais tarde
      if (offset > 80) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 h-[80px] transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white dark:bg-dark-bg shadow-md dark:shadow-[#333]' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo - Largura fixa para evitar movimento do menu */}
          <div className="flex-shrink-0 w-[150px]">
            <Link href="/" className="flex items-center">
              <div className="flex items-center p-0 h-12 w-[150px] relative">
                {/* Logo Completo - Visível quando não scrollado */}
                <div 
                  className={`absolute -top-4 left-0 transition-all duration-300 ease-in-out ${
                    scrolled ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
                  }`}
                >
                  <Image 
                    src="/Logomarca 2.svg"
                    alt="Floriplanta Logo Completo" 
                    width={150} 
                    height={48}
                    className="object-none -ml-4 mx-0"
                    priority
                  />
                </div>
                
                {/* Símbolo - Visível quando scrollado */}
                <div 
                  className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                    scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
                  }`}
                >
                  <Image 
                    src="/Simbolo.svg"
                    alt="Floriplanta Símbolo" 
                    width={40} 
                    height={48}
                    className="object-none mx-0"
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation - Responsivo */}
          <nav className="hidden lg:flex items-center justify-center flex-grow mx-4">
            {/* Ajuste no gap para melhor espaçamento */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 xl:gap-x-10">
              <Link href="/" 
                className="font-futuru font-semibold text-brand-purple hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">
                Início
              </Link>
              <Link href="/sobre" 
                className="font-futuru font-semibold text-brand-purple hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">
                Sobre
              </Link>
              <Link href="/cannabis" 
                className="font-futuru font-semibold text-brand-purple hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">
                Cannabis Medicinal
              </Link>
              <Link href="/associar" 
                className="font-futuru font-semibold text-brand-purple hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">
                Associe-se
              </Link>
              <Link href="/contato" 
                className="font-futuru font-semibold text-brand-purple hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 text-sm xl:text-base whitespace-nowrap">
                Contato
              </Link>
            </div>
          </nav>
          
          {/* Action Buttons - Alinhado à direita */}
          <div className="flex items-center justify-end flex-shrink-0 gap-3 xl:gap-4">
            {/* Toggle Tema */}
            <ThemeToggle />
            
            <Link href="/loja"
              className="flex items-center justify-center gap-2 px-3 py-2 xl:px-4 xl:py-2.5 bg-brand-purple text-white dark:bg-dark-brand-purple rounded-lg font-futuru font-medium hover:bg-brand-hover-purple dark:hover:bg-opacity-80 transition-colors duration-200 text-xs xl:text-sm whitespace-nowrap transform hover:scale-105 active:scale-95">
              <ShoppingBag className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span>Loja</span>
            </Link>
            
            <Link href="/socio"
              className="hidden lg:flex items-center justify-center gap-2 px-3 py-2 xl:px-4 xl:py-2.5 border-2 border-brand-purple text-brand-purple dark:border-dark-brand-purple dark:text-dark-brand-purple rounded-lg font-futuru font-medium hover:bg-brand-purple hover:text-white dark:hover:bg-dark-brand-purple transition-colors duration-200 text-xs xl:text-sm whitespace-nowrap transform hover:scale-105 active:scale-95">
              <User className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span>Área Sócio</span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden flex items-center justify-center p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-brand-purple dark:text-dark-brand-purple" />
              ) : (
                <Menu className="w-6 h-6 text-brand-purple dark:text-dark-brand-purple" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Melhorias de estilo e acessibilidade */}
      <div className={`lg:hidden fixed inset-0 top-[80px] bg-white dark:bg-dark-bg z-40 p-6 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <nav className="flex flex-col gap-6 pt-6">
          <Link href="/" 
            className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 flex justify-center py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Início
          </Link>
          <Link href="/sobre" 
            className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 flex justify-center py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Sobre
          </Link>
          <Link href="/cannabis" 
            className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 flex justify-center py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Cannabis Medicinal
          </Link>
          <Link href="/associar" 
            className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 flex justify-center py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Associe-se
          </Link>
          <Link href="/contato" 
            className="font-futuru text-brand-purple text-xl hover:text-brand-hover-purple dark:text-dark-brand-purple dark:hover:text-white transition-colors duration-200 flex justify-center py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contato
          </Link>
          
          <div className="flex justify-center mt-8">
            <Link href="/socio"
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-purple text-brand-purple dark:border-dark-brand-purple dark:text-dark-brand-purple rounded-lg font-futuru font-medium hover:bg-brand-purple hover:text-white dark:hover:bg-dark-brand-purple transition-colors duration-200 transform hover:scale-105 active:scale-95"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>Área Sócio</span>
            </Link>
          </div>
          
          {/* ThemeToggle no menu mobile */}
          <div className="flex justify-center mt-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

