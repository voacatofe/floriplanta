import { getContentProvider } from '@/lib/content-providers';
import Link from 'next/link';
import Image from 'next/image';

export default async function BlogDemoPage() {
  const provider = getContentProvider();
  
  // Buscar posts
  const { posts, totalCount } = await provider.getPosts({
    page: 1,
    perPage: 9,
    published: true,
  });
  
  // Buscar categorias
  const categories = await provider.getCategories();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog Demo - Content Providers</h1>
        <p className="text-gray-600">
          Esta página demonstra o sistema de Content Providers funcionando.
          Atualmente usando: <strong>{process.env.CONTENT_PROVIDER || 'prisma'}</strong>
        </p>
      </div>
      
      {/* Categorias */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categorias</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog-demo/categoria/${category.slug}`}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
            >
              {category.name}
              <span className="text-xs ml-2 opacity-60">({category.source})</span>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Posts */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Posts ({totalCount} total)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {post.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/blog-demo/${post.slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </h3>
                
                {post.excerpt && (
                  <div 
                    className="text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {post.source}
                  </span>
                </div>
                
                {post.categories.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.categories.map((cat) => (
                      <span
                        key={cat.id}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      
      {/* Informações do Sistema */}
      <div className="mt-12 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Informações do Sistema</h3>
        <ul className="text-sm space-y-1">
          <li>Provider: <code>{process.env.CONTENT_PROVIDER || 'prisma'}</code></li>
          {process.env.WORDPRESS_API_URL && (
            <li>WordPress API: <code>{process.env.WORDPRESS_API_URL}</code></li>
          )}
          <li>Total de posts: {totalCount}</li>
          <li>Categorias: {categories.length}</li>
        </ul>
      </div>
    </div>
  );
}