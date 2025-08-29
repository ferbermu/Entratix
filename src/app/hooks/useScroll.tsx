'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface UseScrollOptions {
  threshold?: number;
}

export const useScroll = (options?: UseScrollOptions) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = pathname === '/' ? options?.threshold || 800 : 0;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, options?.threshold]);

  return isScrolled;
};
