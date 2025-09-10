import React, { useState } from 'react';
import Image from 'next/image';

export interface EventOrganizerProps {
  name: string;
  description: string;
  avatarUrl: string;
}

export const EventOrganizer = ({
  name,
  description,
  avatarUrl,
}: EventOrganizerProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg p-6 gap-4 w-full shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300">
      <h3 className="text-2xl font-condensed font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text drop-shadow-[0_0_10px_rgba(255,20,147,0.6)]">
        Organizer
      </h3>

      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-cyan-300 text-lg font-condensed drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
          {name}
        </span>
      </div>

      <p
        className={`
          text-start text-md text-gray-300
          transition-all duration-200 opacity-90 
          ${!expanded ? 'line-clamp-3' : ''}
        `}
      >
        {description}
      </p>
      <button
        onClick={() => setExpanded(prev => !prev)}
        className="underline cursor-pointer w-full text-end text-cyan-400 hover:text-pink-500 transition-colors duration-300 font-condensed drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] hover:drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]"
      >
        {expanded ? 'Leer menos' : 'Leer más'}
      </button>
    </div>
  );
};
