import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface EventArtistProps {
  photo: string;
  name: string;
  description: string;
  artistSocialLinks: ArtistSocialLinks[];
}

export interface ArtistSocialLinks {
  url: string;
  icon: string;
}

export const EventArtist = ({
  photo,
  name,
  description,
  artistSocialLinks,
}: EventArtistProps) => {
  return (
    <div className="w-full flex flex-col py-6 bg-gradient-to-r from-gray-900/20 via-black/30 to-gray-800/20 rounded-lg hover:from-gray-900/30 hover:via-black/40 hover:to-gray-800/30 transition-all duration-300">
      {/* Contenedor principal */}
      <div className="flex justify-between items-center max-[400px]:flex-col max-[400px]:items-center gap-2">
        {/* Foto + Nombre + Descripción */}
        <div className="flex gap-4 items-center max-[400px]:flex-col">
          <Image
            className="w-12 h-12 rounded-full object-cover"
            src={photo}
            alt={name}
            width={48}
            height={48}
          />
          <div className="flex flex-col max-[400px]:items-center">
            <span className="text-lg font-condensed text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text drop-shadow-[0_0_8px_rgba(255,20,147,0.5)] max-[400px]:text-center">
              {name}
            </span>
            <span className="text-sm text-cyan-300/80 max-[400px]:text-center drop-shadow-[0_0_5px_rgba(0,255,255,0.3)]">
              {description}
            </span>
          </div>
        </div>

        {/* Links Sociales */}
        <div className="flex gap-4 max-[400px]:mt-2 max-[400px]:justify-center max-[400px]:w-full">
          {artistSocialLinks.map((socialLink, key) => (
            <Link
              key={key}
              href={socialLink.url}
              className="text-gray-300 hover:text-pink-500 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,20,147,0.6)]"
            >
              <Image
                src={socialLink.icon}
                alt="Social Media Icon"
                width={42}
                height={42}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
