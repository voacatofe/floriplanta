import type { Metadata } from 'next';
// import Script from 'next/script'; // Importar o componente Script - Não é necessário para dangerouslySetInnerHTML
import { Inter, Playfair_Display, Montserrat, Lato } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
// import { Analytics } from '@vercel/analytics/react';
// import { SpeedInsights } from "@vercel/speed-insights/next"

// Definições das fontes
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  display: 'swap',
  variable: '--font-lato',
});

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
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NT2XKHTD');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${lato.variable} antialiased bg-brand-bege text-brand-text`}>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NT2XKHTD"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Toaster />
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
} 