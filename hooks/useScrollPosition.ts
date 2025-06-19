import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      
      setScrollPosition(currentScrollY);
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    
    // Call it once to set initial state
    updateScrollPosition();

    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return { scrollPosition, isScrolled, scrollDirection };
} 