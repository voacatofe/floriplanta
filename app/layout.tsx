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
    <html lang="pt-BR" className={`${futuru.variable} ${behindTheNineties.variable} ${inter.variable}`}>
      <body className="font-futuru">
        {children}
      </body>
    </html>
  );
} 