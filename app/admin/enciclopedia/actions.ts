'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import type { Session } from 'next-auth';
import { PrismaClient } from '@/lib/generated/prisma';
import { type EncyclopediaCategory } from '@/app/lib/encyclopedia';

const prisma = new PrismaClient();

export interface TermCreationData {
  term: string;
  slug: string;
  definition: string;
  category: EncyclopediaCategory;
  related_terms: string[];
  meta_description?: string;
}

export interface TermUpdateData {
  term: string;
  slug: string;
  definition: string;
  category: EncyclopediaCategory;
  related_terms: string[];
  meta_description?: string;
  is_active: boolean;
}

export async function createTermAction(data: TermCreationData) {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session || !session.user) {
    return { error: "Usuário não autenticado." };
  }

  // Validações de entrada
  const trimmedTerm = data.term?.trim();
  const trimmedSlug = data.slug?.trim();
  const trimmedDefinition = data.definition?.trim();
  
  if (!trimmedTerm || trimmedTerm.length === 0) {
    return { error: "Termo é obrigatório." };
  }
  
  if (!trimmedSlug || trimmedSlug.length === 0) {
    return { error: "Slug é obrigatório." };
  }
  
  if (!trimmedDefinition || trimmedDefinition.length === 0) {
    return { error: "Definição é obrigatória." };
  }
  
  if (trimmedTerm.length > 200) {
    return { error: "Termo deve ter no máximo 200 caracteres." };
  }
  
  if (trimmedSlug.length > 250) {
    return { error: "Slug deve ter no máximo 250 caracteres." };
  }
  
  // Validar se o slug contém apenas caracteres permitidos
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(trimmedSlug)) {
    return { error: "Slug deve conter apenas letras minúsculas, números e hífens." };
  }
  
  // Verificar se o termo já existe
  try {
    const existingTerm = await prisma.encyclopediaTerm.findFirst({
      where: {
        OR: [
          { term: trimmedTerm },
          { slug: trimmedSlug }
        ]
      },
      select: { id: true, term: true, slug: true }
    });
    
    if (existingTerm) {
      if (existingTerm.term === trimmedTerm) {
        return { error: "Este termo já existe." };
      }
      if (existingTerm.slug === trimmedSlug) {
        return { error: "Este slug já está em uso." };
      }
    }
  } catch (error) {
    console.error("Erro ao verificar termo existente:", error);
    return { error: "Erro ao verificar disponibilidade do termo." };
  }
  
  // Validar categoria
  const validCategories: EncyclopediaCategory[] = ['Saúde', 'Química', 'Legislação'];
  if (!validCategories.includes(data.category)) {
    return { error: "Categoria inválida." };
  }

  const { term, slug, definition, category, related_terms, meta_description } = {
    ...data,
    term: trimmedTerm,
    slug: trimmedSlug,
    definition: trimmedDefinition
  };

  try {
    const termData = await prisma.encyclopediaTerm.create({
      data: {
        term,
        slug,
        definition,
        category,
        related_terms: related_terms || [],
        meta_description: meta_description?.trim() || null,
        is_active: true
      },
      select: { id: true, slug: true }
    });

    revalidatePath("/admin/enciclopedia");
    revalidatePath("/enciclopedia");
    revalidatePath(`/enciclopedia/${slug}`);

    return { error: null, data: { termId: termData.id, slug: termData.slug } };
  } catch (error) {
    console.error("Erro ao criar termo:", error);
    return { error: "Erro interno do servidor ao criar o termo." };
  }
}

export async function getTermForEdit(termId: string) {
  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: "Usuário não autenticado." };
  }

  if (!termId || typeof termId !== 'string' || termId.trim() === '') {
    return { error: "ID do termo inválido." };
  }

  try {
    const term = await prisma.encyclopediaTerm.findUnique({
      where: { id: termId }
    });

    if (!term) {
      return { error: "Termo não encontrado." };
    }

    return { error: null, data: term };
  } catch (error) {
    console.error("Erro ao buscar termo para edição:", error);
    return { error: "Erro interno do servidor ao buscar o termo." };
  }
}

export async function updateTermAction(termId: string, data: TermUpdateData) {
  const session = await getServerSession(authOptions) as Session | null;

  if (!session || !session.user) {
    return { error: "Usuário não autenticado." };
  }

  if (!termId || typeof termId !== 'string' || termId.trim() === '') {
    return { error: "ID do termo inválido." };
  }

  // Validações de entrada
  const trimmedTerm = data.term?.trim();
  const trimmedSlug = data.slug?.trim();
  const trimmedDefinition = data.definition?.trim();
  
  if (!trimmedTerm || trimmedTerm.length === 0) {
    return { error: "Termo é obrigatório." };
  }
  
  if (!trimmedSlug || trimmedSlug.length === 0) {
    return { error: "Slug é obrigatório." };
  }
  
  if (!trimmedDefinition || trimmedDefinition.length === 0) {
    return { error: "Definição é obrigatória." };
  }
  
  if (trimmedTerm.length > 200) {
    return { error: "Termo deve ter no máximo 200 caracteres." };
  }
  
  if (trimmedSlug.length > 250) {
    return { error: "Slug deve ter no máximo 250 caracteres." };
  }
  
  // Validar se o slug contém apenas caracteres permitidos
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(trimmedSlug)) {
    return { error: "Slug deve conter apenas letras minúsculas, números e hífens." };
  }
  
  // Verificar se o termo/slug já existe (exceto para o termo atual)
  try {
    const existingTerm = await prisma.encyclopediaTerm.findFirst({
      where: {
        AND: [
          { id: { not: termId } },
          {
            OR: [
              { term: trimmedTerm },
              { slug: trimmedSlug }
            ]
          }
        ]
      },
      select: { id: true, term: true, slug: true }
    });
    
    if (existingTerm) {
      if (existingTerm.term === trimmedTerm) {
        return { error: "Este termo já existe." };
      }
      if (existingTerm.slug === trimmedSlug) {
        return { error: "Este slug já está em uso." };
      }
    }
  } catch (error) {
    console.error("Erro ao verificar termo existente:", error);
    return { error: "Erro ao verificar disponibilidade do termo." };
  }
  
  // Validar categoria
  const validCategories: EncyclopediaCategory[] = ['Saúde', 'Química', 'Legislação'];
  if (!validCategories.includes(data.category)) {
    return { error: "Categoria inválida." };
  }

  const { term, slug, definition, category, related_terms, meta_description, is_active } = {
    ...data,
    term: trimmedTerm,
    slug: trimmedSlug,
    definition: trimmedDefinition
  };

  try {
    // Primeiro, buscar o termo atual para obter o slug antigo
    const currentTerm = await prisma.encyclopediaTerm.findUnique({
      where: { id: termId },
      select: { slug: true }
    });

    if (!currentTerm) {
      return { error: "Termo não encontrado." };
    }

    const updatedTerm = await prisma.encyclopediaTerm.update({
      where: { id: termId },
      data: {
        term,
        slug,
        definition,
        category,
        related_terms: related_terms || [],
        meta_description: meta_description?.trim() || null,
        is_active
      },
      select: { id: true, slug: true }
    });

    revalidatePath("/admin/enciclopedia");
    revalidatePath("/enciclopedia");
    revalidatePath(`/enciclopedia/${currentTerm.slug}`); // Slug antigo
    revalidatePath(`/enciclopedia/${updatedTerm.slug}`); // Slug novo

    return { error: null, data: { termId: updatedTerm.id, slug: updatedTerm.slug } };
  } catch (error) {
    console.error("Erro ao atualizar termo:", error);
    return { error: "Erro interno do servidor ao atualizar o termo." };
  }
}

export async function deleteTermAction(termId: string) {
  // Validações de entrada
  if (!termId || typeof termId !== 'string' || termId.trim() === '') {
    return { error: "ID do termo inválido." };
  }

  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: "Usuário não autenticado." };
  }

  try {
    // Primeiro, buscar o termo para verificar se existe e obter o slug
    const termData = await prisma.encyclopediaTerm.findUnique({
      where: { id: termId },
      select: { id: true, slug: true, term: true }
    });

    if (!termData) {
      return { error: "Termo não encontrado." };
    }

    // Remover o termo
    await prisma.encyclopediaTerm.delete({
      where: { id: termId }
    });

    // Revalidar as páginas relevantes
    revalidatePath("/admin/enciclopedia");
    revalidatePath("/enciclopedia");
    revalidatePath(`/enciclopedia/${termData.slug}`);

    return { error: null, data: { deletedTerm: termData } };
  } catch (error) {
    console.error("Erro ao excluir termo:", error);
    return { error: "Erro interno do servidor ao excluir o termo." };
  }
}

export async function toggleTermStatusAction(termId: string) {
  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: "Usuário não autenticado." };
  }

  if (!termId || typeof termId !== 'string' || termId.trim() === '') {
    return { error: "ID do termo inválido." };
  }

  try {
    // Buscar o termo atual
    const currentTerm = await prisma.encyclopediaTerm.findUnique({
      where: { id: termId },
      select: { id: true, is_active: true, slug: true }
    });

    if (!currentTerm) {
      return { error: "Termo não encontrado." };
    }

    // Alternar o status
    const updatedTerm = await prisma.encyclopediaTerm.update({
      where: { id: termId },
      data: {
        is_active: !currentTerm.is_active
      },
      select: { id: true, is_active: true, slug: true }
    });

    revalidatePath("/admin/enciclopedia");
    revalidatePath("/enciclopedia");
    revalidatePath(`/enciclopedia/${updatedTerm.slug}`);

    return { 
      error: null, 
      data: { 
        termId: updatedTerm.id, 
        is_active: updatedTerm.is_active,
        message: updatedTerm.is_active ? "Termo ativado com sucesso." : "Termo desativado com sucesso."
      } 
    };
  } catch (error) {
    console.error("Erro ao alterar status do termo:", error);
    return { error: "Erro interno do servidor ao alterar status do termo." };
  }
}

export async function getAllTermsForAdmin() {
  const session = await getServerSession(authOptions) as Session | null;
  if (!session?.user) {
    return { error: "Usuário não autenticado." };
  }

  try {
    const terms = await prisma.encyclopediaTerm.findMany({
      orderBy: {
        term: 'asc'
      },
      select: {
        id: true,
        term: true,
        slug: true
      }
    });

    return { error: null, data: terms };
  } catch (error) {
    console.error("Erro ao buscar termos para admin:", error);
    return { error: "Erro interno do servidor ao buscar termos." };
  }
}