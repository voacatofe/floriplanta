'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';
import { PrismaClient } from '@/lib/generated/prisma';
import { type Category, type Tag, getAllCategories, getAllTags } from "@/app/lib/blog-data";
import { MAX_TITLE_LENGTH, MAX_SLUG_LENGTH } from "@/app/lib/constants";

const prisma = new PrismaClient();

export interface PostCreationData {
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  status: "draft" | "published";
  category_ids?: number[];
  tag_ids?: number[];
  published_at: string | null;
}

export async function createPostAction(data: PostCreationData) {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session || !session.user) {
    return { error: "Usuário não autenticado." };
  }

  // Validações de entrada
  const trimmedTitle = data.title?.trim();
  const trimmedSlug = data.slug?.trim();
  
  if (!trimmedTitle || trimmedTitle.length === 0) {
    return { error: "Título é obrigatório." };
  }
  
  if (!trimmedSlug || trimmedSlug.length === 0) {
    return { error: "Slug é obrigatório." };
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
    return { error: "Slug deve conter apenas letras minúsculas, números e hífens." };
  }
  
  // Verificar se o slug já existe
  try {
    const existingPost = await prisma.post.findUnique({
      where: { slug: trimmedSlug },
      select: { id: true }
    });
    
    if (existingPost) {
      return { error: "Este slug já está em uso. Escolha outro." };
    }
  } catch (error) {
    console.error("Erro ao verificar slug existente:", error);
    return { error: "Erro ao verificar disponibilidade do slug." };
  }
  
  // Validar status
  if (!['draft', 'published', 'archived'].includes(data.status)) {
    return { error: "Status inválido." };
  }

  // Cast session.user to include id property
  const author_id = (session.user as { id: string }).id;

  const { title, slug, body, cover_image_url, status, category_ids, tag_ids } = {
    ...data,
    title: trimmedTitle,
    slug: trimmedSlug
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
          connect: category_ids.map(id => ({ id: id.toString() }))
        } : undefined,
        tags: tag_ids ? {
          connect: tag_ids.map(id => ({ id: id.toString() }))
        } : undefined
      },
      select: { id: true }
    });

    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return { error: null, data: { postId: postData.id } };
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return { error: "Erro interno do servidor ao criar o post." };
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

export async function deletePostAction(postId: number) {
  // Validações de entrada
  if (!postId || !Number.isInteger(postId) || postId <= 0) {
    return { error: "ID do post inválido." };
  }

  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: "Usuário não autenticado." };
  }

  try {
    // Primeiro, buscar o post para verificar se existe e obter o slug
    const postData = await prisma.post.findUnique({
      where: { id: postId.toString() },
      select: { id: true, slug: true, title: true }
    });

    if (!postData) {
      return { error: "Post não encontrado." };
    }

    // Remover o post (Prisma irá lidar com as relações automaticamente devido ao cascade)
    await prisma.post.delete({
      where: { id: postId.toString() }
    });

    // Revalidar as páginas relevantes
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    revalidatePath(`/blog/${postData.slug}`);

    return { error: null, data: { deletedPost: postData } };
  } catch (error) {
    console.error("Erro ao excluir post:", error);
    return { error: "Erro interno do servidor ao excluir o post." };
  }
}

// Você pode precisar adicionar outras actions aqui, como updatePostAction, deletePostAction, etc.