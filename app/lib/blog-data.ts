import { createSupabaseServerClient } from './supabase/server'
import { Database } from './database.types'

export type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles: Pick<Database['public']['Tables']['profiles']['Row'], 'display_name' | 'username'> | null
  categories: Pick<Database['public']['Tables']['categories']['Row'], 'id' | 'name' | 'slug'>[]
  tags: Pick<Database['public']['Tables']['tags']['Row'], 'id' | 'name' | 'slug'>[]
}

export type SinglePost = Database['public']['Tables']['posts']['Row'] & {
  profiles: Pick<Database['public']['Tables']['profiles']['Row'], 'id' | 'display_name' | 'username' | 'avatar_url' | 'bio'> | null
  categories: Pick<Database['public']['Tables']['categories']['Row'], 'id' | 'name' | 'slug'>[]
  tags: Pick<Database['public']['Tables']['tags']['Row'], 'id' | 'name' | 'slug'>[]
}

export type Category = Database['public']['Tables']['categories']['Row']
export type Tag = Database['public']['Tables']['tags']['Row']

const POSTS_PER_PAGE = 10;

export async function getPosts(
  options: {
    page?: number;
    categorySlug?: string;
    status?: 'published' | 'draft' | 'archived' | 'all';
    // tagSlug?: string;    // Removido por enquanto
  } = {}
): Promise<{ posts: Post[]; totalCount: number }> {
  const supabase = await createSupabaseServerClient();
  const { page = 1, categorySlug, status = 'published' } = options;

  let categoryId: number | null = null;
  if (categorySlug) {
    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', categorySlug)
      .single();
    
    categoryId = categoryData?.id || null;
  }

  const selectString = `
    id, title, slug, excerpt, cover_image_url, published_at, status, author_id,
    profiles (display_name, username),
    categories!post_categories (id, name, slug),
    tags!post_tags (id, name, slug)
  `;

  let queryPosts = supabase
    .from('posts')
    .select(selectString);

  if (status !== 'all') {
    queryPosts = queryPosts.eq('status', status);
  }

  if (categoryId) {
    const { data: postIds } = await supabase
      .from('post_categories')
      .select('post_id')
      .eq('category_id', categoryId);
    
    if (postIds && postIds.length > 0) {
      const ids = postIds.map((p: { post_id: number }) => p.post_id);
      queryPosts = queryPosts.in('id', ids);
    } else {
      return { posts: [], totalCount: 0 };
    }
  }

  queryPosts = queryPosts
    .order('published_at', { ascending: false })
    .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

  let countQueryBuilder = supabase
    .from('posts')
    .select('id', { count: 'exact', head: true });

  if (status !== 'all') {
    countQueryBuilder = countQueryBuilder.eq('status', status);
  }

  if (categoryId) {
    const { data: postIds } = await supabase
      .from('post_categories')
      .select('post_id')
      .eq('category_id', categoryId);
    
    if (postIds && postIds.length > 0) {
      const ids = postIds.map((p: { post_id: number }) => p.post_id);
      countQueryBuilder = countQueryBuilder.in('id', ids);
    } else {
      return { posts: [], totalCount: 0 };
    }
  }

  const [
    { data: postsData, error: postsError },
    { count: totalCountData, error: countError }
  ] = await Promise.all([
    queryPosts.returns<Post[]>(),
    countQueryBuilder
  ]);

  if (postsError) {
    console.error('Error fetching posts:', postsError);
    throw new Error('Could not fetch posts.');
  }
  if (countError) {
    console.error('Error fetching posts count:', countError);
  }

  return { posts: postsData || [], totalCount: totalCountData || 0 };
}

export async function getPostBySlug(slug: string): Promise<SinglePost | null> {
  console.log(`[getPostBySlug] Buscando post com slug: "${slug}"`);
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles (id, display_name, username, avatar_url, bio),
      categories!post_categories (id, name, slug),
      tags!post_tags (id, name, slug)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error(`[getPostBySlug] Erro ao buscar post com slug "${slug}":`, {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error 
    });

    if (error.code === 'PGRST116') { 
      console.log(`[getPostBySlug] Post com slug "${slug}" não encontrado (PGRST116).`);
      return null;
    }
    throw new Error(`Could not fetch post. Supabase error code: ${error.code}, Message: ${error.message}`);
  }

  if (!data) {
    console.log(`[getPostBySlug] Post com slug "${slug}" não retornou dados, mas sem erro explícito.`);
  } else {
    console.log(`[getPostBySlug] Post encontrado para slug "${slug}":`, data.title);
  }
  return data as SinglePost | null;
}

export async function getAllCategories(): Promise<Category[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Could not fetch categories.')
  }
  return data || []
}

export async function getAllTags(): Promise<Tag[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching tags:', error)
    throw new Error('Could not fetch tags.')
  }
  return data || []
}

export async function getCategories() {
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

export async function getRelatedPosts(currentPostId: number, categoryId?: number) {
  const supabase = await createSupabaseServerClient();
  
  let query = supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      body,
      cover_image_url,
      published_at,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq('status', 'published')
    .neq('id', currentPostId)
    .order('published_at', { ascending: false })
    .limit(3);
  
  // Se houver categoria, priorizar posts da mesma categoria
  if (categoryId) {
    // Primeiro tenta buscar posts da mesma categoria
    const { data: sameCategoryPosts, error: sameCategoryError } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        body,
        cover_image_url,
        published_at,
        categories!inner (
          id,
          name,
          slug
        )
      `)
      .eq('status', 'published')
      .neq('id', currentPostId)
      .eq('categories.id', categoryId)
      .order('published_at', { ascending: false })
      .limit(3);
    
    if (!sameCategoryError && sameCategoryPosts && sameCategoryPosts.length > 0) {
      return sameCategoryPosts;
    }
  }
  
  // Se não houver posts suficientes da mesma categoria, busca posts gerais
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
  
  return data || [];
}