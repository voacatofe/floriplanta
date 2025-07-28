import { createSupabaseBrowserClient } from './supabase/client';
import { type AnonymousComment } from './blog-comments'; // Importar o tipo

// Função para criar comentário (client-side)
export async function createComment(
  postId: string,
  authorName: string,
  body: string,
  authorEmail?: string,
  parentCommentId?: number
): Promise<AnonymousComment> { // Especificar o tipo de retorno
  const supabase = createSupabaseBrowserClient();
  
  const { data, error } = await supabase
    .from('anonymous_comments')
    .insert({
      post_id: postId,
      author_name: authorName,
      author_email: authorEmail,
      body: body,
      parent_comment_id: parentCommentId,
      is_approved: true // Auto-aprovar por enquanto, pode mudar para moderação
    })
    .select()
    .single();
  
  if (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
  
  // Garantir que o objeto retornado esteja em conformidade com AnonymousComment
  return { ...data, replies: [] } as AnonymousComment;
}
 