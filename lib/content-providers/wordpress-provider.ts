import {
  ContentProvider,
  UnifiedPost,
  UnifiedCategory,
  UnifiedTag,
  UnifiedAuthor,
} from './types';

// Tipos do WordPress REST API
interface WPPost {
  id: number;
  title: { rendered: string };
  slug: string;
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
  status: string;
  date: string;
  modified: string;
  author: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
    author?: Array<{ id: number; name: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
  };
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
}

interface WPTag {
  id: number;
  name: string;
  slug: string;
}

interface WPAuthor {
  id: number;
  name: string;
  email?: string;
  avatar_urls?: { [key: string]: string };
}

export class WordPressProvider implements ContentProvider {
  private apiUrl: string;
  private useGraphQL: boolean;

  constructor(apiUrl: string, useGraphQL = false) {
    this.apiUrl = apiUrl;
    this.useGraphQL = useGraphQL;
  }

  // Função auxiliar para fazer requisições REST
  private async fetchREST(endpoint: string, params?: Record<string, any>) {
    const url = new URL(`${this.apiUrl}/wp-json/wp/v2${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }

    return {
      data: await response.json(),
      headers: {
        total: parseInt(response.headers.get('X-WP-Total') || '0'),
        totalPages: parseInt(response.headers.get('X-WP-TotalPages') || '1'),
      },
    };
  }

  // Converter post do WordPress para formato unificado
  private convertPost(wpPost: WPPost): UnifiedPost {
    const categories: UnifiedCategory[] = [];
    const tags: UnifiedTag[] = [];
    
    // Extrair categorias e tags do _embedded
    if (wpPost._embedded?.['wp:term']) {
      wpPost._embedded['wp:term'].forEach((terms) => {
        terms.forEach((term) => {
          if (term.taxonomy === 'category') {
            categories.push({
              id: term.id.toString(),
              name: term.name,
              slug: term.slug,
              source: 'wordpress',
            });
          } else if (term.taxonomy === 'post_tag') {
            tags.push({
              id: term.id.toString(),
              name: term.name,
              slug: term.slug,
              source: 'wordpress',
            });
          }
        });
      });
    }

    return {
      id: wpPost.id.toString(),
      title: wpPost.title.rendered,
      slug: wpPost.slug,
      content: wpPost.content.rendered,
      excerpt: wpPost.excerpt.rendered,
      imageUrl: wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      published: wpPost.status === 'publish',
      createdAt: new Date(wpPost.date),
      updatedAt: new Date(wpPost.modified),
      author: wpPost._embedded?.author?.[0] ? {
        id: wpPost._embedded.author[0].id.toString(),
        name: wpPost._embedded.author[0].name,
      } : undefined,
      categories,
      tags,
      source: 'wordpress',
      sourceId: wpPost.id,
      rawData: wpPost,
    };
  }

  async getPosts(options?: {
    page?: number;
    perPage?: number;
    categorySlug?: string;
    tagSlug?: string;
    searchQuery?: string;
    published?: boolean;
  }) {
    const params: Record<string, any> = {
      page: options?.page || 1,
      per_page: options?.perPage || 10,
      _embed: true,
    };

    if (options?.searchQuery) {
      params.search = options.searchQuery;
    }

    if (options?.published !== undefined) {
      params.status = options.published ? 'publish' : 'draft';
    }

    // Buscar categoria por slug se necessário
    if (options?.categorySlug) {
      const { data: categories } = await this.fetchREST('/categories', {
        slug: options.categorySlug,
      });
      if (categories.length > 0) {
        params.categories = categories[0].id;
      }
    }

    // Buscar tag por slug se necessário
    if (options?.tagSlug) {
      const { data: tags } = await this.fetchREST('/tags', {
        slug: options.tagSlug,
      });
      if (tags.length > 0) {
        params.tags = tags[0].id;
      }
    }

    const { data, headers } = await this.fetchREST('/posts', params);
    
    return {
      posts: data.map((post: WPPost) => this.convertPost(post)),
      totalCount: headers.total,
    };
  }

  async getPostBySlug(slug: string): Promise<UnifiedPost | null> {
    const { data } = await this.fetchREST('/posts', { slug, _embed: true });
    return data.length > 0 ? this.convertPost(data[0]) : null;
  }

  async getPostById(id: string): Promise<UnifiedPost | null> {
    try {
      const { data } = await this.fetchREST(`/posts/${id}`, { _embed: true });
      return this.convertPost(data);
    } catch {
      return null;
    }
  }

  async getCategories(): Promise<UnifiedCategory[]> {
    const { data } = await this.fetchREST('/categories', { per_page: 100 });
    return data.map((cat: WPCategory) => ({
      id: cat.id.toString(),
      name: cat.name,
      slug: cat.slug,
      source: 'wordpress' as const,
    }));
  }

  async getCategoryBySlug(slug: string): Promise<UnifiedCategory | null> {
    const { data } = await this.fetchREST('/categories', { slug });
    if (data.length === 0) return null;
    
    const cat = data[0];
    return {
      id: cat.id.toString(),
      name: cat.name,
      slug: cat.slug,
      source: 'wordpress',
    };
  }

  async getTags(): Promise<UnifiedTag[]> {
    const { data } = await this.fetchREST('/tags', { per_page: 100 });
    return data.map((tag: WPTag) => ({
      id: tag.id.toString(),
      name: tag.name,
      slug: tag.slug,
      source: 'wordpress' as const,
    }));
  }

  async getTagBySlug(slug: string): Promise<UnifiedTag | null> {
    const { data } = await this.fetchREST('/tags', { slug });
    if (data.length === 0) return null;
    
    const tag = data[0];
    return {
      id: tag.id.toString(),
      name: tag.name,
      slug: tag.slug,
      source: 'wordpress',
    };
  }

  async getAuthors(): Promise<UnifiedAuthor[]> {
    const { data } = await this.fetchREST('/users', { per_page: 100 });
    return data.map((author: WPAuthor) => ({
      id: author.id.toString(),
      name: author.name,
      email: author.email,
      avatar: author.avatar_urls?.['96'],
      source: 'wordpress' as const,
    }));
  }

  async getAuthorById(id: string): Promise<UnifiedAuthor | null> {
    try {
      const { data } = await this.fetchREST(`/users/${id}`);
      return {
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        avatar: data.avatar_urls?.['96'],
        source: 'wordpress',
      };
    } catch {
      return null;
    }
  }
}