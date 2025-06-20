'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGTM } from '@/hooks/useGTM';

interface PageTrackerProps {
  pageName: string;
  pageCategory?: string;
}

export default function PageTracker({ pageName, pageCategory }: PageTrackerProps) {
  const pathname = usePathname();
  const { trackPageView } = useGTM();

  useEffect(() => {
    trackPageView(pageName, pageCategory);
  }, [pathname, pageName, pageCategory, trackPageView]);

  return null;
} 