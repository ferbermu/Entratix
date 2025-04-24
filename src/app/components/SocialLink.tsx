import Link from 'next/link';
import Image from 'next/image';

export interface SocialLinkProps {
  url: string;
  icon: string;
  alt: string;
  width: number;
  height: number;
}

export const SocialLink = ({
  url,
  icon,
  alt,
  width,
  height,
}: SocialLinkProps) => {
  return (
    <Link
      href={url}
      className="text-gray-400 hover:text-white p-2.5 rounded-full border"
    >
      <span className="sr-only">{alt}</span>
      <Image
        src={icon}
        alt={alt}
        width={width}
        height={height}
        className="w-5 h-5"
      />
    </Link>
  );
};
