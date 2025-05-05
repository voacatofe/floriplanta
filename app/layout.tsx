import type { Metadata } from 'next';
import './globals.css';
import { futuru, behindTheNineties, inter } from './styles/fonts';

export const metadata: Metadata = {
  title: 'Floriplanta - Associação Cannabis Medicinal',
  description: 'Associação dedicada à educação, pesquisa e acesso à cannabis medicinal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pt-BR" 
      className={`${futuru.variable} ${behindTheNineties.variable} ${inter.variable}`}
      suppressHydrationWarning={true}
    >
      <head>
        {/* Script para prevenir flash de tela branca no modo escuro */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  console.error('Falha ao aplicar tema:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="font-futuru bg-[#f8f5f0] text-[#333333] dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">
        {children}
      </body>
    </html>
  );
} 