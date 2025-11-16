import Image from 'next/image';
import React from 'react';

interface EventArtistProps {
  photo: string;
  name: string;
}

export const EventArtist: React.FC<EventArtistProps> = ({ photo, name }) => {
  return (
    <div className="w-full flex flex-col p-6 bg-gradient-to-r from-gray-900/20 via-black/30 to-gray-800/20 rounded-lg hover:from-gray-900/30 hover:via-black/40 hover:to-gray-800/30 transition-all duration-300">
      <div className="flex gap-4 items-center">
        <Image
          className="w-12 h-12 rounded-full object-cover"
          src={photo}
          alt={name}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <span className="text-lg font-condensed text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text drop-shadow-[0_0_8px_rgba(255,20,147,0.5)]">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

