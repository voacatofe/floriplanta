"use client";

import { useState, useEffect } from 'react';
import { type AnonymousComment } from '@/app/lib/blog-comments';
import { createComment } from '@/app/lib/blog-comments.client';
import { MessageCircle, Send, Reply, User } from 'lucide-react';

interface CommentSectionProps {
  postId: number;
  initialComments?: AnonymousComment[];
}

export default function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<AnonymousComment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.comment.trim()) {
      newErrors.comment = 'Comentário é obrigatório';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, parentCommentId?: number) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const newComment = await createComment(
        postId,
        formData.name,
        formData.comment,
        formData.email || undefined,
        parentCommentId
      );
      
      // Atualizar a lista de comentários
      if (parentCommentId) {
        // Se for uma resposta, adicionar ao comentário pai
        setComments(prevComments => 
          prevComments.map(comment => {
            if (comment.id === parentCommentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment]
              };
            }
            return comment;
          })
        );
      } else {
        // Se for um comentário novo, adicionar ao topo
        setComments(prevComments => [{ ...newComment, replies: [] }, ...prevComments]);
      }
      
      // Limpar formulário
      setFormData({ name: '', email: '', comment: '' });
      setReplyingTo(null);
      setErrors({});
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      setErrors({ submit: 'Erro ao enviar comentário. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const CommentItem = ({ comment, isReply = false }: { comment: AnonymousComment; isReply?: boolean }) => (
    <div className={`${isReply ? 'ml-8 md:ml-12' : ''} mb-6`}>
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-brand-light-green rounded-full flex items-center justify-center">
            <User size={20} className="text-brand-green" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-2">
              <h4 className="font-semibold text-brand-purple">{comment.author_name}</h4>
              <time className="text-xs text-gray-500">{formatDate(comment.created_at)}</time>
            </div>
            <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">{comment.body}</p>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-sm text-brand-green hover:text-brand-hover-green flex items-center gap-1"
              >
                <Reply size={14} />
                Responder
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Formulário de resposta */}
      {replyingTo === comment.id && (
        <div className="ml-8 md:ml-12 mt-3">
          <form onSubmit={(e) => handleSubmit(e, comment.id)} className="bg-gray-50 rounded-lg p-4">
            <h5 className="text-sm font-semibold text-brand-purple mb-3">
              Respondendo a {comment.author_name}
            </h5>
            <CommentForm />
            <div className="flex gap-2 mt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-brand-green hover:bg-brand-hover-green text-white font-medium rounded-lg transition-colors text-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Resposta'}
              </button>
              <button
                type="button"
                onClick={() => setReplyingTo(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Respostas */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} isReply={true} />
          ))}
        </div>
      )}
    </div>
  );

  const CommentForm = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <input
            type="text"
            placeholder="Seu nome *"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Seu email (opcional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div className="mt-3">
        <textarea
          placeholder="Seu comentário *"
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/50 resize-none ${
            errors.comment ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.comment && <p className="text-red-500 text-xs mt-1">{errors.comment}</p>}
      </div>
    </>
  );

  return (
    <section className="bg-[#f8f5f0] py-10 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="text-brand-purple" size={24} />
            <h3 className="text-xl md:text-2xl font-futuru font-semibold text-brand-purple">
              Comentários ({comments.length})
            </h3>
          </div>

          {/* Formulário de novo comentário */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <h4 className="font-semibold text-brand-purple mb-4">Deixe seu comentário</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
              <CommentForm />
              {errors.submit && (
                <p className="text-red-500 text-sm mt-2">{errors.submit}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-6 py-2.5 bg-brand-green hover:bg-brand-hover-green text-white font-semibold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send size={16} />
                    Enviar Comentário
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Lista de comentários */}
          <div>
            {comments.length === 0 ? (
              <p className="text-center text-gray-600 py-12">
                Seja o primeiro a comentar!
              </p>
            ) : (
              comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 