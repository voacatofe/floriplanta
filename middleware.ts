import { type NextRequest, NextResponse } from 'next/server'
import { updateSupabaseSession } from '@/app/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSupabaseSession(request)
  const { pathname } = request.nextUrl

  // Ocultar rotas /oleos e suas subpáginas
  // Para reativar, comente ou remova este bloco de código.
  if (pathname.startsWith('/oleos')) {
    return new NextResponse(null, { status: 404 });
  }

  // Se o usuário não estiver logado e tentar acessar uma rota /admin (exceto /admin/login e rotas de API de autenticação)
  if (!user && pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/api/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Se o usuário estiver logado e tentar acessar /admin/login, redirecionar para /admin
  if (user && pathname === '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin'
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (para permitir rotas de autenticação do Supabase, se houver)
     * Não colocar /api/auth no admin, pois o Supabase usa /auth/v1...
     * Melhor deixar o matcher mais geral e tratar a lógica no middleware.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
} 