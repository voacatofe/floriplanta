import { MetricsCards } from "./_components/dashboard/MetricsCards";
import { PostsChart } from "./_components/dashboard/PostsChart";
import { RecentPosts } from "./_components/dashboard/RecentPosts";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

// Componente de loading
function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-32">
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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

      {/* Métricas */}
      <Suspense fallback={<LoadingComponent />}>
        <MetricsCards />
      </Suspense>

      {/* Grid de gráficos e tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Posts */}
        <Suspense fallback={<LoadingComponent />}>
          <PostsChart />
        </Suspense>

        {/* Posts Recentes */}
        <Suspense fallback={<LoadingComponent />}>
          <RecentPosts />
        </Suspense>
      </div>
    </div>
  );
} 