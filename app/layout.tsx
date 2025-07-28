import type { Metadata } from 'next';
// import Script from 'next/script'; // Importar o componente Script - Não é necessário para dangerouslySetInnerHTML
// import { Inter, Playfair_Display, Montserrat, Lato } from 'next/font/google'; // Removido pois será do app/styles/fonts.ts
import { inter, futuru, behindTheNineties } from '@/app/styles/fonts'; // Importando as fontes corretas
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import ConditionalMenu from '@/components/layout/ConditionalMenu';
import GTMInitializer from '@/components/GTMInitializer';
import HydrationWarningSupressor from '@/components/HydrationWarningSupressor';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import AuthProvider from './context/AuthProvider'; // Adicionado

// Definições das fontes já estão em app/styles/fonts.ts
// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-inter',
// });

// const playfair = Playfair_Display({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-playfair',
// });

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-montserrat',
// });

// const lato = Lato({
//   subsets: ['latin'],
//   weight: ['300', '400', '700'],
//   display: 'swap',
//   variable: '--font-lato',
// });

export const metadata: Metadata = {
  title: {
    default: 'Floriplanta | Cannabis Medicinal e Bem-Estar',
    template: '%s | Floriplanta',
  },
  description: 'Sua fonte de informação confiável sobre cannabis medicinal. Explore benefícios, pesquisas, legislação e encontre médicos prescritores. Associe-se e faça parte da nossa comunidade.',
  keywords: ['cannabis medicinal', 'CBD', 'THC', 'bem-estar', 'saúde', 'Floriplanta', 'óleos de cannabis', 'médicos prescritores', 'associação cannabis'],
  authors: [{ name: 'Floriplanta', url: 'https://floriplanta.com' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://floriplanta.com',
    siteName: 'Floriplanta',
    title: 'Floriplanta | Cannabis Medicinal e Bem-Estar',
    description: 'Informação confiável sobre cannabis medicinal, médicos, produtos e associação.',
    images: [
      {
        url: 'https://floriplanta.com/og-image.png', // Substituir pelo URL da imagem Open Graph
        width: 1200,
        height: 630,
        alt: 'Floriplanta Cannabis Medicinal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floriplanta | Cannabis Medicinal e Bem-Estar',
    description: 'Informação confiável sobre cannabis medicinal, médicos, produtos e associação.',
    // site: '@floriplanta', // Substituir pelo Twitter handle
    // creator: '@creatorhandle', // Substituir pelo Twitter handle do criador
    images: ['https://floriplanta.com/twitter-image.png'], // Substituir pelo URL da imagem do Twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // icons: { // Adicionar ícones se disponíveis
  //   icon: '/favicon.ico',
  //   apple: '/apple-touch-icon.png',
  // },
  // manifest: '/site.webmanifest', // Adicionar manifesto PWA se disponível
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${futuru.variable} ${behindTheNineties.variable} antialiased bg-brand-bege text-brand-text`}>
        <HydrationWarningSupressor />
        <GTMInitializer />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        {/* Menu condicional - só aparece se não for rota de admin */}
        <ConditionalMenu />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 