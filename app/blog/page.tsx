import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import { Rss, Tag } from 'lucide-react';
import { getPosts, getAllCategories } from '@/app/lib/blog-data';
import InfiniteScrollPosts from '@/components/blog/InfiniteScrollPosts';
import BlogSidebarNewsletterForm from '@/components/blog/BlogSidebarNewsletterForm';
import BlogSearch from '@/components/blog/BlogSearch';

// Placeholder data for blog posts - Replace with actual data fetching later
const featuredPosts = [
  {
    slug: "bem-vindos-ao-blog",
    title: "Bem-vindos ao Blog da Floriplanta!",
    image: "/images/blog/bem-vindos-blog.svg",
    excerpt: "Nosso novo espaço de conhecimento e troca. Aqui você encontra artigos, notícias, pesquisas e histórias sobre o universo da cannabis medicinal...",
    category: "Notícias da Floriplanta",
    date: "05 de Maio, 2025"
  },
  // Add 1 or 2 more featured posts if desired
];



export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    categoria?: string;
    busca?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const categorySlug = resolvedSearchParams.categoria;
  const searchQuery = resolvedSearchParams.busca;

  const { posts, totalCount } = await getPosts({
    page: currentPage,
    categorySlug: categorySlug,
    searchQuery: searchQuery,
    published: true
  });
  
  const allCategories = await getAllCategories();

  return (
    <main className="bg-[#f8f5f0] overflow-x-hidden">
      {/* Page Header */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-b from-white to-brand-light-green/20">
        <div className="container mx-auto px-4 text-center">
          <Rss className="w-10 h-10 text-brand-purple mx-auto mb-4" />
          <h1 className="font-futuru font-bold text-brand-purple text-4xl lg:text-5xl mb-4">Blog Floriplanta</h1>
          <p className="font-inter text-brand-purple/85 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            Informação, Saúde e Comunidade
          </p>
          <p className="font-inter text-brand-purple/80 text-base lg:text-lg leading-relaxed max-w-3xl mx-auto mt-4">
            Bem-vindo(a) ao nosso espaço de conhecimento. Aqui você encontra artigos, notícias, pesquisas e histórias sobre o universo da cannabis medicinal e nossa comunidade.
          </p>
        </div>
      </section>

      {/* Main Blog Content Area */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
          
          {/* Blog Feed */}
          <div className="w-full lg:w-2/3">
            {/* Featured Post(s) - Simple example with one */}
            {featuredPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-6 border-b-2 border-brand-light-green pb-2">Em Destaque</h2>
                {featuredPosts.map((post) => (
                  <article key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                    <div className="md:w-1/2 relative aspect-video md:aspect-auto">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill={true}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="md:w-1/2 p-6 flex flex-col">
                      <span className="text-xs font-medium text-brand-hover-purple mb-1 uppercase tracking-wider">{post.category}</span>
                      <h3 className="font-futuru font-bold text-brand-purple text-xl lg:text-2xl mb-2">
                        <Link href={`/blog/${post.slug}`} className="hover:text-brand-hover-purple transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="font-inter text-brand-purple/80 text-sm leading-relaxed flex-grow mb-3">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-brand-purple/60 mt-auto">
                        <span>{post.date}</span>
                        <Link href={`/blog/${post.slug}`} className="font-medium text-brand-hover-purple hover:underline">Ler Mais &rarr;</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Recent Posts Feed with Infinite Scroll */}
            <div>
              <h2 className="font-futuru font-bold text-brand-purple text-2xl lg:text-3xl mb-6 border-b-2 border-brand-light-green pb-2">Últimas Publicações</h2>
              <InfiniteScrollPosts 
                initialPosts={posts} 
                totalCount={totalCount}
                categorySlug={categorySlug}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 lg:pl-8">
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <BlogSearch />

              {/* Categories */}
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                <h3 className="font-futuru font-bold text-brand-purple mb-3 text-lg flex items-center"><Tag className="w-5 h-5 mr-2"/>Categorias</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/blog" 
                       className={`block py-1 px-2 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${
                        !categorySlug ? 'bg-brand-light-green text-brand-green' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        Todas
                    </Link>
                  </li>
                  {allCategories.map(category => (
                    <li key={category.id}>
                      <Link 
                        href={`/blog?categoria=${category.slug}`}
                        className={`block py-1 px-2 rounded font-inter text-sm text-brand-purple hover:bg-brand-light-green/50 transition-colors duration-200 ${
                          categorySlug === category.slug ? 'bg-brand-light-green text-brand-green' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Signup - ATUALIZADO */}
              <BlogSidebarNewsletterForm />

            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}

