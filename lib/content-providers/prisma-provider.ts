import { PrismaClient } from '@/lib/generated/prisma';
import {
  ContentProvider,
  UnifiedPost,
  UnifiedCategory,
  UnifiedTag,
  UnifiedAuthor,
} from './types';

const prisma = new PrismaClient();

export class PrismaProvider implements ContentProvider {
  async getPosts(options?: {
    page?: number;
    perPage?: number;
    categorySlug?: string;
    tagSlug?: string;
    searchQuery?: string;
    published?: boolean;
  }) {
    const page = options?.page || 1;
    const perPage = options?.perPage || 10;
    
    const whereClause: any = {};
    
    if (options?.published !== undefined) {
      whereClause.published = options.published;
    }
    
    if (options?.categorySlug) {
      whereClause.categories = {
        some: {
          slug: options.categorySlug,
        },
      };
    }
    
    if (options?.tagSlug) {
      whereClause.tags = {
        some: {
          slug: options.tagSlug,
        },
      };
    }
    
    if (options?.searchQuery) {
      whereClause.OR = [
        {
          title: {
            contains: options.searchQuery,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: options.searchQuery,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        where: whereClause,
        include: {
          author: true,
          categories: true,
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.post.count({ where: whereClause }),
    ]);

    return {
      posts: posts.map(post => this.convertPost(post)),
      totalCount,
    };
  }

  async getPostBySlug(slug: string): Promise<UnifiedPost | null> {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true,
        categories: true,
        tags: true,
      },
    });
    
    return post ? this.convertPost(post) : null;
  }

  async getPostById(id: string): Promise<UnifiedPost | null> {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        categories: true,
        tags: true,
      },
    });
    
    return post ? this.convertPost(post) : null;
  }

  async getCategories(): Promise<UnifiedCategory[]> {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    
    return categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      source: 'prisma' as const,
    }));
  }

  async getCategoryBySlug(slug: string): Promise<UnifiedCategory | null> {
    const category = await prisma.category.findUnique({
      where: { slug },
    });
    
    return category ? {
      id: category.id,
      name: category.name,
      slug: category.slug,
      source: 'prisma',
    } : null;
  }

  async getTags(): Promise<UnifiedTag[]> {
    const tags = await prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
    
    return tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      source: 'prisma' as const,
    }));
  }

  async getTagBySlug(slug: string): Promise<UnifiedTag | null> {
    const tag = await prisma.tag.findUnique({
      where: { slug },
    });
    
    return tag ? {
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      source: 'prisma',
    } : null;
  }

  async getAuthors(): Promise<UnifiedAuthor[]> {
    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' },
    });
    
    return users.map(user => ({
      id: user.id,
      name: user.name || 'Anônimo',
      email: user.email,
      source: 'prisma' as const,
    }));
  }

  async getAuthorById(id: string): Promise<UnifiedAuthor | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    return user ? {
      id: user.id,
      name: user.name || 'Anônimo',
      email: user.email,
      source: 'prisma',
    } : null;
  }

  // Função auxiliar para converter post do Prisma para formato unificado
  private convertPost(post: any): UnifiedPost {
    // Processar conteúdo - pode ser JSON do EditorJS ou texto simples
    let content = '';
    try {
      const parsed = JSON.parse(post.content || '{}');
      // Se for EditorJS, converter para HTML
      if (parsed.blocks) {
        content = this.editorJSToHTML(parsed);
      } else {
        content = post.content || '';
      }
    } catch {
      content = post.content || '';
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content,
      excerpt: post.excerpt || '',
      imageUrl: post.imageUrl || undefined,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author ? {
        id: post.author.id,
        name: post.author.name || 'Anônimo',
        email: post.author.email,
      } : undefined,
      categories: post.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        source: 'prisma' as const,
      })),
      tags: post.tags.map((tag: any) => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        source: 'prisma' as const,
      })),
      source: 'prisma',
      sourceId: post.id,
      rawData: post,
    };
  }

  // Converter EditorJS para HTML básico
  private editorJSToHTML(editorData: any): string {
    if (!editorData.blocks) return '';
    
    return editorData.blocks.map((block: any) => {
      switch (block.type) {
        case 'header':
          return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        case 'paragraph':
          return `<p>${block.data.text}</p>`;
        case 'list':
          const tag = block.data.style === 'ordered' ? 'ol' : 'ul';
          const items = block.data.items.map((item: string) => `<li>${item}</li>`).join('');
          return `<${tag}>${items}</${tag}>`;
        case 'quote':
          return `<blockquote>${block.data.text}<cite>${block.data.caption || ''}</cite></blockquote>`;
        case 'code':
          return `<pre><code>${block.data.code}</code></pre>`;
        case 'image':
          return `<img src="${block.data.file.url}" alt="${block.data.caption || ''}" />`;
        default:
          return '';
      }
    }).join('\n');
  }
}