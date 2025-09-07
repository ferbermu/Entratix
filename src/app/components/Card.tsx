'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock } from '@phosphor-icons/react';

export interface CardProps {
  title: string;
  address?: string;
  date?: string;
  time?: string;
  imageUrl: string;
  isCarousel?: boolean;
  category?: string;
  location?: string;
  description?: string;
  price?: string;
  artists?: string[];
  attendees?: string | number;
}

export const Card = ({
  title,
  address = 'Unknown',
  date = 'Unknown',
  time = 'Unknown',
  imageUrl,
  isCarousel = false,
}: CardProps) => {
  return (
    <div
      className={`
        group relative w-[340px] h-[543px] rounded-2xl overflow-hidden bg-transparent hover:bg-gradient-to-b hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,20,147,0.4)] flex flex-col
        ${
          !isCarousel ? 'border-2 border-pink-500/40 hover:border-cyan-400' : ''
        }
      `}
    >
      <div className="relative h-[249px] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-6 text-white flex flex-col flex-1 relative z-10">
        <h3 className="text-2xl line-clamp-2 font-bold text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text group-hover:from-pink-200 group-hover:via-purple-200 group-hover:to-cyan-200 transition-all duration-300 pb-4">
          {title}
        </h3>

        <div className="flex flex-col gap-3 mb-8">
          {time && (
            <div className="flex items-center gap-3 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
              <Clock
                size={18}
                className="opacity-80 drop-shadow-[0_0_6px_rgba(0,255,255,0.4)] filter brightness-125 flex-shrink-0"
              />
              <span className="text-sm font-medium">{time}</span>
            </div>
          )}

          {address && (
            <div className="flex items-center gap-3 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
              <MapPin
                size={18}
                className="opacity-80 drop-shadow-[0_0_6px_rgba(0,255,255,0.4)] filter brightness-125 flex-shrink-0"
              />
              <span className="text-sm font-medium">{address}</span>
            </div>
          )}

          {date && (
            <div className="flex items-center gap-3 text-pink-300 group-hover:text-pink-200 transition-colors duration-300">
              <Calendar
                size={18}
                className="opacity-80 drop-shadow-[0_0_6px_rgba(255,20,147,0.4)] filter brightness-125 flex-shrink-0"
              />
              <span className="text-sm font-medium">{date}</span>
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Link
            href="/events"
            className="w-full px-4 py-3 bg-[#3BAFBB] hover:bg-[#3BAFBB] text-white rounded-lg transition-all duration-300 cursor-pointer font-semibold text-center block border-2 border-[#3BAFBB] hover:border-[#3BAFBB] shadow-[0_0_15px_rgba(59,175,187,0.4)] hover:shadow-[0_0_25px_rgba(59,175,187,0.6)] hover:drop-shadow-[0_0_10px_rgba(59,175,187,0.4)] relative overflow-hidden"
          >
            <span className="relative z-10">Buy Tickets</span>
            {/* Reduced neon glow effect */}
            <div className="absolute inset-0 bg-[#3BAFBB] opacity-0 hover:opacity-15 blur-sm transition-opacity duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3BAFBB] to-[#3BAFBB] opacity-0 hover:opacity-20 blur-md transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};
