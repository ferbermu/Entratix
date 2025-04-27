'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export interface CarrouselImageProps {
  imageURLs: string[];
  interval?: number;
}

export const CarrouselImage: React.FC<CarrouselImageProps> = ({
  imageURLs,
  interval = 5000,
}) => {
  const [page, setPage] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const total = imageURLs.length;

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setPage(prev => (prev + 1) % total);
    }, interval);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [interval, total]);

  const handleNext = () => {
    setPage(prev => (prev + 1) % total);
    startAutoplay();
  };

  const handlePrev = () => {
    setPage(prev => (prev - 1 + total) % total);
    startAutoplay();
  };

  return (
    <div className="relative w-full h-[730px] overflow-hidden">
      {imageURLs.map((url, idx) => (
        <Image
          key={idx}
          src={url}
          alt={`Carousel image ${idx + 1}`}
          fill
          className={`object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === page ? 'opacity-100' : 'opacity-0'
          }`}
          priority
          sizes="100vw"
        />
      ))}

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-opacity-40 p-2 rounded-full shadow hover:bg-opacity-60 cursor-pointer"
      >
        <CaretLeft size={32} weight="bold" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-opacity-40 p-2 rounded-full shadow hover:bg-opacity-60 cursor-pointer"
      >
        <CaretRight size={32} weight="bold" />
      </button>
    </div>
  );
};
