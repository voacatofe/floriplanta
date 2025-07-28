import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogPage from '@/app/blog/page';
import { getTagBySlug } from '@/app/lib/blog-data';

interface TagPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

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
  const { slug } = await params;
  const tag = await getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  // TODO: Implementar filtro de posts por tag
  return <BlogPage searchParams={Promise.resolve({})} />;
} 