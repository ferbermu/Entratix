'use client';
import React, { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Hook that provides carousel state and controls.
 * @param total Number of items
 * @param intervalMs Autoplay interval in ms
 */
export function useCarousel(total: number, intervalMs: number = 5000) {
  const [page, setPage] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setPage(p => (p + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setPage(p => (p - 1 + total) % total);
  }, [total]);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(next, intervalMs);
  }, [intervalMs, next]);

  useEffect(() => {
    reset();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reset]);

  // Controls auto-reset after manual change
  const manualNext = () => {
    next();
    reset();
  };

  const manualPrev = () => {
    prev();
    reset();
  };

  return { page, next: manualNext, prev: manualPrev };
}
