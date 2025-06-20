"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useGTM from '@/hooks/useGTM';

interface PageTrackerProps {
  title?: string;
  category?: string;
  subcategory?: string;
}

const PageTracker: React.FC<PageTrackerProps> = ({ 
  title, 
  category, 
  subcategory 
}) => {
  const pathname = usePathname();
  const { trackPageView } = useGTM();

  useEffect(() => {
    // Rastrear visualização da página quando o pathname mudar
    if (typeof window !== 'undefined') {
      const pageData = {
        page_title: title || document.title,
        page_location: window.location.href,
        page_path: pathname,
        content_group1: category,
        content_group2: subcategory,
      };

      trackPageView(pageData);
    }
  }, [pathname, title, category, subcategory, trackPageView]);

  return null; // Componente não renderiza nada visualmente
};

export default PageTracker; 