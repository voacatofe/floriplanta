import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';
import { Home, FileText, FolderOpen, Tag, BookOpen, MessageSquare, BarChart, Settings } from 'lucide-react';
import { Toaster } from 'sonner';
import SignOutButton from './_components/SignOutButton';


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions) as Session | null;

  // Se não estiver logado (e não estiver na página de login), redireciona para o login
  // A verificação do pathname é necessária para evitar um loop infinito de redirect
  // Esta lógica será melhorada com o middleware. Por enquanto, é uma guarda básica.
  if (!session) {
    // Para simplificar, o middleware cuidará do redirecionamento.
    // A página de login será renderizada pelo {children} se a rota for /admin/login
    // Qualquer outra rota /admin/* sem sessão será pega pelo middleware.
    // No entanto, como uma proteção extra, podemos redirecionar aqui.
    redirect('/admin/login');
  }

  return (
    <div className="admin-layout-wrapper flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 dark:bg-gray-900 text-white flex flex-col p-4 flex-shrink-0 border-r border-gray-700">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Admin Floriplanta</h2>
          <p className="text-xs text-gray-400 mt-1">Bem-vindo, {session.user?.name || 'Admin'}</p>
        </div>
        
        <nav className="flex-grow space-y-1">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group"
          >
            <Home className="h-5 w-5 text-gray-400 group-hover:text-white" />
            <span>Dashboard</span>
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="text-xs uppercase text-gray-500 px-3">Conteúdo</p>
          </div>
          
          <Link 
            href="/admin/posts" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group"
          >
            <FileText className="h-5 w-5 text-gray-400 group-hover:text-white" />
            <span>Posts</span>
          </Link>
          
          <Link 
            href="/admin/categories" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group"
          >
            <FolderOpen className="h-5 w-5 text-gray-400 group-hover:text-white" />
            <span>Categorias</span>
          </Link>
          
          <Link 
            href="/admin/tags" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group opacity-50 cursor-not-allowed"
          >
            <Tag className="h-5 w-5 text-gray-400" />
            <span>Tags</span>
            <span className="text-xs bg-yellow-600 px-2 py-0.5 rounded">Em breve</span>
          </Link>
          
          <Link 
            href="/admin/enciclopedia" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group"
          >
            <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-white" />
            <span>Enciclopédia</span>
          </Link>
          
          <Link 
            href="/admin/comments" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group opacity-50 cursor-not-allowed"
          >
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <span>Comentários</span>
            <span className="text-xs bg-yellow-600 px-2 py-0.5 rounded">Em breve</span>
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="text-xs uppercase text-gray-500 px-3">Sistema</p>
          </div>
          
          <Link 
            href="/admin/analytics" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group opacity-50 cursor-not-allowed"
          >
            <BarChart className="h-5 w-5 text-gray-400" />
            <span>Analytics</span>
            <span className="text-xs bg-yellow-600 px-2 py-0.5 rounded">Em breve</span>
          </Link>
          
          <Link 
            href="/admin/settings" 
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors group opacity-50 cursor-not-allowed"
          >
            <Settings className="h-5 w-5 text-gray-400" />
            <span>Configurações</span>
            <span className="text-xs bg-yellow-600 px-2 py-0.5 rounded">Em breve</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-700">
          <SignOutButton />
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
      
      <Toaster position="top-right" richColors />
    </div>
  );
}