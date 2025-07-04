import { PrismaClient, UserRole, TicketStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // Limpiar la base de datos
  console.log('🧹 Limpiando datos existentes...')
  await prisma.ticketPurchased.deleteMany()
  await prisma.ticketType.deleteMany()
  await prisma.artistsOnEvents.deleteMany()
  await prisma.rRPPOnEvents.deleteMany()
  await prisma.tagsOnEvents.deleteMany()
  await prisma.events.deleteMany()
  await prisma.artist.deleteMany()
  await prisma.tag.deleteMany()
  await prisma.rRPP.deleteMany()
  await prisma.producer.deleteMany()
  await prisma.user.deleteMany()

  // Crear usuarios
  console.log('👥 Creando usuarios...')
  const hashedPassword = await bcrypt.hash('password123', 10)

  const clientUser = await prisma.user.create({
    data: {
      email: 'cliente@example.com',
      password: hashedPassword,
      role: UserRole.Client,
    },
  })

  const producerUser = await prisma.user.create({
    data: {
      email: 'productor@example.com',
      password: hashedPassword,
      role: UserRole.Producer,
    },
  })

  const rrppUser = await prisma.user.create({
    data: {
      email: 'rrpp@example.com',
      password: hashedPassword,
      role: UserRole.RRPP,
    },
  })

  const subRrppUser = await prisma.user.create({
    data: {
      email: 'subrrpp@example.com',
      password: hashedPassword,
      role: UserRole.RRPP,
    },
  })

  // Crear producer
  console.log('🎭 Creando productor...')
  const producer = await prisma.producer.create({
    data: {
      description: 'Productora líder en eventos electrónicos y festivales',
      image: '/assets/producer-logo.png',
      userId: producerUser.id,
    },
  })

  // Crear RRPPs
  console.log('🎫 Creando RRPPs...')
  const rrpp = await prisma.rRPP.create({
    data: {
      userId: rrppUser.id,
    },
  })

  const subRrpp = await prisma.rRPP.create({
    data: {
      userId: subRrppUser.id,
      parentRrppId: rrpp.id,
    },
  })

  // Crear tags
  console.log('🏷️ Creando tags...')
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Electrónica' } }),
    prisma.tag.create({ data: { name: 'Rock' } }),
    prisma.tag.create({ data: { name: 'Pop' } }),
    prisma.tag.create({ data: { name: 'Hip Hop' } }),
    prisma.tag.create({ data: { name: 'Reggaeton' } }),
    prisma.tag.create({ data: { name: 'Festival' } }),
    prisma.tag.create({ data: { name: 'Club' } }),
    prisma.tag.create({ data: { name: 'Live Music' } }),
    prisma.tag.create({ data: { name: 'Jazz' } }),
    prisma.tag.create({ data: { name: 'Clásica' } }),
    prisma.tag.create({ data: { name: 'Indie' } }),
    prisma.tag.create({ data: { name: 'Salsa' } }),
    prisma.tag.create({ data: { name: 'Bachata' } }),
    prisma.tag.create({ data: { name: 'Freestyle' } }),
    prisma.tag.create({ data: { name: 'Orquesta' } }),
    prisma.tag.create({ data: { name: 'Al Aire Libre' } }),
  ])

  // Crear artistas
  console.log('🎤 Creando artistas...')
  const artists = await Promise.all([
    prisma.artist.create({
      data: {
        name: 'DJ Tiesto',
        description: 'DJ y productor holandés, pionero del trance y house',
        socialLinks: ['https://instagram.com/tiesto', 'https://twitter.com/tiesto'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'The Weeknd',
        description: 'Cantante y compositor canadiense de R&B y pop',
        socialLinks: ['https://instagram.com/theweeknd', 'https://twitter.com/theweeknd'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Bad Bunny',
        description: 'Artista puertorriqueño de reggaeton y trap latino',
        socialLinks: ['https://instagram.com/badbunnypr', 'https://twitter.com/sanbenito'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Arctic Monkeys',
        description: 'Banda británica de rock alternativo',
        socialLinks: ['https://instagram.com/arcticmonkeys', 'https://twitter.com/arcticmonkeys'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Jazz Trio Buenos Aires',
        description: 'Trío de jazz local con más de 15 años de trayectoria',
        socialLinks: ['https://instagram.com/jazztrioba', 'https://facebook.com/jazztrioba'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'MC Flow',
        description: 'Rapero argentino, campeón nacional de freestyle',
        socialLinks: ['https://instagram.com/mcflow', 'https://youtube.com/mcflow'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Pop Divas',
        description: 'Grupo pop femenino con las voces más potentes del momento',
        socialLinks: ['https://instagram.com/popdivas', 'https://tiktok.com/popdivas'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Orquesta Filarmónica BA',
        description: 'Orquesta sinfónica de Buenos Aires con más de 50 músicos',
        socialLinks: ['https://instagram.com/filarmonicaba', 'https://facebook.com/filarmonicaba'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Indie Collective',
        description: 'Colectivo de bandas independientes emergentes',
        socialLinks: ['https://instagram.com/indiecollective', 'https://spotify.com/indiecollective'],
      },
    }),
    prisma.artist.create({
      data: {
        name: 'Salsa Masters',
        description: 'Banda de salsa y ritmos latinos con más de 20 años de experiencia',
        socialLinks: ['https://instagram.com/salsamasters', 'https://facebook.com/salsamasters'],
      },
    }),
  ])

  // Crear eventos
  console.log('🎪 Creando eventos...')
  const events = await Promise.all([
    prisma.events.create({
      data: {
        title: 'Summer Electronic Festival 2024',
        description: 'El festival de música electrónica más grande del verano. 3 días de música, luces y diversión.',
        date: new Date('2024-07-15T20:00:00Z'),
        location: 'Parque de la Ciudad',
        address: 'Av. Libertador 1234, Buenos Aires',
        imageUrl: [
          '/assets/show1.jpg',
          '/assets/show2.jpg',
          '/assets/show3.jpg',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Rock en el Parque',
        description: 'Noche de rock con las mejores bandas nacionales e internacionales.',
        date: new Date('2024-08-20T19:00:00Z'),
        location: 'Estadio Luna Park',
        address: 'Av. Corrientes 1234, Buenos Aires',
        imageUrl: [
          '/assets/show4.jpg',
          '/assets/show5.jpg',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Reggaeton Night',
        description: 'La mejor noche de reggaeton con los artistas más calientes del momento.',
        date: new Date('2024-09-10T22:00:00Z'),
        location: 'Club Groove',
        address: 'Av. Santa Fe 5678, Buenos Aires',
        imageUrl: [
          '/assets/party.png',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Jazz Under the Stars',
        description: 'Una velada mágica de jazz al aire libre con los mejores músicos de la escena local.',
        date: new Date('2024-10-05T19:30:00Z'),
        location: 'Jardín Botánico',
        address: 'Av. Santa Fe 3951, Buenos Aires',
        imageUrl: [
          '/assets/show1.jpg',
          '/assets/show2.jpg',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Hip Hop Battle Championship',
        description: 'La competencia más importante de freestyle y rap del año. Premios en efectivo y reconocimiento internacional.',
        date: new Date('2024-10-25T21:00:00Z'),
        location: 'Teatro Gran Rex',
        address: 'Av. Corrientes 857, Buenos Aires',
        imageUrl: [
          '/assets/show3.jpg',
          '/assets/show4.jpg',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Pop Stars Concert',
        description: 'El espectáculo pop más esperado del año con las estrellas más brillantes del momento.',
        date: new Date('2024-11-12T20:00:00Z'),
        location: 'Estadio River Plate',
        address: 'Av. Figueroa Alcorta 7597, Buenos Aires',
        imageUrl: [
          '/assets/show5.jpg',
          '/assets/party.png',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Classical Symphony Night',
        description: 'Una noche de música clásica con la Orquesta Filarmónica de Buenos Aires.',
        date: new Date('2024-11-30T20:30:00Z'),
        location: 'Teatro Colón',
        address: 'Cerrito 628, Buenos Aires',
        imageUrl: [
          '/assets/show1.jpg',
          '/assets/show2.jpg',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Indie Music Festival',
        description: 'Festival de música independiente con las bandas emergentes más prometedoras.',
        date: new Date('2024-12-15T18:00:00Z'),
        location: 'Centro Cultural Konex',
        address: 'Sarmiento 3131, Buenos Aires',
        imageUrl: [
          '/assets/show3.jpg',
          '/assets/show4.jpg',
        ],
        producerId: producer.id,
      },
    }),
    prisma.events.create({
      data: {
        title: 'Latin Dance Party',
        description: 'La fiesta de baile latino más caliente con salsa, bachata y merengue.',
        date: new Date('2024-12-28T23:00:00Z'),
        location: 'Club La Catedral',
        address: 'Sarmiento 4006, Buenos Aires',
        imageUrl: [
          '/assets/show5.jpg',
          '/assets/party.png',
        ],
        producerId: producer.id,
      },
    }),
  ])

  // Asociar artistas con eventos
  console.log('🎵 Asociando artistas con eventos...')
  await Promise.all([
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[0].id,
        artistId: artists[0].id, // DJ Tiesto
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[1].id,
        artistId: artists[3].id, // Arctic Monkeys
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[2].id,
        artistId: artists[2].id, // Bad Bunny
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[3].id,
        artistId: artists[4].id, // Jazz Trio Buenos Aires
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[4].id,
        artistId: artists[5].id, // MC Flow
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[5].id,
        artistId: artists[6].id, // Pop Divas
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[6].id,
        artistId: artists[7].id, // Orquesta Filarmónica BA
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[7].id,
        artistId: artists[8].id, // Indie Collective
      },
    }),
    prisma.artistsOnEvents.create({
      data: {
        eventId: events[8].id,
        artistId: artists[9].id, // Salsa Masters
      },
    }),
  ])

  // Asociar tags con eventos
  console.log('🏷️ Asociando tags con eventos...')
  await Promise.all([
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[0].id,
        tagId: tags[0].id, // Electrónica
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[0].id,
        tagId: tags[5].id, // Festival
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[1].id,
        tagId: tags[1].id, // Rock
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[1].id,
        tagId: tags[6].id, // Live Music
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[2].id,
        tagId: tags[4].id, // Reggaeton
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[2].id,
        tagId: tags[6].id, // Club
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[3].id,
        tagId: tags[8].id, // Jazz
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[3].id,
        tagId: tags[15].id, // Al Aire Libre
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[4].id,
        tagId: tags[3].id, // Hip Hop
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[4].id,
        tagId: tags[13].id, // Freestyle
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[5].id,
        tagId: tags[2].id, // Pop
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[5].id,
        tagId: tags[6].id, // Live Music
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[6].id,
        tagId: tags[9].id, // Clásica
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[6].id,
        tagId: tags[14].id, // Orquesta
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[7].id,
        tagId: tags[10].id, // Indie
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[7].id,
        tagId: tags[5].id, // Festival
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[8].id,
        tagId: tags[11].id, // Salsa
      },
    }),
    prisma.tagsOnEvents.create({
      data: {
        eventId: events[8].id,
        tagId: tags[12].id, // Bachata
      },
    }),
  ])

  // Asociar RRPPs con eventos
  console.log('🎫 Asociando RRPPs con eventos...')
  await Promise.all([
    prisma.rRPPOnEvents.create({
      data: {
        eventId: events[0].id,
        rrppId: rrpp.id,
      },
    }),
    prisma.rRPPOnEvents.create({
      data: {
        eventId: events[1].id,
        rrppId: rrpp.id,
      },
    }),
    prisma.rRPPOnEvents.create({
      data: {
        eventId: events[2].id,
        rrppId: subRrpp.id,
      },
    }),
  ])

  // Crear tipos de tickets
  console.log('🎟️ Creando tipos de tickets...')
  const ticketTypes = await Promise.all([
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 5000,
        quantity: 1000,
        eventId: events[0].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'VIP',
        price: 15000,
        quantity: 200,
        eventId: events[0].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 3000,
        quantity: 500,
        eventId: events[1].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 2000,
        quantity: 300,
        eventId: events[2].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 2500,
        quantity: 400,
        eventId: events[3].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 1500,
        quantity: 800,
        eventId: events[4].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 8000,
        quantity: 2000,
        eventId: events[5].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'VIP',
        price: 12000,
        quantity: 500,
        eventId: events[5].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 4000,
        quantity: 1500,
        eventId: events[6].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 1800,
        quantity: 600,
        eventId: events[7].id,
      },
    }),
    prisma.ticketType.create({
      data: {
        name: 'General',
        price: 1200,
        quantity: 400,
        eventId: events[8].id,
      },
    }),
  ])

  // Crear tickets comprados
  console.log('💳 Creando tickets comprados...')
  await Promise.all([
    prisma.ticketPurchased.create({
      data: {
        ticketTypeId: ticketTypes[0].id,
        code: 'TIX-001-001',
        userID: clientUser.id,
        status: TicketStatus.Purchased,
      },
    }),
    prisma.ticketPurchased.create({
      data: {
        ticketTypeId: ticketTypes[1].id,
        code: 'TIX-001-002',
        userID: clientUser.id,
        status: TicketStatus.Purchased,
      },
    }),
    prisma.ticketPurchased.create({
      data: {
        ticketTypeId: ticketTypes[2].id,
        code: 'TIX-002-001',
        userID: clientUser.id,
        status: TicketStatus.Pending,
      },
    }),
  ])

  console.log('✅ Seed completado exitosamente!')
  console.log('\n📊 Resumen de datos creados:')
  console.log(`- ${await prisma.user.count()} usuarios`)
  console.log(`- ${await prisma.producer.count()} productores`)
  console.log(`- ${await prisma.rRPP.count()} RRPPs`)
  console.log(`- ${await prisma.artist.count()} artistas`)
  console.log(`- ${await prisma.events.count()} eventos`)
  console.log(`- ${await prisma.tag.count()} tags`)
  console.log(`- ${await prisma.ticketType.count()} tipos de tickets`)
  console.log(`- ${await prisma.ticketPurchased.count()} tickets comprados`)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 