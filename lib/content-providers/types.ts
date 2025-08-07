// Tipos unificados para abstrair diferentes fontes de conteúdo
export interface UnifiedPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    name: string;
    email?: string;
  };
  categories: UnifiedCategory[];
  tags: UnifiedTag[];
  // Metadados específicos da fonte
  source: 'prisma' | 'wordpress';
  sourceId: string | number;
  rawData?: any;
}

export interface UnifiedCategory {
  id: string;
  name: string;
  slug: string;
  source: 'prisma' | 'wordpress';
}

export interface UnifiedTag {
  id: string;
  name: string;
  slug: string;
  source: 'prisma' | 'wordpress';
}

export interface UnifiedAuthor {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  source: 'prisma' | 'wordpress';
}

// Interface para providers de conteúdo
export interface ContentProvider {
  // Posts
  getPosts(options?: {
    page?: number;
    perPage?: number;
    categorySlug?: string;
    tagSlug?: string;
    searchQuery?: string;
    published?: boolean;
  }): Promise<{ posts: UnifiedPost[]; totalCount: number }>;
  
  getPostBySlug(slug: string): Promise<UnifiedPost | null>;
  getPostById(id: string): Promise<UnifiedPost | null>;
  
  // Categorias
  getCategories(): Promise<UnifiedCategory[]>;
  getCategoryBySlug(slug: string): Promise<UnifiedCategory | null>;
  
  // Tags
  getTags(): Promise<UnifiedTag[]>;
  getTagBySlug(slug: string): Promise<UnifiedTag | null>;
  
  // Autores
  getAuthors(): Promise<UnifiedAuthor[]>;
  getAuthorById(id: string): Promise<UnifiedAuthor | null>;
}

// Configuração para escolher o provider
export interface ContentConfig {
  provider: 'prisma' | 'wordpress' | 'hybrid';
  wordpress?: {
    apiUrl: string;
    useGraphQL?: boolean;
  };
}