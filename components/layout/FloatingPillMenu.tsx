"use client"

import { useState } from "react"
import Link from "next/link"
import Image from 'next/image'
import { Menu, X } from "lucide-react"
import { useScrollPosition } from "@/hooks/useScrollPosition"

export default function FloatingPillMenu() {
  const { isScrolled } = useScrollPosition()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800 ${
          isScrolled ? "px-6 pt-4" : "px-0 pt-0"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div
          className={`flex items-center justify-between backdrop-blur-md transition-all duration-800 ${
            isScrolled
              ? "bg-white/80 border border-brand-purple/20 rounded-full px-6 py-3 mx-auto max-w-4xl shadow-lg shadow-black/5"
              : "bg-transparent border-0 px-8 py-6 mx-0 max-w-none"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
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
                className="text-brand-purple/80 hover:text-brand-purple transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <Link 
              href="/associado"
              className="text-brand-purple/80 hover:text-brand-purple transition-colors duration-300 text-sm font-medium hidden md:block"
            >
              Área de Membros
            </Link>
            <Link 
              href="/associar"
              className="bg-brand-purple text-white px-6 py-2 rounded-full text-xs font-medium hover:bg-brand-hover-purple transition-colors duration-300"
            >
              Torne-se Associado
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-brand-light-green/20 rounded-lg transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div
            className={`mt-2 backdrop-blur-md border border-brand-purple/20 rounded-2xl p-4 mx-6 ${
              isScrolled ? "bg-white/80" : "bg-white/90"
            }`}
          >
            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-brand-purple/80 hover:text-brand-purple hover:bg-brand-light-green/20 rounded-lg transition-all duration-200 text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-brand-purple/20 pt-3 mt-3">
                <Link
                  href="/associado"
                  className="block px-3 py-2 text-brand-purple/80 hover:text-brand-purple hover:bg-brand-light-green/20 rounded-lg transition-all duration-200 text-sm font-medium mb-2"
                >
                  Área de Membros
                </Link>
                <Link
                  href="/associar"
                  className="block px-4 py-2 bg-brand-purple text-white rounded-full hover:bg-brand-hover-purple transition-all duration-200 text-xs font-medium text-center whitespace-nowrap"
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