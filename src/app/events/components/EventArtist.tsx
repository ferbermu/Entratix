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
    <div className="w-full flex flex-col py-6">
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
            <span className="text-md text-white max-[400px]:text-center">
              {name}
            </span>
            <span className="text-xs text-gray-200 max-[400px]:text-center">
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
              className="text-gray-300 hover:text-white"
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
