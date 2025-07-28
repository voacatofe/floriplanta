'use client';

import { usePathname } from 'next/navigation';
import FloatingPillMenu from './FloatingPillMenu';

export default function ConditionalMenu() {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  // Não renderizar o menu se for rota de admin
  if (isAdminRoute) {
    return null;
  }

  return <FloatingPillMenu />;
} 