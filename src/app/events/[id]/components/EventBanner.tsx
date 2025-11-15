// components/EventBanner.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { Carousel } from '@/components/Carrousel';

export interface EventBannerProps {
  bannerImageUrls?: string[];
}

/**
 * Banner de eventos con altura de 400px.
 */
export const EventBanner: React.FC<EventBannerProps> = ({ bannerImageUrls }) => {
  const defaultImages = ['/assets/show1.jpg'];
  const images = bannerImageUrls && bannerImageUrls.length > 0 ? bannerImageUrls : defaultImages;
  
  // Si solo hay una imagen, mostrarla directamente
  if (images.length === 1) {
    return (
      <div className="w-full h-full max-[1280px]:h-[400px]">
        <div className="relative w-full h-full">
          <Image
            src={images[0]}
            alt="Event banner"
            fill
            className="object-cover rounded-lg"
            priority
            sizes="100vw"
          />
        </div>
      </div>
    );
  }
  
  // Si hay múltiples imágenes, usar carrusel
  return (
    <div className="w-full h-full max-[1280px]:h-[400px]">
      <Carousel className="h-full" interval={5000}>
        {images.map((url, idx) => (
          <div key={idx} className="relative w-full h-full">
            <Image
              src={url}
              alt={`Event banner image ${idx + 1}`}
              fill
              className="object-cover rounded-lg"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
