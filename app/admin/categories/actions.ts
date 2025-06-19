'use server';

import { createSupabaseServerClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createCategoryAction(data: { name: string; slug: string; description?: string | null }) {
  const supabase = await createSupabaseServerClient();

  // Validações básicas
  if (!data.name || !data.slug) {
    return { error: 'Nome e slug são obrigatórios' };
  }

  // Verificar slug existente
  const { data: existing } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', data.slug)
    .maybeSingle();
  if (existing) {
    return { error: 'Slug já existente' };
  }

  const { error } = await supabase.from('categories').insert({
    name: data.name,
    slug: data.slug,
    description: data.description || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/categories');
  return { error: null };
}

export async function deleteCategoryAction(id: number) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) {
    return { error: error.message };
  }

  revalidatePath('/admin/categories');
  return { error: null };
}