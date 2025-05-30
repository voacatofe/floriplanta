import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPage from '@/app/blog/page';
import { createSupabaseServerClient } from '@/app/lib/supabase/server';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Buscar categoria pelo slug
async function getCategoryBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: 'Categoria não encontrada | Blog Floriplanta',
    };
  }
  
  return {
    title: `${category.name} | Blog Floriplanta`,
    description: category.description || `Posts sobre ${category.name} no blog da Floriplanta`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }
  
  // Reutilizar a página de blog passando o filtro de categoria via searchParams
  return <BlogPage searchParams={{ categoria: params.slug }} />;
} 