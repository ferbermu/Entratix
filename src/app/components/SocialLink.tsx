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
    <Link href={url} className="text-gray-400 hover:text-white">
      <span className="sr-only">{alt}</span>
      <Image
        src={icon}
        alt={alt}
        width={width}
        height={height}
        className="w-6 h-6"
      />
    </Link>
  );
};
