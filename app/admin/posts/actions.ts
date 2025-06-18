'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { type Category, type Tag, getAllCategories, getAllTags } from "@/app/lib/blog-data";
import { MAX_TITLE_LENGTH, MAX_SLUG_LENGTH } from "@/app/lib/constants";

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
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
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
  const { data: existingPost, error: slugCheckError } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", trimmedSlug)
    .single();
    
  if (slugCheckError && slugCheckError.code !== 'PGRST116') {
    console.error("Erro ao verificar slug existente:", slugCheckError);
    return { error: "Erro ao verificar disponibilidade do slug." };
  }
  
  if (existingPost) {
    return { error: "Este slug já está em uso. Escolha outro." };
  }
  
  // Validar status
  if (!['draft', 'published', 'archived'].includes(data.status)) {
    return { error: "Status inválido." };
  }

  const author_id = user.id;

  const { title, slug, excerpt, body, cover_image_url, status, category_ids, tag_ids, published_at } = {
    ...data,
    title: trimmedTitle,
    slug: trimmedSlug,
    excerpt: data.excerpt?.trim() || null
  };

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({
      title,
      slug,
      excerpt,
      body,
      cover_image_url,
      author_id,
      status,
      published_at,
    })
    .select("id")
    .single();

  if (postError) {
    console.error("Erro ao inserir post:", postError);
    return { error: postError.message };
  }

  const postId = postData.id;

  if (category_ids && category_ids.length > 0) {
    const postCategories = category_ids.map((category_id) => ({
      post_id: postId,
      category_id: category_id,
    }));
    const { error: catError } = await supabase.from("post_categories").insert(postCategories);
    if (catError) {
      console.error("Erro ao inserir categorias do post:", catError);
      return { error: `Post criado, mas falha ao associar categorias: ${catError.message}` };
    }
  }

  if (tag_ids && tag_ids.length > 0) {
    const postTags = tag_ids.map((tag_id) => ({
      post_id: postId,
      tag_id: tag_id,
    }));
    const { error: tagError } = await supabase.from("post_tags").insert(postTags);
    if (tagError) {
      console.error("Erro ao inserir tags do post:", tagError);
      return { error: `Post criado, mas falha ao associar tags: ${tagError.message}` };
    }
  }

  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return { error: null, data: { postId } }; 
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

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Usuário não autenticado." };
  }

  // Primeiro, buscar o post para verificar se existe e obter o slug
  const { data: postData, error: fetchError } = await supabase
    .from("posts")
    .select("id, slug, title")
    .eq("id", postId)
    .single();

  if (fetchError || !postData) {
    return { error: "Post não encontrado." };
  }

  // Remover associações de categorias
  const { error: categoriesError } = await supabase
    .from("post_categories")
    .delete()
    .eq("post_id", postId);

  if (categoriesError) {
    console.error("Erro ao remover categorias do post:", categoriesError);
    return { error: `Erro ao remover categorias: ${categoriesError.message}` };
  }

  // Remover associações de tags
  const { error: tagsError } = await supabase
    .from("post_tags")
    .delete()
    .eq("post_id", postId);

  if (tagsError) {
    console.error("Erro ao remover tags do post:", tagsError);
    return { error: `Erro ao remover tags: ${tagsError.message}` };
  }

  // Remover comentários anônimos associados
  const { error: anonymousCommentsError } = await supabase
    .from("anonymous_comments")
    .delete()
    .eq("post_id", postId);

  if (anonymousCommentsError) {
    console.error("Erro ao remover comentários anônimos:", anonymousCommentsError);
    return { error: `Erro ao remover comentários: ${anonymousCommentsError.message}` };
  }

  // Remover comentários de usuários autenticados
  const { error: commentsError } = await supabase
    .from("comments")
    .delete()
    .eq("post_id", postId);

  if (commentsError) {
    console.error("Erro ao remover comentários:", commentsError);
    return { error: `Erro ao remover comentários: ${commentsError.message}` };
  }

  // Finalmente, remover o post
  const { error: deleteError } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (deleteError) {
    console.error("Erro ao excluir post:", deleteError);
    return { error: deleteError.message };
  }

  // Revalidar as páginas relevantes
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${postData.slug}`);

  return { error: null, data: { deletedPost: postData } };
}

// Você pode precisar adicionar outras actions aqui, como updatePostAction, deletePostAction, etc. 