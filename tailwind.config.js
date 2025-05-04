/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9a68c9',
          dark: '#5b3a8c',
        },
        secondary: '#d0f288',
        light: '#f8f5f0',
        dark: '#333333',
      },
      fontFamily: {
        futuru: ['var(--font-futuru)'],
        behind: ['var(--font-behind-the-nineties)'],
        sans: ['var(--font-futuru)', 'Montserrat', 'Work Sans', 'sans-serif'],
        serif: ['var(--font-behind-the-nineties)', 'Playfair Display', 'DM Serif Display', 'serif'],
        display: ['DM Serif Display', 'serif'],
        nineties: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'organic-1': '60% 40% 30% 70% / 60% 30% 70% 40%',
        'organic-2': '40% 60% 70% 30% / 30% 40% 70% 60%',
        'organic-3': '70% 30% 50% 50% / 50% 50% 70% 30%',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
}; 