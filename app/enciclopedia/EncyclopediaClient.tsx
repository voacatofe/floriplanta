'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import {
  type EncyclopediaTerm,
  type EncyclopediaCategory,
} from '@/app/lib/encyclopedia';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EncyclopediaClientProps {
  initialTerms: EncyclopediaTerm[];
  totalCount: number;
  categories: { category: EncyclopediaCategory; count: number }[];
  category?: EncyclopediaCategory;
  searchQuery?: string;
  termsPerPage: number;
}

const categoryColors: Record<EncyclopediaCategory, string> = {
  'Saúde': 'bg-brand-green/10 text-brand-green border-brand-green/20',
  'Química': 'bg-blue-100 text-blue-700 border-blue-200',
  'Legislação': 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
};

const categoryIcons: Record<EncyclopediaCategory, string> = {
  'Saúde': '🏥',
  'Química': '⚗️',
  'Legislação': '⚖️',
};

const categoryDescriptions: Record<EncyclopediaCategory, string> = {
  'Saúde': 'Termos médicos e terapêuticos relacionados ao uso da cannabis',
  'Química': 'Compostos químicos, cannabinoides e terpenos da cannabis',
  'Legislação': 'Aspectos legais e regulamentações sobre cannabis no Brasil',
};

function TermCard({ term }: { term: EncyclopediaTerm }) {
  return (
    <Link
      href={`/enciclopedia/${term.slug}`}
      className="group block p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-brand-green/30"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-futuru font-bold text-brand-purple text-xl group-hover:text-brand-hover-purple transition-colors">
          {term.term}
        </h3>
        <Badge className={`${categoryColors[term.category]} text-xs`}>
          {categoryIcons[term.category]} {term.category}
        </Badge>
      </div>

      <p className="font-inter text-brand-purple/80 text-sm leading-relaxed line-clamp-3 mb-4">
        {term.meta_description || term.definition.substring(0, 150)}...
      </p>

      <div className="flex items-center text-brand-green text-sm font-medium group-hover:text-brand-hover-green transition-colors">
        Saiba mais
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function CategoryFilter({
  categories,
  currentCategory,
  onCategoryChange,
}: {
  categories: { category: EncyclopediaCategory; count: number }[];
  currentCategory?: EncyclopediaCategory;
  onCategoryChange: (category?: EncyclopediaCategory) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onCategoryChange(undefined)}
        className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${!currentCategory
          ? 'bg-brand-green text-white shadow-sm'
          : 'bg-white text-brand-purple border border-gray-200 hover:border-brand-green/30 hover:shadow-sm'
          }`}
      >
        Todas ({categories.reduce((total, cat) => total + cat.count, 0)})
      </button>

      {categories.map(({ category, count }) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${currentCategory === category
            ? 'bg-brand-green text-white shadow-sm'
            : 'bg-white text-brand-purple border border-gray-200 hover:border-brand-green/30 hover:shadow-sm'
            }`}
        >
          {categoryIcons[category]} {category} ({count})
        </button>
      ))}
    </div>
  );
}

function SearchBox({
  initialQuery,
  onSearch,
}: {
  initialQuery?: string;
  onSearch: (query: string) => void;
}) {
  const [query, setQuery] = useState(initialQuery || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mb-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-purple/50 h-5 w-5" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar termos canábicos... (ex: CBD, THC, canabidiol, terpenos)"
          className="pl-12 pr-20 py-4 text-lg border-2 border-gray-200 focus:border-brand-green rounded-xl font-inter bg-white"
        />
      </div>
      <Button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-green hover:bg-brand-hover-green text-white px-6 py-2 rounded-lg font-inter font-medium"
      >
        Buscar
      </Button>
    </form>
  );
}

export default function EncyclopediaClient({
  initialTerms,
  totalCount,
  categories,
  category,
  searchQuery,
  termsPerPage,
}: EncyclopediaClientProps) {
  const router = useRouter();

  const [terms, setTerms] = useState<EncyclopediaTerm[]>(initialTerms);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialTerms.length < totalCount);
  const [currentCategory, setCurrentCategory] = useState<EncyclopediaCategory | undefined>(category);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string | undefined>(searchQuery);

  // Função para carregar mais termos
  const loadMoreTerms = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', (currentPage + 1).toString());
      if (currentCategory) params.set('categoria', currentCategory);
      if (currentSearchQuery) params.set('busca', currentSearchQuery);

      const response = await fetch(`/api/encyclopedia/terms?${params.toString()}`);
      const data = await response.json();

      if (data.terms && data.terms.length > 0) {
        setTerms(prev => [...prev, ...data.terms]);
        setCurrentPage(prev => prev + 1);

        // Verificar se há mais páginas
        const totalPages = Math.ceil(data.totalCount / termsPerPage);
        setHasMore(currentPage + 1 < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais termos:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, currentCategory, currentSearchQuery, loading, hasMore, termsPerPage]);

  // Função para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Carregar mais quando estiver a 200px do final
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        void loadMoreTerms();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreTerms]);

  // Função para resetar e buscar novos termos
  const resetAndSearch = useCallback(async (newCategory?: EncyclopediaCategory, newSearchQuery?: string) => {
    setLoading(true);

    // Atualizar URL
    const params = new URLSearchParams();
    if (newCategory) params.set('categoria', newCategory);
    if (newSearchQuery) params.set('busca', newSearchQuery);

    const newUrl = `/enciclopedia${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);

    try {
      const response = await fetch(`/api/encyclopedia/terms?${params.toString()}`);
      const data = await response.json();

      setTerms(data.terms || []);
      setCurrentPage(1);
      setCurrentCategory(newCategory);
      setCurrentSearchQuery(newSearchQuery);

      const totalPages = Math.ceil(data.totalCount / termsPerPage);
      setHasMore(totalPages > 1);
    } catch (error) {
      console.error('Erro ao buscar termos:', error);
    } finally {
      setLoading(false);
    }
  }, [router, termsPerPage]);

  const handleCategoryChange = (newCategory?: EncyclopediaCategory) => {
    void resetAndSearch(newCategory, currentSearchQuery);
  };

  const handleSearch = (query: string) => {
    const searchQuery = query.trim() || undefined;
    void resetAndSearch(currentCategory, searchQuery);
  };

  return (
    <>
      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-10 h-10 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">
            Enciclopédia Canábica
          </h1>
          <p className="font-inter text-brand-purple/85 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            Glossário completo com termos técnicos sobre cannabis medicinal, química canábica e
            legislação brasileira sobre cannabis. Informações científicas e atualizadas para profissionais e
            interessados no universo da cannabis.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-green">{categories.find(c => c.category === 'Saúde')?.count || 0}</div>
              <div className="font-inter text-brand-purple/70 text-sm">Saúde</div>
              <div className="font-inter text-brand-purple/60 text-xs mt-1">{categoryDescriptions['Saúde']}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{categories.find(c => c.category === 'Química')?.count || 0}</div>
              <div className="font-inter text-brand-purple/70 text-sm">Química</div>
              <div className="font-inter text-brand-purple/60 text-xs mt-1">{categoryDescriptions['Química']}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-purple">{categories.find(c => c.category === 'Legislação')?.count || 0}</div>
              <div className="font-inter text-brand-purple/70 text-sm">Legislação</div>
              <div className="font-inter text-brand-purple/60 text-xs mt-1">{categoryDescriptions['Legislação']}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-12">
            <SearchBox initialQuery={currentSearchQuery} onSearch={handleSearch} />
            <CategoryFilter
              categories={categories}
              currentCategory={currentCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Results Header */}
          {currentSearchQuery && (
            <div className="max-w-4xl mx-auto mb-8">
              <p className="font-inter text-brand-purple/80">
                {totalCount} resultado{totalCount !== 1 ? 's' : ''} para "{currentSearchQuery}"
                {currentCategory && ` na categoria ${currentCategory}`}
              </p>
            </div>
          )}

          {/* Terms Grid */}
          {terms.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {terms.map((term: EncyclopediaTerm, index: number) => (
                  <TermCard key={`${term.id}-${index}`} term={term} />
                ))}
              </div>

              {/* Loading indicator */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-green" />
                  <span className="ml-2 font-inter text-brand-purple">Carregando mais termos...</span>
                </div>
              )}

              {/* End of results */}
              {!hasMore && !loading && terms.length > 0 && (
                <div className="text-center py-8">
                  <p className="font-inter text-brand-purple/60">
                    Você visualizou todos os {terms.length} termos disponíveis
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center py-16">
              <BookOpen className="h-24 w-24 text-brand-purple/30 mx-auto mb-6" />
              <h3 className="font-futuru font-bold text-brand-purple text-2xl mb-4">
                Nenhum termo canábico encontrado
              </h3>
              <p className="font-inter text-brand-purple/80 text-lg mb-8">
                Tente ajustar sua busca por termos relacionados à cannabis ou remover filtros
              </p>
              <button
                onClick={() => void resetAndSearch(undefined, undefined)}
                className="inline-flex items-center px-6 py-3 bg-brand-green text-white rounded-xl hover:bg-brand-hover-green transition-colors font-inter font-medium"
              >
                Ver todos os termos canábicos
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
} 