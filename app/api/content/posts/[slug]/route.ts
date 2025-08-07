import { NextRequest, NextResponse } from 'next/server';
import { getContentProvider } from '@/lib/content-providers';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const provider = getContentProvider();
    const post = await provider.getPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar post' },
      { status: 500 }
    );
  }
}