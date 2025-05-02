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
    <div className="bg-[#4E4B4B]/20 w-full flex flex-col border border-[#4E4B4B] rounded-lg">
      <div className="flex justify-between items-center p-6">
        <div className="flex gap-4 items-center">
          <Image
            className="w-12 h-12 rounded-full object-cover"
            src={photo}
            alt={name}
            width={48}
            height={48}
          />
          <div className="flex flex-col gap">
            <span className="text-md text-start text-white">{name}</span>
            <span className="text-xs text-start text-gray-200">
              {description}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          {artistSocialLinks.map((socialLink, key) => (
            <Link
              key={key}
              href={socialLink.url}
              className="text-gray-300 hover:text-white"
            >
              <Image
                src={socialLink.icon}
                alt="Social Media Icon"
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
