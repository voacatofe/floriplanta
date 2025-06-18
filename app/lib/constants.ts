// Constantes de configuração do aplicativo

// Blog e paginação
export const POSTS_PER_PAGE = 10;

// Validações
export const MAX_TITLE_LENGTH = 255;
export const MAX_SLUG_LENGTH = 255;
export const MAX_EXCERPT_LENGTH = 500;

// Upload de arquivos
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Cache e revalidação
export const DEFAULT_CACHE_TIME = 3600; // 1 hora

// Comentários
export const MAX_COMMENT_LENGTH = 1000;
export const MAX_AUTHOR_NAME_LENGTH = 100; 