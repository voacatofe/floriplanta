"use client";

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  // Estado para armazenar o tema atual
  const [darkMode, setDarkMode] = useState(false);

  // Efeito para sincronizar com as preferências do usuário e localStorage
  useEffect(() => {
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Se tem tema salvo, usar ele; senão, usar preferência do sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
    if (darkMode) {
      // Mudar para modo claro
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      // Mudar para modo escuro
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-brand-light-green dark:bg-dark-brand-purple hover:bg-opacity-80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple dark:focus:ring-dark-brand-green"
      aria-label={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
      title={darkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      {darkMode ? (
        <Sun className="h-5 w-5 text-dark-text" />
      ) : (
        <Moon className="h-5 w-5 text-brand-purple" />
      )}
    </button>
  );
} 