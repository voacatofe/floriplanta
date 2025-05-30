"use client";

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';
import type { Post } from '@/app/lib/blog-data';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollPostsProps {
  initialPosts: Post[];
  totalCount: number;
  categorySlug?: string;
}

const POSTS_PER_PAGE = 10;

export default function InfiniteScrollPosts({ 
  initialPosts, 
  totalCount,
  categorySlug 
}: InfiniteScrollPostsProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length < totalCount);
  
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        ...(categorySlug && { categoria: categorySlug })
      });
      
      const response = await fetch(`/api/blog/posts?${params}`);
      const data = await response.json();
      
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
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, posts.length, totalCount, categorySlug]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMorePosts();
    }
  }, [inView, hasMore, loading, loadMorePosts]);

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
        
        {!hasMore && posts.length > 0 && (
          <p className="text-gray-600">
            Você chegou ao fim! Total de {posts.length} posts.
          </p>
        )}
        
        {!hasMore && posts.length === 0 && (
          <p className="text-gray-600">
            Nenhum post encontrado.
          </p>
        )}
      </div>
    </>
  );
} 