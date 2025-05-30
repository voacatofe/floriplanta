import type { Metadata } from 'next';
import './globals.css';
import { futuru, behindTheNineties, inter } from './styles/fonts';
import { Inter, Playfair_Display, DM_Serif_Display, Work_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"

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
      className={`${futuru.variable} ${behindTheNineties.variable} ${inter.variable} ${inter.variable} ${playfair.variable} ${dmSerif.variable} ${workSans.variable} font-inter bg-brand-bege text-brand-texto`}
      suppressHydrationWarning={true}
    >
      <body className="font-futuru">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
} 