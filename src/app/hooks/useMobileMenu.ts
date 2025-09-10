'use client';

import { useState, useEffect } from 'react';
import { useWindowWidth } from './useWindowWidth';

interface UseMobileMenuReturn {
  isMobileNavOpen: boolean;
  isMobileSearchOpen: boolean;
  isMobile: boolean;
  toggleMobileNav: () => void;
  toggleMobileSearch: () => void;
  closeMobileNav: () => void;
  closeMobileSearch: () => void;
  closeAll: () => void;
}

export const useMobileMenu = (): UseMobileMenuReturn => {
  const windowWidth = useWindowWidth();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const isMobile = windowWidth > 0 && windowWidth < 870;

  // Cerrar menús cuando la pantalla se hace más grande
  useEffect(() => {
    if (windowWidth >= 870) {
      setIsMobileNavOpen(false);
      setIsMobileSearchOpen(false);
    }
  }, [windowWidth]);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(prev => !prev);
    // Cerrar búsqueda si está abierta
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(prev => !prev);
    // Cerrar nav si está abierto
    if (isMobileNavOpen) setIsMobileNavOpen(false);
  };

  const closeMobileNav = () => setIsMobileNavOpen(false);
  const closeMobileSearch = () => setIsMobileSearchOpen(false);
  const closeAll = () => {
    setIsMobileNavOpen(false);
    setIsMobileSearchOpen(false);
  };

  return {
    isMobileNavOpen,
    isMobileSearchOpen,
    isMobile,
    toggleMobileNav,
    toggleMobileSearch,
    closeMobileNav,
    closeMobileSearch,
    closeAll,
  };
};
