'use server';

import { createSupabaseServerClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { type Database } from '@/app/lib/database.types';

// Tipo para os dados do formulário que a action espera
// Pode ser mais específico ou igual ao PostFormData da página, dependendo da necessidade
// Por simplicidade, vamos assumir que recebe todos os campos necessários.
export type PostCreationData = {
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: string | null;
  cover_image_url?: string | null;
  // author_id será obtido na action
  status: 'draft' | 'published';
  category_ids?: number[];
  tag_ids?: number[];
  published_at?: string | null; // Formato ISO string se publicado, ou null
};

// A action agora recebe dados sem author_id, pois ele será pego aqui dentro.
type ActionInputData = Omit<PostCreationData, 'author_id'>;

export async function createPostAction(data: ActionInputData) {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Usuário não autenticado. Falha ao criar post.' };
  }

  const author_id = user.id;

  // 1. Inserir o post principal na tabela 'posts'
  const postToInsert: Omit<Database['public']['Tables']['posts']['Insert'], 'id' | 'created_at' | 'updated_at'> = {
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    body: data.body,
    cover_image_url: data.cover_image_url,
    author_id: author_id, // Usar o ID do usuário logado
    status: data.status,
    published_at: data.status === 'published' ? (data.published_at || new Date().toISOString()) : null,
  };

  const { data: newPost, error: postError } = await supabase
    .from('posts')
    .insert(postToInsert)
    .select()
    .single();

  if (postError || !newPost) {
    console.error('Erro ao criar post:', postError?.message);
    return { error: `Falha ao criar post: ${postError?.message || 'Erro desconhecido'}` };
  }

  // 2. Lidar com categorias (tabela de junção post_categories)
  if (data.category_ids && data.category_ids.length > 0) {
    const postCategories = data.category_ids.map(categoryId => ({
      post_id: newPost.id,
      category_id: categoryId,
    }));
    const { error: categoriesError } = await supabase.from('post_categories').insert(postCategories);
    if (categoriesError) {
      console.error('Erro ao associar categorias:', categoriesError.message);
      // Não vamos retornar erro fatal aqui, mas talvez logar ou notificar
    }
  }

  // 3. Lidar com tags (tabela de junção post_tags)
  if (data.tag_ids && data.tag_ids.length > 0) {
    const postTags = data.tag_ids.map(tagId => ({
      post_id: newPost.id,
      tag_id: tagId,
    }));
    const { error: tagsError } = await supabase.from('post_tags').insert(postTags);
    if (tagsError) {
      console.error('Erro ao associar tags:', tagsError.message);
      // Não vamos retornar erro fatal aqui, mas talvez logar ou notificar
    }
  }

  revalidatePath('/admin/posts', 'page');
  revalidatePath('/blog', 'page'); // Revalidar a página do blog também
  revalidatePath(`/blog/${newPost.slug}`, 'page'); // Revalidar a página do post específico
  
  // Não é necessário redirecionar aqui, o cliente fará isso.
  return { success: true, postId: newPost.id }; 
} 