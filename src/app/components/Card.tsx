import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface CardProps {
  id: number;
  title: string;
  address: string;
  date: string;
  imageUrl: string;
  addressIcon: string;
  dateIcon: string;
  isCarousel?: boolean;
}

export const Card = ({
  id,
  title,
  address,
  date,
  imageUrl,
  addressIcon,
  dateIcon,
  isCarousel = false,
}: CardProps) => {
  return (
    <Link
      href={`/events/${id}`}
      className={`
        group relative w-[340px] h-[543px] rounded-2xl overflow-hidden bg-[#1C1A1A] cursor-pointer transition-colors duration-300
        ${!isCarousel ? 'border-2 border-[#4E4B4B] hover:border-[#3BAFBB]' : ''}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      <div className="uppercase p-6 gap-6 text-white flex flex-col h-70 justify-between">
        <h3 className="text-3xl h-20  truncate-2">{title}</h3>
        <div className="gap-6 flex flex-col text-md">
          <div className="flex items-center gap-2  text-gray-300">
            <Image
              src={addressIcon}
              alt="Location icon"
              width={16}
              height={16}
              className="opacity-75"
            />
            <span className="text-xs">{address}</span>
          </div>

          <div className="flex items-center gap-2 text-md text-gray-300 ">
            <Image
              src={dateIcon}
              alt="Calendar icon"
              width={16}
              height={16}
              className="opacity-75"
            />
            <span className="text-xs">{date}</span>
          </div>
        </div>

        <button className="mt-2 w-full px-3 py-3 bg-[#4E4B4B] text-white rounded-lg transition-colors duration-300 group-hover:bg-[#3BAFBB] cursor-pointer">
          Buy Tickets
        </button>
      </div>
    </Link>
  );
};
