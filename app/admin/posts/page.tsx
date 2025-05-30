import Link from 'next/link';
import { getPosts, type Post } from '@/app/lib/blog-data'; // Atualizado para getPosts
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'; // Para exibir o status
import { PlusCircle, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const POSTS_PER_PAGE = 10; // Definir aqui também para consistência com blog-data.ts

// Função para formatar data (pode ser movida para utils se usada em mais lugares)
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface AdminPostsPageProps {
  searchParams?: {
    page?: string;
  };
}

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const { posts, totalCount } = await getPosts({ 
    page: currentPage, 
    status: 'all' // Buscar todos os status para o admin
  });

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gerenciar Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/novo">
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Post
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Nenhum post encontrado.</p>
        ) : (
          <>
            <Table>
              <TableCaption>Exibindo {posts.length} de {totalCount} posts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[35%]">Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead> {/* Alterado de "Publicado em" para "Data" */}
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post: Post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.profiles?.display_name || 'N/A'}</TableCell>
                    <TableCell>{post.categories?.[0]?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={post.status === 'published' ? 'default' : (post.status === 'draft' ? 'secondary' : 'outline')}
                        className={
                          post.status === 'published' ? 'bg-green-100 text-green-700' :
                          post.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700' // Para outros status como 'archived'
                        }
                      >
                        {post.status === 'published' ? 'Publicado' : 
                         post.status === 'draft' ? 'Rascunho' : 
                         post.status}
                      </Badge>
                    </TableCell>
                    {/* Usar updated_at ou created_at para rascunhos e published_at para publicados */}
                    <TableCell>{formatDate(post.status === 'published' ? post.published_at : post.updated_at || post.created_at)}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm" asChild title="Ver Post">
                        <Link href={`/blog/${post.slug}`} target="_blank"><Eye className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild title="Editar Post">
                        <Link href={`/admin/posts/editar/${post.id}`}><Edit className="h-4 w-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="sm" title="Excluir Post" className="text-red-500 hover:text-red-700">
                        {/* TODO: Implementar exclusão com confirmação */}
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Paginação */}เจน
            {totalPages > 1 && (
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  asChild
                >
                  <Link href={`/admin/posts?page=${currentPage - 1}`}>Anterior</Link>
                </Button>
                <span className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  asChild
                >
                  <Link href={`/admin/posts?page=${currentPage + 1}`}>Próxima</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 