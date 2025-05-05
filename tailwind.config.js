/* Exemplo de conteúdo para tailwind.config.js - substitua pelo conteúdo real se necessário */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand-purple': '#5b3a8c',
        'brand-green': '#86c540',
        'brand-light-green': '#eaf4d8',
        'brand-hover-purple': '#9a68c9',
        'brand-hover-green': '#6a9b33',
        'dark-bg': '#1a1a1a',
        'dark-text': '#e0e0e0',
        'dark-brand-purple': '#8a56c6',
        'dark-brand-green': '#98d455',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
         futuru: ['Futuru', 'sans-serif'],
         behindnineties: ['BehindTheNineties', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

