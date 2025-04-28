// components/CarrouselImage.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Carousel } from './Carrousel';

export interface CarrouselImageProps {
  imageURLs: string[];
  interval?: number;
}

/**
 * Image-specific carousel with altura fija de 730px.
 */
export const CarrouselImage: React.FC<CarrouselImageProps> = ({
  imageURLs,
  interval,
}) => (
  <Carousel className="w-full h-[730px]" interval={interval}>
    {imageURLs.map((url, idx) => (
      <div key={idx} className="relative w-full h-full">
        <Image
          src={url}
          alt={`Carousel image ${idx + 1}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
    ))}
  </Carousel>
);
