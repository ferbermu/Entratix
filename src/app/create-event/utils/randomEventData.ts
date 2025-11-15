import type { TicketForm, ArtistForm } from '@/store/slices/eventFormSlice';

const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const EVENT_TITLES = [
  'Night Pulse',
  'Warehouse Vibes',
  'Sunset Groove',
  'Midnight Echoes',
  'Bassline City',
];

const EVENT_CATEGORIES = [
  'Techno',
  'House',
  'Drum & Bass',
  'Trance',
  'Indie Dance',
];

const STREETS = [
  'Av. Diagonal 123',
  'C/ Gran Vía 45',
  'Passeig de Gràcia 12',
  'C/ Alcalá 200',
  'Av. Libertador 78',
];

const CITIES = ['Barcelona', 'Madrid', 'Valencia', 'Sevilla', 'Lisboa'];

const SAMPLE_TAGS = ['melodic techno', 'underground', 'warehouse'];

const SAMPLE_TICKETS: TicketForm[] = [
  {
    type: 'General Admission',
    price: '25',
    quantity: '100',
    description: 'Standard entry ticket.',
  },
  {
    type: 'VIP',
    price: '50',
    quantity: '50',
    description: 'VIP area with priority access.',
  },
  {
    type: 'Backstage',
    price: '90',
    quantity: '20',
    description: 'Access to backstage and meet & greet.',
  },
];

const SAMPLE_ARTISTS: ArtistForm[] = [
  {
    name: 'DJ Aurora',
    photoUrl: 'https://picsum.photos/400?1',
    description: 'Hypnotic techno with atmospheric textures.',
    socialLinks: ['https://instagram.com/dj-aurora'],
  },
  {
    name: 'Luna Vega',
    photoUrl: 'https://picsum.photos/400?2',
    description: 'Melodic house with organic vibes.',
    socialLinks: ['https://instagram.com/luna.vega'],
  },
  {
    name: 'EchoMind',
    photoUrl: 'https://picsum.photos/400?3',
    description: 'Driving techno with cinematic layers.',
    socialLinks: ['https://instagram.com/echomind'],
  },
];

export type RandomEventData = {
  title: string;
  category: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  address: string;
  location: string;
  cardImageUrl: string;
  bannerImageUrls: string[];
  carouselImageUrl: string;
  isFeatured: boolean;
  isCarousel: boolean;
  organizerName: string;
  organizerDescription: string;
  organizerAvatarUrl: string;
  organizerEmail: string;
  organizerPhone: string;
  tickets: TicketForm[];
  artists: ArtistForm[];
  tags: string[];
  rrppEmails: string[];
};

/**
 * Genera datos aleatorios completos para crear un evento de prueba
 */
export function generateRandomEventData(): RandomEventData {
  // Fecha aleatoria (1-30 días en el futuro)
  const nextDays = Math.floor(Math.random() * 30) + 1;
  const date = new Date();
  date.setDate(date.getDate() + nextDays);
  date.setHours(0, 0, 0, 0);

  // Horarios aleatorios (20:00-23:00)
  const startH = String(20 + Math.floor(Math.random() * 3));
  const startM = randomFrom(['00', '15', '30', '45']);
  const endH = String(Number(startH) + 3);
  const endM = randomFrom(['00', '15', '30', '45']);
  const startTime = `${startH.padStart(2, '0')}:${startM}`;
  const endTime = `${endH.padStart(2, '0')}:${endM}`;

  // Email aleatorio para RRPP
  const rrppEmail = `rrpp${Math.floor(Math.random() * 1000)}@example.com`;

  // Imágenes aleatorias de Picsum Photos
  const cardImageId = Math.floor(Math.random() * 1000) + 100;
  const cardImageUrl = `https://picsum.photos/400/600?${cardImageId}`;
  
  // Múltiples banners - si es carousel, usar alta calidad
  const bannerCount = Math.floor(Math.random() * 3) + 2; // 2-4 banners
  const isCarousel = Math.random() > 0.6;
  
  const bannerImageUrls = Array.from({ length: bannerCount }, (_, i) => {
    const bannerId = Math.floor(Math.random() * 1000) + 100;
    // Si es carousel, usar resolución Full HD para mejor calidad
    return isCarousel 
      ? `https://picsum.photos/1920/1080?${bannerId}`
      : `https://picsum.photos/1200/400?${bannerId}`;
  });

  // Imagen específica para el carrusel principal (Full HD)
  const carouselImageId = Math.floor(Math.random() * 1000) + 100;
  const carouselImageUrl = `https://picsum.photos/1920/1080?${carouselImageId}`;

  // Random featured flag
  const isFeatured = Math.random() > 0.5;

  // Datos del organizador
  const organizerNames = ['EventPro Productions', 'NightLife Events', 'Urban Beats Co.', 'Stellar Events', 'Pulse Entertainment'];
  const organizerName = randomFrom(organizerNames);
  const organizerDescription = 'Professional event organizer with over 10 years of experience creating unforgettable experiences.';
  const organizerAvatarId = Math.floor(Math.random() * 1000) + 100;
  const organizerAvatarUrl = `https://picsum.photos/200/200?${organizerAvatarId}`;
  const organizerEmail = `contact@${organizerName.toLowerCase().replace(/\s+/g, '')}.com`;
  const organizerPhone = `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;

  return {
    title: randomFrom(EVENT_TITLES),
    category: randomFrom(EVENT_CATEGORIES),
    description: 'An unforgettable night with curated artists and immersive visuals.',
    date,
    startTime,
    endTime,
    address: randomFrom(STREETS),
    location: randomFrom(CITIES),
    cardImageUrl,
    bannerImageUrls,
    carouselImageUrl,
    isFeatured,
    isCarousel,
    organizerName,
    organizerDescription,
    organizerAvatarUrl,
    organizerEmail,
    organizerPhone,
    tickets: [...SAMPLE_TICKETS],
    artists: [...SAMPLE_ARTISTS],
    tags: [...SAMPLE_TAGS],
    rrppEmails: [rrppEmail],
  };
}

