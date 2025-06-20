'use client';

import { useEffect } from 'react';
import { initializeGTM } from '@/app/lib/gtm';

export default function GTMInitializer() {
  useEffect(() => {
    initializeGTM();
  }, []);

  return null;
} 