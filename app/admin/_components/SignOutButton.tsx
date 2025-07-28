'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
  return (
    <Button 
      variant="ghost" 
      className="w-full justify-start text-left hover:bg-red-700 dark:hover:bg-red-900 hover:text-white dark:hover:text-white"
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
    >
      <LogOut size={18} className="mr-3" />
      <span>Sair</span>
    </Button>
  );
} 