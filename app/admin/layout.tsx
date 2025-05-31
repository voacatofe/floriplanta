import Link from 'next/link';
import { logout } from './actions'; // Importar a action de logout
import { Button } from '@/components/ui/button'; // Importar o componente Button
import { LogOut } from 'lucide-react'; // Ícone opcional

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout-wrapper flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 dark:bg-gray-800 text-white flex flex-col p-4 flex-shrink-0">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Admin Floriplanta</h2>
        </div>
        <nav className="flex-grow space-y-2">
          <Link href="/admin" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition-colors">Dashboard</Link>
          <Link href="/admin/posts" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition-colors">Posts</Link>
          <Link href="/admin/categorias" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition-colors">Categorias</Link>
          <Link href="/admin/tags" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition-colors">Tags</Link>
          <Link href="/admin/comentarios" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded transition-colors">Comentários</Link>
          {/* Adicionar mais links conforme necessário */}
        </nav>
        <div className="mt-auto">
          <form action={logout}>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left hover:bg-red-700 dark:hover:bg-red-600 hover:text-white dark:hover:text-white space-x-2"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </Button>
          </form>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto">
        {/* O padding agora será controlado pela página específica, como app/admin/posts/novo/page.tsx */}
        {children}
      </main>
    </div>
  );
} 