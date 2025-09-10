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
    <div className="w-full h-full max-[1280px]:h-[400px] relative">
      <Carousel
        className="h-full rounded-lg border-2 border-pink-500/30 shadow-2xl shadow-pink-500/20 hover:shadow-[0_0_50px_rgba(255,20,147,0.4)] transition-all duration-300 overflow-hidden"
        interval={5000}
      >
        {imageURLsFromDataBase.map((url, idx) => (
          <div key={idx} className="relative w-full h-full">
            <Image
              src={url}
              alt={`Event banner image ${idx + 1}`}
              fill
              className="object-cover rounded-lg"
              priority
              sizes="100vw"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
