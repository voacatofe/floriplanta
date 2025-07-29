'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';
import { PrismaClient } from '@/lib/generated/prisma';
import { type Category, type Tag, getAllCategories, getAllTags } from '@/app/lib/blog-data';
import { MAX_TITLE_LENGTH, MAX_SLUG_LENGTH } from '@/app/lib/constants';

const prisma = new PrismaClient();

export interface PostCreationData {
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  status: 'draft' | 'published';
  category_ids?: string[];
  tag_ids?: string[];
  published_at: string | null;
}

export async function createPostAction(data: PostCreationData) {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session || !session.user) {
    return { error: 'Usuário não autenticado.' };
  }

  // Validações de entrada
  const trimmedTitle = data.title?.trim();
  const trimmedSlug = data.slug?.trim();
  
  if (!trimmedTitle || trimmedTitle.length === 0) {
    return { error: 'Título é obrigatório.' };
  }
  
  if (!trimmedSlug || trimmedSlug.length === 0) {
    return { error: 'Slug é obrigatório.' };
  }
  
  if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    return { error: `Título deve ter no máximo ${MAX_TITLE_LENGTH} caracteres.` };
  }
  
  if (trimmedSlug.length > MAX_SLUG_LENGTH) {
    return { error: `Slug deve ter no máximo ${MAX_SLUG_LENGTH} caracteres.` };
  }
  
  // Validar se o slug contém apenas caracteres permitidos
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(trimmedSlug)) {
    return { error: 'Slug deve conter apenas letras minúsculas, números e hífens.' };
  }
  
  // Verificar se o slug já existe
  try {
    const existingPost = await prisma.post.findUnique({
      where: { slug: trimmedSlug },
      select: { id: true },
    });
    
    if (existingPost) {
      return { error: 'Este slug já está em uso. Escolha outro.' };
    }
  } catch (error) {
    console.error('Erro ao verificar slug existente:', error);
    return { error: 'Erro ao verificar disponibilidade do slug.' };
  }
  
  // Validar status
  if (!['draft', 'published', 'archived'].includes(data.status)) {
    return { error: 'Status inválido.' };
  }

  // Cast session.user to include id property
  const author_id = (session.user as { id: string }).id;

  const { title, slug, body, cover_image_url, status, category_ids, tag_ids } = {
    ...data,
    title: trimmedTitle,
    slug: trimmedSlug,
  };

  try {
    const postData = await prisma.post.create({
      data: {
        title,
        slug,
        content: body || '',
        imageUrl: cover_image_url,
        published: status === 'published',
        authorId: author_id,
        categories: category_ids ? {
          connect: category_ids.map(id => ({ id })),
        } : undefined,
        tags: tag_ids ? {
          connect: tag_ids.map(id => ({ id })),
        } : undefined,
      },
      select: { id: true },
    });

    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { error: null, data: { postId: postData.id } };
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return { error: 'Erro interno do servidor ao criar o post.' };
  } 
}

export async function getCategoriesForAdmin(): Promise<Category[]> {
  try {
    const categories = await getAllCategories();
    return categories;
  } catch (error) {
    console.error('Error fetching categories for admin:', error);
    return []; 
  }
}

export async function getTagsForAdmin(): Promise<Tag[]> {
  try {
    const tags = await getAllTags(); 
    return tags;
  } catch (error) {
    console.error('Error fetching tags for admin:', error);
    return [];
  }
}

export async function deletePostAction(postId: string) {
  // Validações de entrada
  if (!postId || typeof postId !== 'string' || postId.trim() === '') {
    return { error: 'ID do post inválido.' };
  }

  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: 'Usuário não autenticado.' };
  }

  try {
    // Primeiro, buscar o post para verificar se existe e obter o slug
    const postData = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true, slug: true, title: true },
    });

    if (!postData) {
      return { error: 'Post não encontrado.' };
    }

    // Remover o post (Prisma irá lidar com as relações automaticamente devido ao cascade)
    await prisma.post.delete({
      where: { id: postId },
    });

    // Revalidar as páginas relevantes
    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    revalidatePath(`/blog/${postData.slug}`);

    return { error: null, data: { deletedPost: postData } };
  } catch (error) {
    console.error('Erro ao excluir post:', error);
    return { error: 'Erro interno do servidor ao excluir o post.' };
  }
}

export async function getPostForEdit(postId: string) {
  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: 'Usuário não autenticado.' };
  }

  if (!postId || typeof postId !== 'string' || postId.trim() === '') {
    return { error: 'ID do post inválido.' };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: { id: true, name: true },
        },
        categories: true,
        tags: true,
      },
    });

    if (!post) {
      return { error: 'Post não encontrado.' };
    }

    return { error: null, data: post };
  } catch (error) {
    console.error('Erro ao buscar post para edição:', error);
    return { error: 'Erro interno do servidor ao buscar o post.' };
  }
}

export interface PostUpdateData {
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  status: 'draft' | 'published';
  category_ids?: string[];
  tag_ids?: string[];
  published_at: string | null;
}

export async function updatePostAction(postId: string, data: PostUpdateData) {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session || !session.user) {
    return { error: 'Usuário não autenticado.' };
  }

  if (!postId || typeof postId !== 'string' || postId.trim() === '') {
    return { error: 'ID do post inválido.' };
  }

  // Validações de entrada
  const trimmedTitle = data.title?.trim();
  const trimmedSlug = data.slug?.trim();
  
  if (!trimmedTitle || trimmedTitle.length === 0) {
    return { error: 'Título é obrigatório.' };
  }
  
  if (!trimmedSlug || trimmedSlug.length === 0) {
    return { error: 'Slug é obrigatório.' };
  }
  
  if (trimmedTitle.length > MAX_TITLE_LENGTH) {
    return { error: `Título deve ter no máximo ${MAX_TITLE_LENGTH} caracteres.` };
  }
  
  if (trimmedSlug.length > MAX_SLUG_LENGTH) {
    return { error: `Slug deve ter no máximo ${MAX_SLUG_LENGTH} caracteres.` };
  }
  
  // Validar se o slug contém apenas caracteres permitidos
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(trimmedSlug)) {
    return { error: 'Slug deve conter apenas letras minúsculas, números e hífens.' };
  }
  
  // Verificar se o slug já existe (exceto para o post atual)
  try {
    const existingPost = await prisma.post.findUnique({
      where: { slug: trimmedSlug },
      select: { id: true },
    });
    
    if (existingPost && existingPost.id !== postId) {
      return { error: 'Este slug já está em uso. Escolha outro.' };
    }
  } catch (error) {
    console.error('Erro ao verificar slug existente:', error);
    return { error: 'Erro ao verificar disponibilidade do slug.' };
  }
  
  // Validar status
  if (!['draft', 'published', 'archived'].includes(data.status)) {
    return { error: 'Status inválido.' };
  }

  const { title, slug, body, cover_image_url, status, category_ids, tag_ids } = {
    ...data,
    title: trimmedTitle,
    slug: trimmedSlug,
  };

  try {
    // Primeiro, buscar o post atual para obter o slug antigo
    const currentPost = await prisma.post.findUnique({
      where: { id: postId },
      select: { slug: true },
    });

    if (!currentPost) {
      return { error: 'Post não encontrado.' };
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        slug,
        content: body || '',
        imageUrl: cover_image_url,
        published: status === 'published',
        categories: {
          set: [], // Remove todas as categorias
          connect: category_ids ? category_ids.map(id => ({ id })) : [],
        },
        tags: {
          set: [], // Remove todas as tags
          connect: tag_ids ? tag_ids.map(id => ({ id })) : [],
        },
      },
      select: { id: true, slug: true },
    });

    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    revalidatePath(`/blog/${currentPost.slug}`); // Slug antigo
    revalidatePath(`/blog/${updatedPost.slug}`); // Slug novo

    return { error: null, data: { postId: updatedPost.id, slug: updatedPost.slug } };
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return { error: 'Erro interno do servidor ao atualizar o post.' };
  }
}