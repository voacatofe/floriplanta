import { ContentProvider, ContentConfig } from './types';
import { PrismaProvider } from './prisma-provider';
import { WordPressProvider } from './wordpress-provider';

export * from './types';

// Configuração padrão - pode ser sobrescrita via variáveis de ambiente
const defaultConfig: ContentConfig = {
  provider: process.env.CONTENT_PROVIDER as 'prisma' | 'wordpress' | 'hybrid' || 'prisma',
  wordpress: {
    apiUrl: process.env.WORDPRESS_API_URL || '',
    useGraphQL: process.env.WORDPRESS_USE_GRAPHQL === 'true',
  },
};

// Provider híbrido que pode combinar dados de múltiplas fontes
class HybridProvider implements ContentProvider {
  private prismaProvider: PrismaProvider;
  private wordpressProvider: WordPressProvider | null;

  constructor(config: ContentConfig) {
    this.prismaProvider = new PrismaProvider();
    this.wordpressProvider = config.wordpress?.apiUrl 
      ? new WordPressProvider(config.wordpress.apiUrl, config.wordpress.useGraphQL)
      : null;
  }

  // Implementação básica - pode ser expandida para mesclar dados de ambas as fontes
  async getPosts(options?: any) {
    // Por padrão, usa Prisma, mas pode ser configurado para usar WordPress
    if (process.env.USE_WORDPRESS_FOR_POSTS === 'true' && this.wordpressProvider) {
      return this.wordpressProvider.getPosts(options);
    }
    return this.prismaProvider.getPosts(options);
  }

  async getPostBySlug(slug: string) {
    // Tenta primeiro no Prisma, depois no WordPress
    const prismaPost = await this.prismaProvider.getPostBySlug(slug);
    if (prismaPost) return prismaPost;
    
    if (this.wordpressProvider) {
      return this.wordpressProvider.getPostBySlug(slug);
    }
    
    return null;
  }

  async getPostById(id: string) {
    // Verifica a fonte pelo prefixo do ID
    if (id.startsWith('wp_') && this.wordpressProvider) {
      return this.wordpressProvider.getPostById(id.replace('wp_', ''));
    }
    return this.prismaProvider.getPostById(id);
  }

  async getCategories() {
    // Combina categorias de ambas as fontes
    const prismaCategories = await this.prismaProvider.getCategories();
    
    if (this.wordpressProvider) {
      const wpCategories = await this.wordpressProvider.getCategories();
      return [...prismaCategories, ...wpCategories];
    }
    
    return prismaCategories;
  }

  async getCategoryBySlug(slug: string) {
    const prismaCategory = await this.prismaProvider.getCategoryBySlug(slug);
    if (prismaCategory) return prismaCategory;
    
    if (this.wordpressProvider) {
      return this.wordpressProvider.getCategoryBySlug(slug);
    }
    
    return null;
  }

  async getTags() {
    const prismaTags = await this.prismaProvider.getTags();
    
    if (this.wordpressProvider) {
      const wpTags = await this.wordpressProvider.getTags();
      return [...prismaTags, ...wpTags];
    }
    
    return prismaTags;
  }

  async getTagBySlug(slug: string) {
    const prismaTag = await this.prismaProvider.getTagBySlug(slug);
    if (prismaTag) return prismaTag;
    
    if (this.wordpressProvider) {
      return this.wordpressProvider.getTagBySlug(slug);
    }
    
    return null;
  }

  async getAuthors() {
    // Por padrão, usa apenas Prisma para autores (sistema de auth local)
    return this.prismaProvider.getAuthors();
  }

  async getAuthorById(id: string) {
    return this.prismaProvider.getAuthorById(id);
  }
}

// Factory function para criar o provider apropriado
export function createContentProvider(config: ContentConfig = defaultConfig): ContentProvider {
  switch (config.provider) {
    case 'wordpress':
      if (!config.wordpress?.apiUrl) {
        throw new Error('WordPress API URL é necessária para usar o WordPress provider');
      }
      return new WordPressProvider(config.wordpress.apiUrl, config.wordpress.useGraphQL);
    
    case 'hybrid':
      return new HybridProvider(config);
    
    case 'prisma':
    default:
      return new PrismaProvider();
  }
}

// Singleton para uso global
let contentProvider: ContentProvider | null = null;

export function getContentProvider(): ContentProvider {
  if (!contentProvider) {
    contentProvider = createContentProvider();
  }
  return contentProvider;
}