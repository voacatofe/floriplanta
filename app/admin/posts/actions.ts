'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type Category, type Tag, getAllCategories, getAllTags } from "@/app/lib/blog-data";

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

  const author_id = user.id;

  const { title, slug, excerpt, body, cover_image_url, status, category_ids, tag_ids, published_at } = data;

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

// Você pode precisar adicionar outras actions aqui, como updatePostAction, deletePostAction, etc. 