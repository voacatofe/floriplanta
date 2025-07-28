import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/app/lib/blog-data';
import { POSTS_PER_PAGE } from '@/app/lib/constants';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const categorySlug = searchParams.get('categoria') || undefined;
    const searchQuery = searchParams.get('busca') || undefined;
    
    const { posts, totalCount } = await getPosts({
      page,
      published: true,
      categorySlug, // Filtrar por categoria
      searchQuery // Filtrar por busca
    });
    
    return NextResponse.json({
      posts,
      totalCount,
      page,
      hasMore: posts.length === POSTS_PER_PAGE
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    );
  }
}