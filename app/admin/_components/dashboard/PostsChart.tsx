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
      year: "numeric",
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
        showLegend={true}
        showGridLines={true}
        showAnimation={true}
      />
    </Card>
  );
}