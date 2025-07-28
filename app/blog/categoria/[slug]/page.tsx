import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPage from '@/app/blog/page';
import { getCategoryBySlug } from '@/app/lib/blog-data';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    return {
      title: 'Categoria não encontrada | Blog Floriplanta',
    };
  }
  
  return {
    title: `${category.name} | Blog Floriplanta`,
    description: `Posts sobre ${category.name} no blog da Floriplanta`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }
  
  // Reutilizar a página de blog passando o filtro de categoria via searchParams
  return <BlogPage searchParams={Promise.resolve({ categoria: slug })} />;
} 