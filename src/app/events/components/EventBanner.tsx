// components/EventBanner.tsx
'use client';
import React from 'react';
import { Carousel } from '@/components/Carrousel';
import Image from 'next/image';

const imageURLsFromDataBase: string[] = [
  '/assets/show1.jpg',
  '/assets/show2.jpg',
  '/assets/show3.jpg',
  '/assets/show4.jpg',
];

/**
 * Banner de eventos con altura de 400px.
 */
export const EventBanner: React.FC = () => {
  return (
    <div className="w-full h-[400px]">
      <Carousel className="h-full" interval={5000}>
        {imageURLsFromDataBase.map((url, idx) => (
          <div key={idx} className="relative w-full h-full">
            <Image
              src={url}
              alt={`Event banner image ${idx + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
