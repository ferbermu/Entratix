'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CardProps {
  title: string;
  address?: string;
  date?: string;
  imageUrl: string;
  addressIcon?: string;
  dateIcon?: string;
  isCarousel?: boolean;
  category?: string;
  time?: string;
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
  imageUrl,
  addressIcon,
  dateIcon,
  isCarousel = false,
}: CardProps) => {
  return (
    <Link
      href="/events"
      className={`
        group relative w-[340px] h-[543px] rounded-2xl overflow-hidden bg-transparent hover:bg-gradient-to-b hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 cursor-pointer transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,20,147,0.4)]
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

        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 gap-6 text-white flex flex-col h-full relative z-10">
        <h3 className="text-3xl line-clamp-2 h-20 font-bold text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text group-hover:from-pink-200 group-hover:via-purple-200 group-hover:to-cyan-200 transition-all duration-300">
          {title}
        </h3>

        {addressIcon && (
          <div className="flex items-center gap-2 text-md text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300">
            <Image
              src={addressIcon}
              alt="Location icon"
              width={16}
              height={16}
              className="opacity-75 drop-shadow-[0_0_6px_rgba(0,255,255,0.4)] filter brightness-125"
            />
            <span className="text-xs font-medium">{address}</span>
          </div>
        )}

        {dateIcon && (
          <div className="flex items-center gap-2 text-md text-pink-300 group-hover:text-pink-200 transition-colors duration-300">
            <Image
              src={dateIcon}
              alt="Calendar icon"
              width={16}
              height={16}
              className="opacity-75 drop-shadow-[0_0_6px_rgba(255,20,147,0.4)] filter brightness-125"
            />
            <span className="text-xs font-medium">{date}</span>
          </div>
        )}

        <button className="mt-2 w-full px-3 py-3 bg-[#3BAFBB] hover:bg-[#3BAFBB] text-white rounded-lg transition-all duration-300 cursor-pointer font-semibold border-2 border-[#3BAFBB] hover:border-[#3BAFBB] shadow-[0_0_20px_rgba(59,175,187,0.6)] hover:shadow-[0_0_30px_rgba(59,175,187,1.0)] hover:drop-shadow-[0_0_15px_rgba(59,175,187,0.8)] relative overflow-hidden">
          <span className="relative z-10">Buy Tickets</span>
          {/* Intense neon glow effect */}
          <div className="absolute inset-0 bg-[#3BAFBB] opacity-0 hover:opacity-20 blur-sm transition-opacity duration-300"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-[#3BAFBB] to-[#3BAFBB] opacity-0 hover:opacity-30 blur-md transition-opacity duration-300"></div>
        </button>
      </div>
    </Link>
  );
};
