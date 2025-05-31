import { Metadata } from 'next';
import './globals.css';
import { futuru, behindTheNineties, inter } from './styles/fonts';
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: 'Floriplanta - Associação de Cannabis Medicinal em Santa Catarina',
    template: '%s | Floriplanta',
  },
  description: 'A Floriplanta é uma associação de pacientes de cannabis medicinal em Santa Catarina, dedicada a promover o acesso legal, seguro e informado a tratamentos com cannabis. Oferecemos suporte, educação e advocacy.',
  keywords: ['cannabis medicinal', 'Santa Catarina', 'Floriplanta', 'associação', 'tratamento', 'THC', 'CBD', 'saúde', 'bem-estar'],
  authors: [{ name: 'Floriplanta' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.floriplanta.org.br',
    siteName: 'Floriplanta',
    title: 'Floriplanta - Associação de Cannabis Medicinal em Santa Catarina',
    description: 'Promovendo o acesso legal, seguro e informado a tratamentos com cannabis medicinal em SC.',
    images: [
      {
        url: '/images/og-image-floriplanta.jpg', // Substitua pelo caminho real da sua OG image
        width: 1200,
        height: 630,
        alt: 'Floriplanta Associação de Cannabis Medicinal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floriplanta - Cannabis Medicinal em Santa Catarina',
    description: 'Apoie a causa da cannabis medicinal em Santa Catarina. Junte-se à Floriplanta.',
    images: ['/images/twitter-image-floriplanta.jpg'], // Substitua pelo caminho real da sua Twitter image
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
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
      <body className="font-inter bg-brand-bege text-brand-texto">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
} 