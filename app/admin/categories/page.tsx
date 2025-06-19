import { createSupabaseServerClient } from '@/app/lib/supabase/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { deleteCategoryAction } from './actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { revalidatePath } from 'next/cache';

export default async function CategoriesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false });

  async function handleDelete(id: number) {
    'use server';
    await deleteCategoryAction(id);
    revalidatePath('/admin/categories');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Categorias</h1>
        <Button asChild>
          <Link href="/admin/categories/novo">
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Categoria
          </Link>
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        {categories && categories.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat: any) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.slug}</TableCell>
                  <TableCell>{cat.description || '-'}</TableCell>
                  <TableCell className="text-right">
                    <form action={async () => await handleDelete(cat.id)}>
                      <Button variant="ghost" size="sm" type="submit" title="Excluir">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-gray-500 py-8">Nenhuma categoria encontrada.</p>
        )}
      </div>
    </div>
  );
}