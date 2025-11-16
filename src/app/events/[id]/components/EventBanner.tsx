'use client';
import React from 'react';
import { Carrousel } from '../../../components/Carrousel';
import Image from 'next/image';

interface EventBannerProps {
  urls: string[];
}

export const EventBanner: React.FC<EventBannerProps> = ({ urls }) => {
  const bannerUrls = urls && urls.length > 0 ? urls : ['/assets/party.png'];

  return (
    <div className="w-full h-full max-[1280px]:h-[400px] relative">
      <Carrousel
        className="h-full rounded-lg border-2 border-pink-500/30 shadow-2xl shadow-pink-500/20 hover:shadow-[0_0_50px_rgba(255,20,147,0.4)] transition-all duration-300 overflow-hidden"
        interval={5000}
      >
        {bannerUrls.map((url, idx) => (
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
      </Carrousel>
    </div>
  );
};

