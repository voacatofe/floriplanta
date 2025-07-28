// Comentar temporariamente para resolver erro de deploy
// import { MetricsCards } from "./_components/dashboard/MetricsCards";
// import { PostsChart } from "./_components/dashboard/PostsChart";
// import { RecentPosts } from "./_components/dashboard/RecentPosts";
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Componente de loading
function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-32">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  );
}

// Dashboard simples temporário
function SimpleDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Dashboard</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">Em breve</p>
        <p className="text-sm text-gray-500 mt-1">Métricas em desenvolvimento</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Posts</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">📝</p>
        <p className="text-sm text-gray-500 mt-1">Gerencie seus posts</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Categorias</h3>
        <p className="text-3xl font-bold text-purple-600 mt-2">📁</p>
        <p className="text-sm text-gray-500 mt-1">Organize por categorias</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">Comentários</h3>
        <p className="text-3xl font-bold text-orange-600 mt-2">💬</p>
        <p className="text-sm text-gray-500 mt-1">Modere comentários</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Bem-vindo ao painel de administração da Floriplanta!
        </p>
      </div>

      {/* Dashboard simples temporário */}
      <Suspense fallback={<LoadingComponent />}>
        <SimpleDashboard />
      </Suspense>

      {/* Seção de links rápidos */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Links Rápidos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/admin/posts" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium">📝 Gerenciar Posts</h3>
            <p className="text-sm text-gray-500 mt-1">Criar, editar e excluir posts</p>
          </a>
          <a 
            href="/admin/categories" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium">📁 Categorias</h3>
            <p className="text-sm text-gray-500 mt-1">Organizar conteúdo por categoria</p>
          </a>
          <a 
            href="/admin/posts/novo" 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-medium">✨ Novo Post</h3>
            <p className="text-sm text-gray-500 mt-1">Criar novo conteúdo</p>
          </a>
        </div>
      </div>
    </div>
  );
} 