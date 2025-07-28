import { POSTS_PER_PAGE } from './constants';
import { PrismaClient, Post, Category, Tag, User } from '../../lib/generated/prisma';

// Re-exportar tipos do Prisma para uso em outros arquivos
export type { Category, Tag, Post, User };

// Singleton pattern para PrismaClient
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Tipos com relacionamentos incluídos
export type PostWithRelations = Post & {
  author: { name: string | null } | null;
  categories: Category[];
  tags: Tag[];
};

export type SinglePost = Post & {
  author: User | null;
  categories: Category[];
  tags: Tag[];
};

export async function getPosts(
  options: {
    page?: number;
    categorySlug?: string;
    searchQuery?: string;
    published?: boolean | 'all';
  } = {}
): Promise<{ posts: PostWithRelations[]; totalCount: number }> {
  const { page = 1, categorySlug, searchQuery, published = true } = options;

  const whereClause: {
    published?: boolean;
    categories?: {
      some: {
        slug: string;
      };
    };
    OR?: Array<{
      title?: {
        contains: string;
        mode: 'insensitive';
      };
      content?: {
        contains: string;
        mode: 'insensitive';
      };
    }>;
  } = {};
  if (published !== 'all') {
    whereClause.published = published;
  }
  if (categorySlug) {
    whereClause.categories = {
      some: {
        slug: categorySlug,
      },
    };
  }
  if (searchQuery) {
    whereClause.OR = [
      {
        title: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
      {
        content: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
    ];
  }

  const [posts, totalCount] = await prisma.$transaction([
    prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          select: { name: true },
        },
        categories: true,
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (page - 1) * POSTS_PER_PAGE,
      take: POSTS_PER_PAGE,
    }),
    prisma.post.count({ where: whereClause }),
  ]);

  return { posts, totalCount };
}

export async function getPostBySlug(slug: string): Promise<SinglePost | null> {
  return prisma.post.findUnique({
    where: { slug, published: true },
    include: {
      author: true,
      categories: true,
      tags: true,
    },
  });
}

export async function getAllCategories(): Promise<Category[]> {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getAllTags(): Promise<Tag[]> {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

// Removida a função getCategories, pois era redundante com getAllCategories

export async function getRelatedPosts(currentPostId: string, categoryIds: string[]) {
  return prisma.post.findMany({
    where: {
      id: {
        not: currentPostId,
      },
      published: true,
      categories: {
        some: {
          id: {
            in: categoryIds,
          },
        },
      },
    },
    include: {
      categories: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });
}