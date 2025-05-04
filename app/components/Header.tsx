"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
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
      className={`fixed top-0 w-full z-50 h-[80px] transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
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
                    scrolled ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                  }`}
                >
                  <Image 
                    src="/Logomarca 2.svg"
                    alt="Floriplanta Logo" 
                    width={150} 
                    height={48}
                    className="object-none -ml-4 mx-0"
                    priority
                  />
                </div>
                
                {/* Símbolo - Visível quando scrollado */}
                <div 
                  className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${
                    scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
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
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 xl:gap-x-8">
              <Link href="/" 
                className="font-futuru font-semibold text-[#5b3a8c] hover:text-[#9a68c9] transition-colors text-sm xl:text-base whitespace-nowrap">
                Início
              </Link>
              <Link href="/sobre" 
                className="font-futuru font-semibold text-[#5b3a8c] hover:text-[#9a68c9] transition-colors text-sm xl:text-base whitespace-nowrap">
                Sobre
              </Link>
              <Link href="/cannabis" 
                className="font-futuru font-semibold text-[#5b3a8c] hover:text-[#9a68c9] transition-colors text-sm xl:text-base whitespace-nowrap">
                Cannabis Medicinal
              </Link>
              <Link href="/associar" 
                className="font-futuru font-semibold text-[#5b3a8c] hover:text-[#9a68c9] transition-colors text-sm xl:text-base whitespace-nowrap">
                Associe-se
              </Link>
              <Link href="/contato" 
                className="font-futuru font-semibold text-[#5b3a8c] hover:text-[#9a68c9] transition-colors text-sm xl:text-base whitespace-nowrap">
                Contato
              </Link>
            </div>
          </nav>
          
          {/* Action Buttons - Alinhado à direita */}
          <div className="flex items-center justify-end flex-shrink-0 gap-4">
            <Link href="/loja"
              className="flex items-center justify-center gap-2 px-3 py-2 xl:px-4 xl:py-2.5 bg-[#5b3a8c] text-white rounded-lg font-futuru font-medium hover:bg-[#9a68c9] transition-colors text-xs xl:text-sm whitespace-nowrap">
              <ShoppingBag className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span>Loja</span>
            </Link>
            
            <Link href="/socio"
              className="hidden lg:flex items-center justify-center gap-2 px-3 py-2 xl:px-4 xl:py-2.5 border-2 border-[#5b3a8c] text-[#5b3a8c] rounded-lg font-futuru font-medium hover:bg-[#5b3a8c] hover:text-white transition-colors text-xs xl:text-sm whitespace-nowrap">
              <User className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              <span>Área Sócio</span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden flex items-center justify-center" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#5b3a8c]" />
              ) : (
                <Menu className="w-6 h-6 text-[#5b3a8c]" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white z-40 p-4">
          <nav className="flex flex-col gap-6 pt-6">
            <Link href="/" 
              className="font-futuru text-[#5b3a8c] text-xl hover:text-[#9a68c9] transition-colors flex justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link href="/sobre" 
              className="font-futuru text-[#5b3a8c] text-xl hover:text-[#9a68c9] transition-colors flex justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link href="/cannabis" 
              className="font-futuru text-[#5b3a8c] text-xl hover:text-[#9a68c9] transition-colors flex justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Cannabis Medicinal
            </Link>
            <Link href="/associar" 
              className="font-futuru text-[#5b3a8c] text-xl hover:text-[#9a68c9] transition-colors flex justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Associe-se
            </Link>
            <Link href="/contato" 
              className="font-futuru text-[#5b3a8c] text-xl hover:text-[#9a68c9] transition-colors flex justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            
            <div className="flex justify-center mt-4">
              <Link href="/socio"
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#5b3a8c] text-[#5b3a8c] rounded-lg font-futuru font-medium hover:bg-[#5b3a8c] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Área Sócio</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
} 