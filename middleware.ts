import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ocultar rotas /oleos e suas subpáginas
  // Para reativar, comente ou remova este bloco de código.
  if (pathname.startsWith('/oleos')) {
    return new NextResponse(null, { status: 404 });
  }

  // Verificar autenticação para rotas /admin
  if (pathname.startsWith('/admin')) {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET, 
    });

    // Se não estiver logado e tentar acessar uma rota /admin (exceto /admin/login e rotas de API de autenticação)
    if (!token && !pathname.startsWith('/admin/login') && !pathname.startsWith('/api/auth')) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }

    // Se estiver logado e tentar acessar /admin/login, redirecionar para /admin
    if (token && pathname === '/admin/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (rotas de API do Next-Auth)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};