'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';
import { PrismaClient } from '@/lib/generated/prisma';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export async function createCategoryAction(data: { name: string; slug: string; description?: string | null }) {
  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: 'Usuário não autenticado.' };
  }

  // Validações básicas
  if (!data.name || !data.slug) {
    return { error: 'Nome e slug são obrigatórios' };
  }

  try {
    // Verificar slug existente
    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
      select: { id: true }
    });
    
    if (existing) {
      return { error: 'Slug já existente' };
    }

    await prisma.category.create({
      data: {
        name: data.name,
        slug: data.slug,
      }
    });

    revalidatePath('/admin/categories');
    return { error: null };
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return { error: 'Erro interno do servidor ao criar categoria.' };
  }
}

export async function deleteCategoryAction(id: string) {
  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: 'Usuário não autenticado.' };
  }

  try {
    await prisma.category.delete({
      where: { id }
    });

    revalidatePath('/admin/categories');
    return { error: null };
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    return { error: 'Erro interno do servidor ao deletar categoria.' };
  }
}