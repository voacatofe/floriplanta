'use client';

import { CategoryForm } from '@/app/admin/_components/forms/CategoryForm';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewCategoryPage() {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Nova Categoria</h1>
      <CategoryForm onSuccess={() => {
        toast.success('Categoria criada!');
        router.push('/admin/categories');
      }} />
    </div>
  );
}