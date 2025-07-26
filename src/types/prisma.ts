import { Prisma } from '@prisma/client';

// Tipo para evento con todas las relaciones incluidas
export type EventWithRelations = Prisma.EventsGetPayload<{
  include: {
    producer: true;
    artists: { include: { artist: true } };
    tags: { include: { tag: true } };
    ticketTypes: true;
  };
}>;

// Tipo para artista con eventos
export type ArtistWithEvents = Prisma.ArtistGetPayload<{
  include: {
    events: { include: { event: true } };
  };
}>;

// Tipo para productor con eventos
export type ProducerWithEvents = Prisma.ProducerGetPayload<{
  include: {
    events: true;
  };
}>;

// Tipo para el objeto socialLink
export interface SocialLink {
  url: string;
  icon: string;
}

/**
 * Función para determinar el icono basándose en la URL
 * @param url - URL de la red social
 * @returns Ruta del icono SVG correspondiente
 * 
 * @example
 * getSocialIcon('https://youtube.com/artist') // '/assets/icons/social-media/YoutubeIcon.svg'
 * getSocialIcon('https://spotify.com/artist') // '/assets/icons/social-media/SpotifyIcon.svg'
 * getSocialIcon('https://soundcloud.com/artist') // '/assets/icons/social-media/SoundcloudIcon.svg'
 */
export function getSocialIcon(url: string): string {
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('soundcloud')) {
    return '/assets/icons/social-media/SoundcloudIcon.svg';
  }
  if (lowerUrl.includes('spotify')) {
    return '/assets/icons/social-media/SpotifyIcon.svg';
  }
  if (lowerUrl.includes('youtube')) {
    return '/assets/icons/social-media/YoutubeIcon.svg';
  }
  
  // Para cualquier otra URL, no mostrar icono
  return '';
}

/**
 * Función para convertir un array de URLs a un array de SocialLink
 * @param urls - Array de URLs de redes sociales
 * @returns Array de objetos SocialLink con URL e icono
 * 
 * @example
 * const urls = ['https://youtube.com/artist', 'https://spotify.com/artist'];
 * convertUrlsToSocialLinks(urls);
 * // Resultado:
 * // [
 * //   { url: 'https://youtube.com/artist', icon: '/assets/icons/social-media/YoutubeIcon.svg' },
 * //   { url: 'https://spotify.com/artist', icon: '/assets/icons/social-media/SpotifyIcon.svg' }
 * // ]
 */
export function convertUrlsToSocialLinks(urls: string[]): SocialLink[] {
  return urls.map(url => ({
    url: url,
    icon: getSocialIcon(url)
  }));
} 