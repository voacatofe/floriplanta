'use client';

import { useEffect } from 'react';
import { suppressHydrationWarning } from '@/app/lib/suppress-hydration-warning';

export default function HydrationWarningSupressor() {
  useEffect(() => {
    suppressHydrationWarning();
  }, []);

  return null;
} 