# Exemplos de Implementação - Admin Dashboard Floriplanta

## 1. Dashboard com Métricas (Usando Tremor)

### Componente de Métricas
```typescript
// app/admin/_components/dashboard/MetricsCards.tsx
import { Card, Metric, Text, Flex, ProgressBar } from "@tremor/react";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export async function MetricsCards() {
  const supabase = await createSupabaseServerClient();
  
  // Buscar métricas
  const { count: totalPosts } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });
    
  const { count: publishedPosts } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");
    
  const { count: draftPosts } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");
    
  const { count: pendingComments } = await supabase
    .from("anonymous_comments")
    .select("*", { count: "exact", head: true })
    .eq("approved", false);

  const publishRate = totalPosts ? (publishedPosts! / totalPosts!) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <Text>Total de Posts</Text>
        <Metric>{totalPosts || 0}</Metric>
      </Card>
      
      <Card>
        <Text>Posts Publicados</Text>
        <Metric>{publishedPosts || 0}</Metric>
        <Flex className="mt-4">
          <Text className="truncate">{publishRate.toFixed(0)}% publicados</Text>
        </Flex>
        <ProgressBar value={publishRate} className="mt-2" />
      </Card>
      
      <Card>
        <Text>Rascunhos</Text>
        <Metric>{draftPosts || 0}</Metric>
      </Card>
      
      <Card>
        <Text>Comentários Pendentes</Text>
        <Metric>{pendingComments || 0}</Metric>
      </Card>
    </div>
  );
}
```

### Gráfico de Posts por Mês
```typescript
// app/admin/_components/dashboard/PostsChart.tsx
import { Card, Title, AreaChart } from "@tremor/react";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";

export async function PostsChart() {
  const supabase = await createSupabaseServerClient();
  
  // Buscar posts dos últimos 6 meses
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const { data: posts } = await supabase
    .from("posts")
    .select("created_at, status")
    .gte("created_at", sixMonthsAgo.toISOString())
    .order("created_at");
  
  // Agrupar por mês
  const monthlyData = posts?.reduce((acc, post) => {
    const month = new Date(post.created_at).toLocaleDateString("pt-BR", { 
      month: "short", 
      year: "numeric" 
    });
    
    if (!acc[month]) {
      acc[month] = { month, Publicados: 0, Rascunhos: 0 };
    }
    
    if (post.status === "published") {
      acc[month].Publicados++;
    } else {
      acc[month].Rascunhos++;
    }
    
    return acc;
  }, {} as Record<string, any>);
  
  const chartData = Object.values(monthlyData || {});

  return (
    <Card>
      <Title>Posts por Mês</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartData}
        index="month"
        categories={["Publicados", "Rascunhos"]}
        colors={["green", "yellow"]}
      />
    </Card>
  );
}
```

## 2. Tabela Avançada com TanStack Table

```typescript
// app/admin/_components/tables/PostsTable.tsx
"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Search } from "lucide-react";

export function PostsTable({ posts }: { posts: Post[] }) {
  const [globalFilter, setGlobalFilter] = useState("");
  
  const columns = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge variant={status === "published" ? "default" : "secondary"}>
            {status === "published" ? "Publicado" : "Rascunho"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Criação
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        return new Date(row.getValue("created_at")).toLocaleDateString("pt-BR");
      },
    },
  ];
  
  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Buscar posts..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <span className="text-sm text-gray-600">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
```

## 3. Formulário com React Hook Form + Zod

```typescript
// app/admin/_components/forms/CategoryForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const categorySchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug deve conter apenas letras minúsculas, números e hífens"),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });
  
  // Auto-gerar slug baseado no nome
  const name = watch("name");
  useEffect(() => {
    if (name) {
      const slug = name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", slug);
    }
  }, [name, setValue]);
  
  const onSubmit = async (data: CategoryFormData) => {
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error("Erro ao criar categoria");
      
      toast.success("Categoria criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar categoria");
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Ex: Tecnologia"
        />
        {errors.name && (
          <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input
          id="slug"
          {...register("slug")}
          placeholder="Ex: tecnologia"
        />
        {errors.slug && (
          <p className="text-sm text-red-500 mt-1">{errors.slug.message}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Input
          id="description"
          {...register("description")}
          placeholder="Breve descrição da categoria"
        />
      </div>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Criar Categoria"}
      </Button>
    </form>
  );
}
```

## 4. Sistema de Notificações

```typescript
// app/admin/_components/notifications/NotificationCenter.tsx
"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "comment" | "post" | "system";
  message: string;
  read: boolean;
  created_at: string;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  useEffect(() => {
    // Buscar notificações iniciais
    fetchNotifications();
    
    // Configurar subscription para notificações em tempo real
    const channel = supabase
      .channel("admin-notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          setNotifications((prev) => [payload.new as Notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const fetchNotifications = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (data) {
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    }
  };
  
  const markAsRead = async (id: string) => {
    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", id);
    
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h3 className="font-semibold">Notificações</h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhuma notificação</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(notification.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## 5. Layout Moderno com Dark Mode

```typescript
// app/admin/layout.tsx
import { ThemeProvider } from "next-themes";
import { NotificationCenter } from "./_components/notifications/NotificationCenter";
import { UserMenu } from "./_components/layout/UserMenu";
import { Sidebar } from "./_components/layout/Sidebar";
import { ModeToggle } from "./_components/layout/ModeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar Moderna */}
        <Sidebar />
        
        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Admin Dashboard
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  <NotificationCenter />
                  <ModeToggle />
                  <UserMenu />
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
```

## 6. Implementação com Refine.dev

```typescript
// app/admin/providers.tsx
"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { dataProvider } from "@refinedev/supabase";
import routerProvider from "@refinedev/nextjs-router";
import { supabaseClient } from "@/app/lib/supabase/client";
import { authProvider } from "./_lib/authProvider";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <RefineKbarProvider>
      <Refine
        dataProvider={dataProvider(supabaseClient)}
        authProvider={authProvider}
        routerProvider={routerProvider}
        resources={[
          {
            name: "posts",
            list: "/admin/posts",
            create: "/admin/posts/create",
            edit: "/admin/posts/edit/:id",
            show: "/admin/posts/show/:id",
            meta: {
              canDelete: true,
              label: "Posts",
              icon: "📝",
            },
          },
          {
            name: "categories",
            list: "/admin/categories",
            create: "/admin/categories/create",
            edit: "/admin/categories/edit/:id",
            meta: {
              canDelete: true,
              label: "Categorias",
              icon: "📁",
            },
          },
          {
            name: "tags",
            list: "/admin/tags",
            create: "/admin/tags/create",
            edit: "/admin/tags/edit/:id",
            meta: {
              canDelete: true,
              label: "Tags",
              icon: "🏷️",
            },
          },
          {
            name: "comments",
            list: "/admin/comments",
            show: "/admin/comments/show/:id",
            meta: {
              canDelete: true,
              label: "Comentários",
              icon: "💬",
            },
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          projectId: "floriplanta-admin",
        }}
      >
        <RefineKbar />
        {children}
      </Refine>
    </RefineKbarProvider>
  );
}
```

## 7. Auth Provider para Refine

```typescript
// app/admin/_lib/authProvider.ts
import { AuthBindings } from "@refinedev/core";
import { supabaseClient } from "@/app/lib/supabase/client";

export const authProvider: AuthBindings = {
  login: async ({ email, password }) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: error.message,
        },
      };
    }

    if (data?.user) {
      return {
        success: true,
        redirectTo: "/admin",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Login failed",
      },
    };
  },
  
  logout: async () => {
    const { error } = await supabaseClient.auth.signOut();
    
    if (error) {
      return {
        success: false,
        error: {
          name: "LogoutError",
          message: error.message,
        },
      };
    }

    return {
      success: true,
      redirectTo: "/admin/login",
    };
  },
  
  check: async () => {
    const { data } = await supabaseClient.auth.getSession();
    
    if (data?.session) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        name: "Unauthorized",
        message: "Not authenticated",
      },
      logout: true,
      redirectTo: "/admin/login",
    };
  },
  
  getPermissions: async () => {
    const { data } = await supabaseClient.auth.getUser();
    
    if (data?.user) {
      // Aqui você pode buscar as permissões do usuário no banco
      return data.user.role || "admin";
    }
    
    return null;
  },
  
  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();
    
    if (data?.user) {
      return {
        id: data.user.id,
        name: data.user.user_metadata?.name || data.user.email,
        email: data.user.email,
        avatar: data.user.user_metadata?.avatar_url,
      };
    }
    
    return null;
  },
};
```

## 8. Hook Customizado para Analytics

```typescript
// app/admin/_hooks/useAnalytics.ts
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

interface Analytics {
  totalViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  topPosts: Array<{
    id: number;
    title: string;
    views: number;
  }>;
}

export function useAnalytics(timeRange: "day" | "week" | "month" = "week") {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);
  
  const fetchAnalytics = async () => {
    setLoading(true);
    
    // Calcular data de início baseada no timeRange
    const startDate = new Date();
    switch (timeRange) {
      case "day":
        startDate.setDate(startDate.getDate() - 1);
        break;
      case "week":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }
    
    // Buscar dados de analytics
    const { data: viewsData } = await supabase
      .from("page_views")
      .select("*")
      .gte("created_at", startDate.toISOString());
    
    // Processar dados...
    // Este é um exemplo simplificado
    
    setAnalytics({
      totalViews: viewsData?.length || 0,
      uniqueVisitors: 0, // Calcular baseado em IPs únicos
      avgTimeOnPage: 0, // Calcular média
      topPosts: [], // Buscar posts mais vistos
    });
    
    setLoading(false);
  };
  
  return { analytics, loading, refetch: fetchAnalytics };
}
```

## Conclusão

Estes exemplos demonstram implementações práticas das melhorias sugeridas. Cada componente pode ser adaptado às necessidades específicas do projeto Floriplanta, mantendo a consistência com a arquitetura existente baseada em Next.js e Supabase.