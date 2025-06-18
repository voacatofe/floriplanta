import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/app/lib/blog-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const categorySlug = searchParams.get('categoria') || undefined;
    
    const { posts, totalCount } = await getPosts({
      page,
      status: 'published',
      // categorySlug // Será implementado quando o filtro por categoria for adicionado
    });
    
    return NextResponse.json({
      posts,
      totalCount,
      page,
      hasMore: posts.length === 10 // POSTS_PER_PAGE
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    );
  }
} 