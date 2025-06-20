"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from 'next/image'
import { Menu, X, User } from "lucide-react"
import { useScrollPosition } from "@/hooks/useScrollPosition"

export default function FloatingPillMenu() {
  const { isScrolled } = useScrollPosition()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fechar menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const menuItems = [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Cannabis Medicinal", href: "/cannabis" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/contato" },
  ]

  return (
    <>
      {/* Navigation Menu */}
      <nav
        ref={menuRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled ? "px-6 pt-4" : "px-0 pt-0"
        }`}
      >
        <div
          className={`flex items-center justify-between backdrop-blur-md transition-all duration-500 ease-in-out ${
            isScrolled
              ? "bg-white/80 border border-brand-purple/20 rounded-full px-6 py-3 mx-auto max-w-4xl shadow-lg shadow-black/5"
              : "bg-transparent border-0 px-8 py-6 mx-0 max-w-none"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Logomarca 2.svg" alt="Floriplanta" width={150} height={50} priority className="h-16 md:h-18 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-brand-purple/80 hover:text-brand-purple transition-all duration-300 ease-in-out text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Ícone de Usuário - Desktop */}
            <Link 
              href="/associado"
              className="hidden md:flex items-center justify-center p-2 text-brand-purple hover:text-brand-hover-purple transition-all duration-300 ease-in-out transform hover:scale-105"
              title="Área de Membros"
            >
              <User className="w-6 h-6 stroke-2" />
            </Link>
            
            <Link 
              href="/associar"
              className="bg-brand-purple text-white px-6 py-2 rounded-full text-xs font-medium hover:bg-brand-hover-purple transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Torne-se Associado
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-brand-light-green/20 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 transition-transform duration-200 ease-in-out" /> : <Menu className="w-4 h-4 transition-transform duration-200 ease-in-out" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`mt-2 backdrop-blur-md border border-brand-purple/20 rounded-2xl p-6 mx-6 mb-4 transition-all duration-300 ease-in-out ${
              isScrolled ? "bg-white/80" : "bg-white/90"
            }`}
          >
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-brand-purple/80 hover:text-brand-purple hover:bg-brand-light-green/20 rounded-lg transition-all duration-300 ease-in-out text-sm font-medium transform hover:scale-105"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-brand-purple/20 pt-3 mt-3">
                <Link
                  href="/associado"
                  className="block px-3 py-2 text-brand-purple/80 hover:text-brand-purple hover:bg-brand-light-green/20 rounded-lg transition-all duration-300 ease-in-out text-sm font-medium mb-3 transform hover:scale-105"
                >
                  Área de Membros
                </Link>
                <Link
                  href="/associar"
                  className="block px-4 py-2 bg-brand-purple text-white rounded-full hover:bg-brand-hover-purple transition-all duration-300 ease-in-out text-xs font-medium text-center whitespace-nowrap transform hover:scale-105"
                >
                  Torne-se Associado
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
} 