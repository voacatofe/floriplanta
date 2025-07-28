import Link from 'next/link';
import { getPosts, type PostWithRelations } from '@/app/lib/blog-data'; // Atualizado para getPosts
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge'; // Para exibir o status
import { PlusCircle, Edit, Eye } from 'lucide-react';
import DeletePostButton from '@/components/admin/DeletePostButton';
import { POSTS_PER_PAGE } from '@/app/lib/constants';

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
  searchParams: Promise<{
    page?: string;
    // Adicione outros searchParams esperados aqui, se houver
  }>;
}

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
  const resolvedSearchParams = await searchParams; // Aguardar a Promise
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const { posts, totalCount } = await getPosts({ 
    page: currentPage, 
    published: 'all', // Buscar todos os posts (publicados e não publicados) para o admin
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
                {posts.map((post: PostWithRelations) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.author?.name || 'N/A'}</TableCell>
                    <TableCell>{post.categories?.[0]?.name || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={post.published ? 'default' : 'secondary'}
                        className={
                          post.published ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }
                      >
                        {post.published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(post.published ? post.createdAt.toISOString() : post.updatedAt.toISOString())}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="sm" asChild title="Ver Post"><Link href={`/blog/${post.slug}`} target="_blank"><Eye className="h-4 w-4" /></Link></Button>
                      <Button variant="ghost" size="sm" asChild title="Editar Post"><Link href={`/admin/posts/${post.id}`}><Edit className="h-4 w-4" /></Link></Button>
                      <DeletePostButton postId={post.id} postTitle={post.title} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Paginação */}
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