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
      // Para la página principal, usar el threshold proporcionado o 800 por defecto
      // Para otras páginas, mantener el comportamiento actual (threshold 0)
      const scrollThreshold = pathname === '/' ? options?.threshold || 800 : 0;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, options?.threshold]);

  return isScrolled;
};
