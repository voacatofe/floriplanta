import React from 'react';
import { getPostBySlug, getRelatedPosts } from '@/app/lib/blog-data';
import { getPostComments } from '@/app/lib/blog-comments.server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';
import CommentSection from '@/components/blog/CommentSection';

export const revalidate = 3600;

// Tipos atualizados para Next.js 15
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Post Não Encontrado' };
  }
  return {
    title: `${post.title} | Blog Floriplanta`,
    description: post.excerpt || `Leia o post ${post.title} no blog da Floriplanta.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: post.profiles?.display_name ? [post.profiles.display_name] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || '',
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Buscar posts relacionados
  const relatedPosts = await getRelatedPosts(post.id, post.categories?.[0]?.id);
  
  // Buscar comentários do post
  const comments = await getPostComments(post.id);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Data não disponível';
  
  const primaryCategory = post.categories && post.categories.length > 0 ? post.categories[0] : null;

  // Calcular tempo de leitura
  const wordsPerMinute = 200;
  const wordCount = post.body ? post.body.split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <main className="bg-[#f8f5f0] text-gray-800 min-h-screen flex flex-col">
      {/* Hero Section com imagem grande */}
      <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gray-900">
        {post.cover_image_url ? (
          <>
            <Image
              src={post.cover_image_url}
              alt={`Imagem de capa para ${post.title}`}
              fill
              className="object-cover"
              priority
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple to-brand-green opacity-90"></div>
        )}
        
        {/* Conteúdo sobreposto */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-6 md:pb-10 lg:pb-12">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-white/80 text-xs md:text-sm mb-3 md:mb-4">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                {primaryCategory && (
                  <>
                    <ChevronRight size={14} />
                    <Link href={`/blog/categoria/${primaryCategory.slug}`} className="hover:text-white transition-colors">
                      {primaryCategory.name}
                    </Link>
                  </>
                )}
              </nav>

              {/* Categoria */}
              {primaryCategory && (
                <Link 
                  href={`/blog/categoria/${primaryCategory.slug}`} 
                  className="inline-block bg-brand-green/90 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium hover:bg-brand-green transition-colors mb-3 md:mb-4"
                >
                  {primaryCategory.name}
                </Link>
              )}

              {/* Título */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-futuru font-bold text-white mb-3 md:mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Meta informações */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:gap-x-5 md:gap-x-6 gap-y-1.5 text-white/90 text-xs md:text-sm mb-4 md:mb-5">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Calendar size={14} className="md:w-4 md:h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Clock size={14} className="md:w-4 md:h-4" />
                  <span>{readingTime} min de leitura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Card Flutuante com Glassmorphism */}
      {post.profiles && (
        <div className="container mx-auto px-4 -mt-10 md:-mt-12 lg:-mt-14 relative z-10 mb-6 md:mb-10 lg:mb-12">
          <div className="max-w-4xl mx-auto flex justify-center">
            <div className="bg-white/85 backdrop-blur-md border border-white/30 rounded-xl p-4 md:p-5 shadow-xl max-w-lg w-full">
              <div className="flex items-center gap-3 md:gap-4">
                {post.profiles.avatar_url && (
                  <Image
                    src={post.profiles.avatar_url}
                    alt={post.profiles.display_name || post.profiles.username || 'Avatar'}
                    width={52}
                    height={52}
                    className="rounded-full border-2 md:border-3 border-white shadow-lg w-[52px] h-[52px] md:w-[68px] md:h-[68px]"
                    unoptimized={true}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-futuru font-semibold text-brand-purple">
                    {post.profiles.display_name || post.profiles.username}
                  </h3>
                  {post.profiles.bio && (
                    <p className="text-gray-600 text-xs md:text-sm mt-0.5 line-clamp-1 md:line-clamp-2">{post.profiles.bio}</p>
                  )}
                  <Link 
                    href={`/autores/${post.profiles.username || post.profiles.id}`}
                    className="inline-flex items-center gap-1 text-brand-green hover:text-brand-hover-green text-xs font-medium mt-1 md:mt-1.5 transition-colors"
                  >
                    Ver perfil completo
                    <ArrowRight size={12} className="md:w-3.5 md:h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Layout Principal com Grid de 3 Colunas */}
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 max-w-7xl mx-auto">
          
          {/* Coluna Esquerda - Share Buttons e Índice (Desktop) */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <ShareButtons title={post.title} />
              
              {/* Índice do Artigo */}
              {post.body && (
                <TableOfContents />
              )}
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <article className="lg:col-span-7">
            {/* Excerpt em destaque */}
            {post.excerpt && (
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 font-inter leading-relaxed mb-6 md:mb-10 lg:mb-12">
                {post.excerpt}
              </p>
            )}

            {/* Corpo do artigo */}
            {post.body ? (
              <div className="prose prose-base md:prose-lg lg:prose-xl max-w-none
                           prose-headings:font-futuru 
                           prose-headings:text-brand-purple
                           prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 md:prose-h2:mt-12 prose-h2:mb-4 md:prose-h2:mb-6
                           prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-6 md:prose-h3:mt-8 prose-h3:mb-3 md:prose-h3:mb-4
                           prose-p:font-inter prose-p:text-gray-700 prose-p:leading-relaxed
                           prose-a:text-brand-green hover:prose-a:text-brand-hover-green prose-a:underline-offset-4
                           prose-strong:text-brand-purple prose-strong:font-semibold
                           prose-blockquote:border-l-4 prose-blockquote:border-brand-green 
                           prose-blockquote:bg-brand-light-green/10 prose-blockquote:rounded-r-lg
                           prose-blockquote:pl-4 md:prose-blockquote:pl-6 prose-blockquote:pr-3 md:prose-blockquote:pr-4 
                           prose-blockquote:py-3 md:prose-blockquote:py-4
                           prose-blockquote:text-gray-700 prose-blockquote:not-italic
                           prose-code:text-brand-purple prose-code:bg-brand-light-green/20 
                           prose-code:px-1.5 md:prose-code:px-2 prose-code:py-0.5 md:prose-code:py-1 
                           prose-code:rounded prose-code:text-xs md:prose-code:text-sm
                           prose-pre:bg-gray-900 prose-pre:text-gray-100
                           prose-li:marker:text-brand-green
                           prose-img:rounded-lg md:prose-img:rounded-xl prose-img:shadow-lg
                           prose-ul:font-inter prose-ol:font-inter">
                <ReactMarkdown 
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h2: ({children, ...props}) => {
                      const text = children?.toString() || '';
                      const id = `heading-${text.toLowerCase().replace(/\s+/g, '-')}`;
                      return <h2 id={id} {...props}>{children}</h2>;
                    },
                    h3: ({children, ...props}) => {
                      const text = children?.toString() || '';
                      const id = `heading-${text.toLowerCase().replace(/\s+/g, '-')}`;
                      return <h3 id={id} {...props}>{children}</h3>;
                    }
                  }}
                >
                  {post.body}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="font-inter text-gray-600">Conteúdo do post não disponível.</p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-futuru text-brand-purple text-base md:text-lg font-semibold">Tags:</span>
                  {post.tags.map(tag => (
                    <Link 
                      key={tag.id} 
                      href={`/blog/tag/${tag.slug}`}
                      className="inline-block bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-brand-light-green hover:text-brand-green transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons Mobile */}
            <div className="lg:hidden mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
              <ShareButtons title={post.title} />
            </div>
          </article>

          {/* Coluna Direita - Índice e Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6 md:space-y-8">
              {/* Newsletter CTA com Glassmorphism */}
              <div className="bg-gradient-to-br from-brand-purple/10 to-brand-green/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/50">
                <h3 className="text-lg md:text-xl font-futuru font-semibold text-brand-purple mb-2 md:mb-3">
                  Receba nossas novidades
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                  Cadastre-se para receber conteúdo exclusivo sobre cannabis medicinal.
                </p>
                <button className="w-full bg-brand-green hover:bg-brand-hover-green text-white font-semibold py-2.5 md:py-3 px-4 rounded-lg transition-colors text-sm md:text-base">
                  Inscrever-se
                </button>
              </div>

              {/* Apoie nosso trabalho */}
              <div className="bg-brand-light-green/20 rounded-xl md:rounded-2xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-futuru font-semibold text-brand-purple mb-2 md:mb-3">
                  Apoie a Floriplanta
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                  Ajude-nos a continuar produzindo conteúdo de qualidade sobre cannabis medicinal.
                </p>
                <Link 
                  href="/associar"
                  className="inline-flex items-center gap-1.5 md:gap-2 text-brand-green hover:text-brand-hover-green font-medium transition-colors text-sm md:text-base"
                >
                  Torne-se um associado
                  <ArrowRight size={14} className="md:w-4 md:h-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Posts Relacionados - Bento Grid */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-futuru font-bold text-brand-purple mb-3 md:mb-4">
                Artigos Relacionados
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                Descubra mais conteúdos que podem interessar você
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-[#f8f5f0] rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {relatedPost.cover_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={relatedPost.cover_image_url}
                        alt={relatedPost.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={true}
                      />
                    </div>
                  )}
                  <div className="p-4 md:p-5 lg:p-6">
                    {relatedPost.categories?.[0] && (
                      <span className="inline-block bg-brand-green/10 text-brand-green px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium mb-2 md:mb-3">
                        {relatedPost.categories[0].name}
                      </span>
                    )}
                    <h3 className="text-base md:text-lg font-futuru font-semibold text-brand-purple mb-2 line-clamp-2 group-hover:text-brand-hover-purple transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-3 md:mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(relatedPost.published_at || '').toLocaleDateString('pt-BR')}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="md:w-3.5 md:h-3.5" />
                        {Math.ceil((relatedPost.body?.split(/\s+/).length || 0) / 200)} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 md:mt-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 md:gap-2 bg-brand-purple hover:bg-brand-hover-purple text-white font-semibold py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-colors text-sm md:text-base"
              >
                Ver todos os artigos
                <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Seção de Comentários */}
      <CommentSection postId={post.id} initialComments={comments} />

      <Footer />
    </main>
  );
} 