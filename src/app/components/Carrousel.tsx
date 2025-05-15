'use client';

import { useCarousel } from '@/hooks/useCarrousel';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import React from 'react';

export interface CarouselProps {
  children: React.ReactNode[];
  interval?: number;
  className?: string;
}

/**
 * Generic Carousel component. Renders children with fade transitions.
 */
export const Carousel: React.FC<CarouselProps> = ({
  children,
  interval = 5000,
  className = '',
}) => {
  const total = React.Children.count(children);
  const { page, next, prev } = useCarousel(total, interval);

  return (
    <div className={`relative  overflow-hidden ${className}`}>
      {React.Children.map(children, (child, idx) => (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === page ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {child}
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-40 p-2 rounded-full  hover:bg-opacity-60 cursor-pointer"
      >
        <CaretLeft size={32} weight="bold" color="white" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 transform -translate-y-1/2  bg-opacity-40 p-2 rounded-full  hover:bg-opacity-60 cursor-pointer"
      >
        <CaretRight size={32} weight="bold" color="white" />
      </button>
    </div>
  );
};
