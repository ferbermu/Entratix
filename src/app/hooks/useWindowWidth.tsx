'use client';

import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar el ancho de la ventana
 * Se actualiza automáticamente cuando la ventana se redimensiona
 * @returns windowWidth - El ancho actual de la ventana en píxeles
 */
export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Inicializar el ancho
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth;
};

/**
 * Función utilitaria para calcular el número de cards basado en el ancho de la ventana
 * Usa los mismos breakpoints que el grid responsive de la página principal
 * @param windowWidth - El ancho actual de la ventana
 * @param defaultCards - Número de cards por defecto para pantallas grandes
 * @returns Número de cards que deben mostrarse
 */
export const getCardsToShow = (windowWidth: number, defaultCards: number) => {
  if (windowWidth <= 700) return 1; // Mobile
  if (windowWidth <= 1075) return 2; // Tablet
  if (windowWidth <= 1400) return 3; // Laptop
  return defaultCards; // Desktop
};
