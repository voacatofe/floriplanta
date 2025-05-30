import { createSupabaseServerClient } from './supabase/server';
import { Database } from './database.types';
import { type AnonymousComment } from './blog-comments';

// Função para buscar comentários de um post (server-side)
export async function getPostComments(postId: number): Promise<AnonymousComment[]> {
  const supabase = await createSupabaseServerClient();
  
  const { data, error } = await supabase
    .from('anonymous_comments')
    .select('*')
    .eq('post_id', postId)
    .eq('is_approved', true)
    .is('parent_comment_id', null) // Apenas comentários raiz
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  
  // Buscar respostas para cada comentário
  const commentsWithReplies = await Promise.all(
    (data || []).map(async (comment) => {
      const { data: replies } = await supabase
        .from('anonymous_comments')
        .select('*')
        .eq('parent_comment_id', comment.id)
        .eq('is_approved', true)
        .order('created_at', { ascending: true });
      
      return {
        ...comment,
        replies: replies || []
      };
    })
  );
  
  return commentsWithReplies;
}

// Função para contar comentários de um post
export async function getCommentCount(postId: number): Promise<number> {
  const supabase = await createSupabaseServerClient();
  
  const { count, error } = await supabase
    .from('anonymous_comments')
    .select('*', { count: 'exact', head: true })
    .eq('post_id', postId)
    .eq('is_approved', true);
  
  if (error) {
    console.error('Error counting comments:', error);
    return 0;
  }
  
  return count || 0;
} 