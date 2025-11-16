export function generateRandomEventData() {
  const categories = ['House', 'Techno', 'Trance', 'Dubstep', 'Hip Hop', 'Reggaeton'];
  const locations = ['Barcelona', 'Madrid', 'Valencia', 'Seville', 'Bilbao'];
  const titles = [
    'Night Pulse',
    'Urban Beats',
    'Electric Dreams',
    'Midnight Groove',
    'Warehouse Vibes',
    'Neon Nights',
    'Bass Drop Festival',
    'Rhythm Revolution',
  ];

  const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const getRandomPrice = () => Math.floor(Math.random() * 1000) + 200;

  const getRandomDate = () => {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 90);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const randomDate = getRandomDate();

  const startHour = Math.floor(Math.random() * 4) + 19; // 19:00 - 22:00
  const endHour = Math.floor(Math.random() * 5) + 23; // 23:00 - 27:00 (03:00)

  const formatTime = (hour: number) => {
    const normalizedHour = hour % 24;
    return `${normalizedHour.toString().padStart(2, '0')}:${(Math.random() < 0.5 ? '00' : '30')}`;
  };

  const addresses = [
    'Av. Diagonal 123',
    'Calle Gran Vía 45',
    'Passeig de Gràcia 12',
    'Calle Mayor 78',
    'Av. del Puerto 90',
  ];

  const allTags = [
    'melodic techno',
    'underground',
    'warehouse',
    'open air',
    'afterparty',
    'live set',
    'retro wave',
  ];

  const sampleTags = (): string[] => {
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 2); // 2-4 tags
  };

  const sampleRrpp = (): string[] => {
    const candidates = ['rita@club.com', 'juan@promo.com', 'maria@rrpp.io', 'leo@scene.net'];
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 1); // 1-2 emails
  };

  return {
    title: getRandomElement(titles),
    category: getRandomElement(categories),
    description: 'An unforgettable night with curated artists and immersive visuals.',
    date: randomDate.toISOString(),
    startTime: formatTime(startHour),
    endTime: formatTime(endHour),
    address: getRandomElement(addresses),
    location: getRandomElement(locations),
    cardImageUrl: `https://picsum.photos/400/600?${Math.floor(Math.random() * 1000)}`,
    bannerImageUrls: [
      `https://picsum.photos/1920/1080?${Math.floor(Math.random() * 1000)}`,
      `https://picsum.photos/1920/1080?${Math.floor(Math.random() * 1000)}`,
    ],
    carouselImageUrl: `https://picsum.photos/1920/600?${Math.floor(Math.random() * 1000)}`,
    isFeatured: Math.random() < 0.3,
    isCarousel: Math.random() < 0.2,
    organizerName: 'Event Productions Inc.',
    organizerEmail: 'contact@eventprod.com',
    organizerPhone: '+34 600 123 456',
    organizerLogo: `https://picsum.photos/200?${Math.floor(Math.random() * 1000)}`,
    tags: sampleTags(),
    rrppEmails: sampleRrpp(),
    tickets: [
      {
        type: 'General',
        price: getRandomPrice(),
        quantity: '500',
        maxQuantity: '5',
        description: 'General admission ticket',
        benefits: ['Access to main floor', 'Free welcome drink'],
      },
      {
        type: 'VIP',
        price: getRandomPrice() * 1.5,
        quantity: '100',
        maxQuantity: '3',
        description: 'VIP experience with exclusive perks',
        benefits: ['Priority entrance', 'VIP lounge access', 'Premium bar service', 'Meet & greet opportunity'],
      },
    ],
    artists: [
      {
        name: 'DJ Shadow',
        photoUrl: `https://picsum.photos/400?${Math.floor(Math.random() * 1000)}`,
      },
      {
        name: 'MC Rhythm',
        photoUrl: `https://picsum.photos/400?${Math.floor(Math.random() * 1000)}`,
      },
    ],
  };
}

