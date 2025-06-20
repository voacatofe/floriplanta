import { NextRequest, NextResponse } from 'next/server';
import { getAllTerms, type EncyclopediaCategory } from '@/app/lib/encyclopedia';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const category = searchParams.get('categoria') as EncyclopediaCategory | undefined;
    const searchQuery = searchParams.get('busca') || undefined;
    const perPage = 20; // Mesmo valor usado na página principal

    const { terms, totalCount, categories } = await getAllTerms(
      page,
      perPage,
      category,
      searchQuery
    );

    return NextResponse.json({
      terms,
      totalCount,
      categories,
      currentPage: page,
      totalPages: Math.ceil(totalCount / perPage)
    });
  } catch (error) {
    console.error('Erro ao buscar termos da enciclopédia:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
} 