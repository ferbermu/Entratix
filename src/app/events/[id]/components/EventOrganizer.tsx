import React from 'react';
import Image from 'next/image';

interface EventOrganizerProps {
  name: string;
  email?: string | null;
  phone?: string | null;
  logo?: string | null;
}

export const EventOrganizer: React.FC<EventOrganizerProps> = ({
  name,
  email,
  phone,
  logo,
}) => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg p-6 gap-4 w-full shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300">
      <h3 className="text-2xl font-condensed font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text drop-shadow-[0_0_10px_rgba(255,20,147,0.6)]">
        Organizer
      </h3>

      <div className="flex items-center gap-4">
        {logo && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={logo}
              alt={`${name}'s logo`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-cyan-300 text-lg font-condensed drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
            {name}
          </span>
          {email && (
            <span className="text-gray-400 text-sm">{email}</span>
          )}
          {phone && (
            <span className="text-gray-400 text-sm">{phone}</span>
          )}
        </div>
      </div>
    </div>
  );
};

