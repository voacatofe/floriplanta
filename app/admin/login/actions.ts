'use server';

import { createSupabaseServerClient } from '@/app/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = await createSupabaseServerClient();

  if (!email || !password) {
    return { error: 'Email e senha são obrigatórios.' };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro de login:', error.message);
    // Para não expor detalhes do erro ao cliente, usamos uma mensagem genérica
    // Em um cenário real, você pode querer mapear certos erros para mensagens específicas
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Credenciais inválidas. Verifique seu email e senha.' };
    }
    return { error: 'Ocorreu um erro ao tentar fazer login. Tente novamente.' };
  }

  // Revalidar o path para garantir que o estado da sessão seja atualizado no cliente
  // e o middleware possa redirecionar corretamente.
  revalidatePath('/admin', 'layout');
  revalidatePath('/admin/login', 'page');
  
  // O redirecionamento após o login bem-sucedido será tratado pelo middleware
  // devido à revalidação e à nova verificação da sessão.
  // No entanto, podemos adicionar um redirecionamento explícito aqui como fallback,
  // ou se quisermos garantir o redirecionamento imediato pela action.
  redirect('/admin'); 
} 