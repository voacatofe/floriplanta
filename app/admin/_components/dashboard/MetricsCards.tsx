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

  const { count: totalCategories } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { count: totalTags } = await supabase
    .from("tags")
    .select("*", { count: "exact", head: true });

  const publishRate = totalPosts ? (publishedPosts! / totalPosts!) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      <Card decoration="top" decorationColor="blue">
        <Flex>
          <div>
            <Text>Total de Posts</Text>
            <Metric>{totalPosts || 0}</Metric>
          </div>
          <div className="text-4xl">📝</div>
        </Flex>
      </Card>

      <Card decoration="top" decorationColor="green">
        <div>
          <Text>Posts Publicados</Text>
          <Metric>{publishedPosts || 0}</Metric>
          <Flex className="mt-4">
            <Text className="truncate text-sm">{publishRate.toFixed(0)}% publicados</Text>
          </Flex>
          <ProgressBar value={publishRate} color="green" className="mt-2" />
        </div>
      </Card>

      <Card decoration="top" decorationColor="yellow">
        <Flex>
          <div>
            <Text>Rascunhos</Text>
            <Metric>{draftPosts || 0}</Metric>
          </div>
          <div className="text-4xl">📋</div>
        </Flex>
      </Card>

      <Card decoration="top" decorationColor="orange">
        <Flex>
          <div>
            <Text>Comentários Pendentes</Text>
            <Metric>{pendingComments || 0}</Metric>
          </div>
          <div className="text-4xl">💬</div>
        </Flex>
      </Card>

      <Card decoration="top" decorationColor="purple">
        <Flex>
          <div>
            <Text>Categorias</Text>
            <Metric>{totalCategories || 0}</Metric>
          </div>
          <div className="text-4xl">📁</div>
        </Flex>
      </Card>

      <Card decoration="top" decorationColor="pink">
        <Flex>
          <div>
            <Text>Tags</Text>
            <Metric>{totalTags || 0}</Metric>
          </div>
          <div className="text-4xl">🏷️</div>
        </Flex>
      </Card>
    </div>
  );
}