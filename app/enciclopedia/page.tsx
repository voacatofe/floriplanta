import { Metadata } from 'next';
import { 
  getAllTerms, 
  generateEncyclopediaJsonLd,
  type EncyclopediaCategory 
} from '@/app/lib/encyclopedia';
import Footer from '@/components/layout/Footer';
import EncyclopediaClient from './EncyclopediaClient';

export const metadata: Metadata = {
  title: 'Enciclopédia Canábica | Floriplanta',
  description: 'Glossário completo de termos sobre Saúde , química e legislação brasileira sobre cannabis. Descubra definições científicas e informações atualizadas sobre cannabinoides, terpenos e muito mais.',
  keywords: 'enciclopédia cannabis, glossário cannabis, CBD, THC, canabinoides, terpenos, legislação cannabis, cannabis medicinal Brasil',
  openGraph: {
    title: 'Enciclopédia Canábica - Glossário Completo | Floriplanta',
    description: 'Enciclopédia completa sobre cannabis medicinal com mais de 50 termos técnicos explicados de forma clara e científica.',
    type: 'website',
    locale: 'pt_BR'
  }
};

interface EncyclopediaPageProps {
  searchParams: Promise<{
    categoria?: EncyclopediaCategory;
    busca?: string;
  }>;
}

const TERMS_PER_PAGE = 20;

export default async function EncyclopediaPage({ searchParams }: EncyclopediaPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.categoria;
  const searchQuery = resolvedSearchParams.busca;

  // Carregar dados iniciais
  const { terms: initialTerms, totalCount, categories } = await getAllTerms(
    1, // Sempre começar da primeira página
    TERMS_PER_PAGE,
    category,
    searchQuery
  );

  // Gerar JSON-LD para SEO
  const jsonLd = generateEncyclopediaJsonLd(totalCount, categories);

  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <EncyclopediaClient 
        initialTerms={initialTerms}
        totalCount={totalCount}
        categories={categories}
        category={category}
        searchQuery={searchQuery}
        termsPerPage={TERMS_PER_PAGE}
      />

      <Footer />
    </main>
  );
} 