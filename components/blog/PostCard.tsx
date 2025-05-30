import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/app/lib/blog-data';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Data não disponível';

  return (
    <article className="mb-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:shadow-gray-700/25">
      {post.cover_image_url && (
        <Link href={`/blog/${post.slug}`} passHref>
          <Image
            alt={post.title || 'Imagem de capa do post'}
            src={post.cover_image_url}
            width={500} 
            height={300} 
            className="h-56 w-full object-cover"
            unoptimized={true} 
          />
        </Link>
      )}
      <div className="p-4 sm:p-6">
        <Link href={`/blog/${post.slug}`} passHref>
          <h3 className="text-xl font-semibold text-gray-900 hover:text-brand-purple dark:text-white dark:hover:text-brand-light-green">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
          {post.excerpt || 'Leia mais...'}
        </p>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>
            Por: <span className="font-medium text-gray-700 dark:text-gray-200">{post.profiles?.display_name || post.profiles?.username || 'Autor desconhecido'}</span>
          </p>
          <p>Publicado em: {formattedDate}</p>
        </div>

        {(post.categories.length > 0 || post.tags.length > 0) && (
          <div className="mt-3 space-x-2">
            {post.categories.map(category => (
              <Link key={category.id} href={`/blog/categoria/${category.slug}`} passHref>
                <span className="inline-block rounded bg-brand-light-green px-2 py-1 text-xs font-medium text-brand-green hover:bg-brand-green hover:text-white">
                  {category.name}
                </span>
              </Link>
            ))}
            {post.tags.map(tag => (
              <Link key={tag.id} href={`/blog/tag/${tag.slug}`} passHref>
                <span className="inline-block rounded bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200">
                  #{tag.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${post.slug}`}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-green hover:text-brand-hover-green"
        >
          Leia mais
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
} 