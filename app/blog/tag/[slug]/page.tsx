import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPage from '@/app/blog/page';
import { createSupabaseServerClient } from '@/app/lib/supabase/server';

interface TagPageProps {
  params: {
    slug: string;
  };
}

// Buscar tag pelo slug
async function getTagBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error || !data) {
    return null;
  }
  
  return data;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = await getTagBySlug(params.slug);
  
  if (!tag) {
    return {
      title: 'Tag não encontrada | Blog Floriplanta',
    };
  }
  
  return {
    title: `Posts sobre ${tag.name} | Blog Floriplanta`,
    description: `Artigos marcados com ${tag.name} no blog da Floriplanta`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = await getTagBySlug(params.slug);
  
  if (!tag) {
    notFound();
  }
  
  // Por enquanto, redirecionar para o blog principal
  // Quando implementarmos o filtro por tag, podemos passar via searchParams
  return <BlogPage searchParams={{}} />;
} 