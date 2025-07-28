import { POSTS_PER_PAGE } from './constants';

// Mock prisma client - replace with actual implementation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prisma = {
  post: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findMany: async (_args?: unknown): Promise<PostWithRelations[]> => [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findUnique: async (_args?: unknown): Promise<SinglePost | null> => null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    count: async (_args?: unknown): Promise<number> => 0
  },
  category: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findMany: async (_args?: unknown): Promise<Category[]> => []
  },
  tag: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findMany: async (_args?: unknown): Promise<Tag[]> => []
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  $transaction: async (_queries: unknown[]): Promise<[PostWithRelations[], number]> => {
    // Mock implementation that returns the expected types
    return [[], 0];
  }
};

// Tipos baseados no schema Prisma
export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  imageUrl: string | null;
  published: boolean;
  status: 'published' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
}

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
    status?: 'published' | 'draft' | 'archived' | 'all';
  } = {}
): Promise<{ posts: PostWithRelations[]; totalCount: number }> {
  const { page = 1, categorySlug, searchQuery, status = 'published' } = options;

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
  if (status !== 'all') {
    whereClause.published = status === 'published';
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