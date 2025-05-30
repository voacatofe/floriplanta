export type AnonymousComment = {
  id: number;
  post_id: number;
  author_name: string;
  author_email?: string | null;
  body: string;
  is_approved: boolean | null;
  parent_comment_id?: number | null;
  created_at: string;
  updated_at: string;
  replies?: AnonymousComment[];
}; 