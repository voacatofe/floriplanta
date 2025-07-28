'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';
import type { PostWithRelations } from '@/app/lib/blog-data';
import { Loader2, AlertCircle } from 'lucide-react';

interface InfiniteScrollPostsProps {
  initialPosts: PostWithRelations[];
  totalCount: number;
  categorySlug?: string;
  searchQuery?: string;
}

export default function InfiniteScrollPosts({ 
  initialPosts, 
  totalCount,
  categorySlug,
  searchQuery, 
}: InfiniteScrollPostsProps) {
  const [posts, setPosts] = useState<PostWithRelations[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalCount);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(categorySlug && { categoria: categorySlug }),
        ...(searchQuery && { busca: searchQuery }),
      });
      
      const response = await fetch(`/api/blog/posts?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (data.posts && data.posts.length > 0) {
        setPosts(prev => [...prev, ...data.posts]);
        setPage(prev => prev + 1);
        
        const totalLoaded = posts.length + data.posts.length;
        setHasMore(totalLoaded < totalCount);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar mais posts:', error);
      setError(error instanceof Error ? error.message : 'Erro desconhecido ao carregar posts');
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, posts.length, totalCount, categorySlug]);

  useEffect(() => {
    if (inView && hasMore && !loading && !error) {
      loadMorePosts();
    }
  }, [inView, hasMore, loading, error, loadMorePosts]);

  const handleRetry = () => {
    setError(null);
    loadMorePosts();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      <div ref={ref} className="mt-12 text-center">
        {loading && (
          <div className="flex justify-center items-center gap-2 text-brand-purple">
            <Loader2 className="animate-spin" size={24} />
            <span>Carregando mais posts...</span>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center gap-3 text-red-600">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} />
              <span>Erro ao carregar posts: {error}</span>
            </div>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-hover-purple transition-colors"
              disabled={loading}
            >
              {loading ? 'Tentando...' : 'Tentar Novamente'}
            </button>
          </div>
        )}
        
        {!hasMore && !loading && !error && posts.length > 0 && (
          <p className="text-gray-600">
            Você chegou ao fim! Total de {posts.length} posts.
          </p>
        )}
        
        {!hasMore && !loading && !error && posts.length === 0 && (
          <p className="text-gray-600">
            Nenhum post encontrado.
          </p>
        )}
      </div>
    </>
  );
}