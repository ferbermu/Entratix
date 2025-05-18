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
    <div className="flex flex-col bg-[#4E4B4B]/20 border border-[#4E4B4B]/80 rounded-lg p-6 gap-4 w-full">
      <h3 className="text-xl  font-semibold text-white">Organizer</h3>

      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            fill
            className="object-cover"
          />
        </div>
        <span className="text-white text-lg">{name}</span>
      </div>

      <p
        className={`
          text-start text-md text-white
          transition-all duration-200 opacity-75 
          ${!expanded ? 'line-clamp-3' : ''}
        `}
      >
        {description}
      </p>
      <button
        onClick={() => setExpanded(prev => !prev)}
        className=" underline cursor-pointer  w-full text-end text-[#3BAFBB]"
      >
        {expanded ? 'Leer menos' : 'Leer más'}
      </button>
    </div>
  );
};
