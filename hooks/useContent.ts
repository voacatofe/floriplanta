'use client';

import { useState, useEffect } from 'react';
import type { UnifiedPost, UnifiedCategory, UnifiedTag } from '@/lib/content-providers';

// Hook para buscar posts
export function usePosts(options?: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
  tagSlug?: string;
  searchQuery?: string;
  published?: boolean;
}) {
  const [posts, setPosts] = useState<UnifiedPost[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (options?.page) params.append('page', options.page.toString());
        if (options?.perPage) params.append('perPage', options.perPage.toString());
        if (options?.categorySlug) params.append('categorySlug', options.categorySlug);
        if (options?.tagSlug) params.append('tagSlug', options.tagSlug);
        if (options?.searchQuery) params.append('searchQuery', options.searchQuery);
        if (options?.published !== undefined) params.append('published', options.published.toString());

        const response = await fetch(`/api/content/posts?${params}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Erro ao buscar posts');
        }
        
        setPosts(data.posts);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    void fetchPosts();
  }, [
    options?.page,
    options?.perPage,
    options?.categorySlug,
    options?.tagSlug,
    options?.searchQuery,
    options?.published,
  ]);

  return { posts, totalCount, loading, error };
}

// Hook para buscar um post específico
export function usePost(slug: string) {
  const [post, setPost] = useState<UnifiedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await fetch(`/api/content/posts/${slug}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Erro ao buscar post');
        }
        
        setPost(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      void fetchPost();
    }
  }, [slug]);

  return { post, loading, error };
}

// Hook para buscar categorias
export function useCategories() {
  const [categories, setCategories] = useState<UnifiedCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch('/api/content/categories');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Erro ao buscar categorias');
        }
        
        setCategories(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    void fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Hook para buscar tags
export function useTags() {
  const [tags, setTags] = useState<UnifiedTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        setLoading(true);
        const response = await fetch('/api/content/tags');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Erro ao buscar tags');
        }
        
        setTags(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    void fetchTags();
  }, []);

  return { tags, loading, error };
}