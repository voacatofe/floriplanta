import { Card, Title, Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Badge, Text } from "@tremor/react";
import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import { Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function RecentPosts() {
  const supabase = await createSupabaseServerClient();

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      id,
      title,
      slug,
      status,
      created_at,
      profiles!inner(display_name),
      categories:post_categories(
        category:categories(name)
      )
    `)
    .order("created_at", { ascending: false })
    .limit(5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title>Posts Recentes</Title>
        <Link href="/admin/posts">
          <Button variant="outline" size="sm">
            Ver todos
          </Button>
        </Link>
      </div>
      
      {posts && posts.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Título</TableHeaderCell>
              <TableHeaderCell>Autor</TableHeaderCell>
              <TableHeaderCell>Categoria</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Data</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <Text className="font-medium truncate max-w-xs">
                    {post.title}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>{post.profiles?.display_name || "N/A"}</Text>
                </TableCell>
                <TableCell>
                  <Text>{post.categories?.[0]?.category?.name || "N/A"}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    color={post.status === "published" ? "green" : "yellow"}
                    size="xs"
                  >
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text>{formatDate(post.created_at)}</Text>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/posts/editar/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Text className="text-center py-8 text-gray-500">
          Nenhum post encontrado
        </Text>
      )}
    </Card>
  );
}