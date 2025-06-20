import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Share2, Tag, Calendar, ExternalLink, Home } from 'lucide-react';
import { 
  getTermBySlug, 
  getRelatedTerms, 
  generateTermJsonLd,
  processDefinitionWithLinks,
  type EncyclopediaTerm 
} from '@/app/lib/encyclopedia';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';

interface TermPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const categoryColors = {
  'Saúde': 'bg-brand-green/10 text-brand-green border-brand-green/20',
  'Química': 'bg-blue-100 text-blue-700 border-blue-200',
  'Legislação': 'bg-brand-purple/10 text-brand-purple border-brand-purple/20'
};

const categoryIcons = {
  'Saúde': '🏥',
  'Química': '⚗️',
  'Legislação': '⚖️'
};

// Gerar metadata dinâmica para SEO
export async function generateMetadata({ params }: TermPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const term = await getTermBySlug(resolvedParams.slug);
  
  if (!term) {
    return {
      title: 'Termo não encontrado | Floriplanta',
      description: 'O termo solicitado não foi encontrado na nossa enciclopédia.'
    };
  }

  const description = term.meta_description || 
    `${term.definition.substring(0, 150)}...`;

  return {
    title: `O que é ${term.term}? | Enciclopédia Canábica | Floriplanta`,
    description,
    keywords: `${term.term}, cannabis, ${term.category.toLowerCase()}, cannabinoides, cannabis medicinal, definição ${term.term.toLowerCase()}`,
    openGraph: {
      title: `O que é ${term.term}? - Definição Completa`,
      description,
      type: 'article',
      locale: 'pt_BR',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia/${term.slug}`,
      siteName: 'Floriplanta'
    },
    twitter: {
      card: 'summary_large_image',
      title: `O que é ${term.term}?`,
      description
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
    }
  };
}

// Componente para renderizar definição com links automáticos
function DefinitionWithLinks({ definition, relatedTerms }: { 
  definition: string; 
  relatedTerms: EncyclopediaTerm[] 
}) {
  const processedDefinition = processDefinitionWithLinks(definition, relatedTerms);
  
  // Quebrar o texto em parágrafos
  const paragraphs = processedDefinition.split('\n').filter(p => p.trim().length > 0);
  
  return (
    <div>
      {paragraphs.map((paragraph, index) => {
        // Remover marcação markdown de negrito
        const cleanParagraph = paragraph.replace(/\*\*([^*]+)\*\*/g, '$1');
        
        return (
          <p 
            key={index} 
            className="mb-4 font-inter text-brand-purple/85 text-base lg:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: cleanParagraph }}
          />
        );
      })}
    </div>
  );
}

function RelatedTerms({ relatedTerms }: { relatedTerms: EncyclopediaTerm[] }) {
  if (relatedTerms.length === 0) return null;

  return (
    <div className="bg-brand-light-green/30 rounded-xl p-6">
      <h3 className="font-futuru font-bold text-brand-purple text-xl mb-6 flex items-center">
        <Tag className="h-6 w-6 mr-3 text-brand-green" />
        Termos Relacionados
      </h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {relatedTerms.map((relatedTerm) => (
          <Link
            key={relatedTerm.id}
            href={`/enciclopedia/${relatedTerm.slug}`}
            className="group block p-4 bg-white rounded-xl border border-gray-100 hover:border-brand-green/30 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-futuru font-bold text-brand-purple group-hover:text-brand-hover-purple transition-colors">
                {relatedTerm.term}
              </span>
              <Badge className={`${categoryColors[relatedTerm.category]} text-xs`}>
                {categoryIcons[relatedTerm.category]}
              </Badge>
            </div>
            {relatedTerm.meta_description && (
              <p className="font-inter text-brand-purple/70 text-sm line-clamp-2">
                {relatedTerm.meta_description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ShareButtons({ term }: { term: EncyclopediaTerm }) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/enciclopedia/${term.slug}`;
  const text = `Confira a definição de ${term.term} na Enciclopédia Canábica da Floriplanta`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-inter text-brand-purple/70 text-sm">Compartilhar:</span>
      
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-brand-green/30 text-brand-purple hover:bg-brand-green hover:text-white transition-colors"
      >
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Share2 className="h-4 w-4 mr-1" />
          Twitter
        </a>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-brand-green/30 text-brand-purple hover:bg-brand-green hover:text-white transition-colors"
      >
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Share2 className="h-4 w-4 mr-1" />
          Facebook
        </a>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-brand-green/30 text-brand-purple hover:bg-brand-green hover:text-white transition-colors"
      >
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Share2 className="h-4 w-4 mr-1" />
          WhatsApp
        </a>
      </Button>
    </div>
  );
}

function Breadcrumbs({ term }: { term: EncyclopediaTerm }) {
  return (
    <nav className="font-inter text-sm text-brand-purple/60 mb-6">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-brand-green transition-colors flex items-center">
            <Home className="h-4 w-4 mr-1" />
            Início
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link href="/enciclopedia" className="hover:text-brand-green transition-colors">
            Enciclopédia
          </Link>
        </li>
        <li>/</li>
        <li>
          <Link 
            href={`/enciclopedia?categoria=${encodeURIComponent(term.category)}`}
            className="hover:text-brand-green transition-colors"
          >
            {term.category}
          </Link>
        </li>
        <li>/</li>
        <li className="text-brand-purple font-medium">{term.term}</li>
      </ol>
    </nav>
  );
}

export default async function TermPage({ params }: TermPageProps) {
  const resolvedParams = await params;
  const term = await getTermBySlug(resolvedParams.slug);
  
  if (!term) {
    notFound();
  }

  // Buscar termos relacionados usando o novo método
  const relatedTerms = await getRelatedTerms(term.related_terms || []);
  const jsonLd = generateTermJsonLd(term, relatedTerms);

  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumbs */}
          <Breadcrumbs term={term} />
          
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/enciclopedia"
              className="inline-flex items-center font-inter text-brand-purple hover:text-brand-green transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para a Enciclopédia
            </Link>
          </div>

          {/* Header Content */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="mb-6 lg:mb-0">
                <h1 className="font-futuru font-bold text-brand-purple text-3xl lg:text-4xl mb-4">
                  O que é {term.term}?
                </h1>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className={`${categoryColors[term.category]}`}>
                    {categoryIcons[term.category]} {term.category}
                  </Badge>
                  {/* Mostrar termos relacionados como badges */}
                  {term.related_terms && term.related_terms.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {term.related_terms.slice(0, 3).map((relatedTermName, index) => (
                        <Badge key={index} variant="secondary" className="bg-brand-light-green text-brand-green text-xs">
                          {relatedTermName}
                        </Badge>
                      ))}
                      {term.related_terms.length > 3 && (
                        <Badge variant="secondary" className="bg-brand-light-green text-brand-green text-xs">
                          +{term.related_terms.length - 3} mais
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center font-inter text-sm text-brand-purple/60">
                <Calendar className="h-4 w-4 mr-2" />
                Atualizado em {new Date(term.updated_at).toLocaleDateString('pt-BR')}
              </div>
            </div>
            
            {/* Share Buttons */}
            <ShareButtons term={term} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Definition Content com Links Automáticos */}
            <article className="mb-12">
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <DefinitionWithLinks definition={term.definition} relatedTerms={relatedTerms} />
                </div>
              </div>
            </article>

            {/* Information Box */}
            <div className="bg-brand-green/10 border-l-4 border-brand-green rounded-r-xl p-6 mb-12">
              <div className="flex">
                <BookOpen className="h-6 w-6 text-brand-green mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-futuru font-bold text-brand-purple text-lg mb-3">
                    Informação Importante
                  </h3>
                  <p className="font-inter text-brand-purple/85 leading-relaxed">
                    Este termo faz parte da nossa enciclopédia canábica, focada em cannabis medicinal. 
                    As informações apresentadas são baseadas em literatura científica sobre cannabis
                    e têm caráter educativo. Consulte sempre um profissional de saúde 
                    para orientações específicas sobre tratamentos com cannabis medicinal.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <section className="mb-12">
                <RelatedTerms relatedTerms={relatedTerms} />
              </section>
            )}

            {/* More Resources */}
            <section className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-futuru font-bold text-brand-purple text-xl mb-6">
                Explore mais sobre cannabis medicinal
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/cannabis"
                  className="flex items-center p-4 bg-brand-light-green/30 rounded-xl border border-brand-green/20 hover:border-brand-green/40 hover:shadow-sm transition-all duration-300"
                >
                  <BookOpen className="h-6 w-6 text-brand-green mr-4 flex-shrink-0" />
                  <div>
                    <div className="font-futuru font-bold text-brand-purple mb-1">Centro de Informação</div>
                    <div className="font-inter text-brand-purple/70 text-sm">Aprenda sobre cannabis medicinal</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-brand-purple/40 ml-auto" />
                </Link>
                
                <Link
                  href="/blog"
                  className="flex items-center p-4 bg-brand-light-green/30 rounded-xl border border-brand-green/20 hover:border-brand-green/40 hover:shadow-sm transition-all duration-300"
                >
                  <BookOpen className="h-6 w-6 text-brand-green mr-4 flex-shrink-0" />
                  <div>
                    <div className="font-futuru font-bold text-brand-purple mb-1">Blog</div>
                    <div className="font-inter text-brand-purple/70 text-sm">Artigos e novidades</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-brand-purple/40 ml-auto" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 