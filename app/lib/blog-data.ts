import { PrismaClient } from '@/lib/generated/prisma';
import { POSTS_PER_PAGE } from './constants';

const prisma = new PrismaClient();

// Mantendo os tipos por enquanto, mas eles serão substituídos pelos tipos gerados pelo Prisma
export type Post = any;
export type SinglePost = any;
export type Category = any;
export type Tag = any;

export async function getPosts(
  options: {
    page?: number;
    categorySlug?: string;
    status?: 'published' | 'draft' | 'archived' | 'all';
  } = {}
): Promise<{ posts: Post[]; totalCount: number }> {
  const { page = 1, categorySlug, status = 'published' } = options;

  const whereClause: any = {};
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