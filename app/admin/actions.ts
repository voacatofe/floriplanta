'use server';

import { createSupabaseServerClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Erro ao fazer logout:', error.message);
    // Considerar retornar um objeto de erro se precisar tratar no cliente,
    // mas para logout, geralmente um redirecionamento é suficiente.
    // return { error: "Falha ao sair." };
  }

  // Revalidar paths para limpar a sessão no lado do cliente e servidor.
  revalidatePath('/admin', 'layout');
  revalidatePath('/', 'layout'); // Revalidar o layout raiz também
  
  // Redirecionar para a página de login do admin.
  // O middleware também pegaria isso na próxima requisição, mas o redirect aqui é mais imediato.
  redirect('/admin/login');
} 