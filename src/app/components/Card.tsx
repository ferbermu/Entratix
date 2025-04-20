import React from 'react';
import Image from 'next/image';

export interface CardProps {
  title: string;
  address: string;
  date: string;
  imageUrl: string;
  addressIcon: string;
  dateIcon: string;
}

export const Card = ({
  title,
  address,
  date,
  imageUrl,
  addressIcon,
  dateIcon,
}: CardProps) => {
  return (
    <div className="group relative w-[389px] h-[576px] rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#3BAFBB] bg-[#1C1A1A] cursor-pointer transition-colors duration-300">
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

      <div className="p-6 text-white flex flex-col">
        <h3 className="text-3xl font-semibold mt-6 mb-6">{title}</h3>

        <div className="flex items-center gap-2 text-md text-gray-300 mb-6">
          <Image
            src={addressIcon}
            alt="Location icon"
            width={16}
            height={16}
            className="opacity-75"
          />
          <span className="text-xs">{address}</span>
        </div>

        <div className="flex items-center gap-2 text-md text-gray-300 mb-6">
          <Image
            src={dateIcon}
            alt="Calendar icon"
            width={16}
            height={16}
            className="opacity-75"
          />
          <span className="text-xs">{date}</span>
        </div>

        <button className="w-full mt-6 px-4 py-3 bg-[#4E4B4B] text-white rounded-lg transition-colors duration-300 group-hover:bg-[#3BAFBB]">
          Buy Tickets
        </button>
      </div>
    </div>
  );
};
