import { NextRequest, NextResponse } from 'next/server';
import { getContentProvider } from '@/lib/content-providers';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const provider = getContentProvider();
    
    const options = {
      page: parseInt(searchParams.get('page') || '1'),
      perPage: parseInt(searchParams.get('perPage') || '10'),
      categorySlug: searchParams.get('categorySlug') || undefined,
      tagSlug: searchParams.get('tagSlug') || undefined,
      searchQuery: searchParams.get('searchQuery') || undefined,
      published: searchParams.get('published') 
        ? searchParams.get('published') === 'true'
        : undefined,
    };
    
    const result = await provider.getPosts(options);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    );
  }
}