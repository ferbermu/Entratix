import {
  pgTable,
  text,
  timestamp,
  decimal,
  integer,
  uuid,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Tabla principal de eventos
export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  startTime: text('start_time').notNull(), // Formato HH:MM AM/PM
  endTime: text('end_time').notNull(), // Formato HH:MM AM/PM
  address: text('address').notNull(),
  location: text('location').notNull(), // Ciudad/País
  cardImageUrl: text('card_image_url'), // Imagen para la card del evento
  bannerImageUrls: text('banner_image_urls').array(), // Array de imágenes para el banner
  carouselImageUrl: text('carousel_image_url'), // Imagen de alta calidad para el carrusel principal
  isFeatured: boolean('is_featured').default(false).notNull(), // Evento destacado
  isCarousel: boolean('is_carousel').default(false).notNull(), // Aparece en carrusel principal
  // Información del organizador
  organizerName: text('organizer_name'),
  organizerDescription: text('organizer_description'),
  organizerAvatarUrl: text('organizer_avatar_url'),
  organizerEmail: text('organizer_email'),
  organizerPhone: text('organizer_phone'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

// Tabla de tickets
export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  type: text('type').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tabla de artistas
export const artists = pgTable('artists', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  photoUrl: text('photo_url'),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tabla de unión eventos-artistas
export const eventArtists = pgTable('event_artists', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  artistId: uuid('artist_id')
    .references(() => artists.id, { onDelete: 'cascade' })
    .notNull(),
});

// Tabla de links sociales de artistas
export const artistSocialLinks = pgTable('artist_social_links', {
  id: uuid('id').defaultRandom().primaryKey(),
  artistId: uuid('artist_id')
    .references(() => artists.id, { onDelete: 'cascade' })
    .notNull(),
  url: text('url').notNull(),
});

// Tabla de tags
export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tabla de unión eventos-tags
export const eventTags = pgTable('event_tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  tagId: uuid('tag_id')
    .references(() => tags.id, { onDelete: 'cascade' })
    .notNull(),
});

// Tabla de RRPP
export const rrpp = pgTable('rrpp', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tabla de unión eventos-RRPP
export const eventRrpp = pgTable('event_rrpp', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  rrppId: uuid('rrpp_id')
    .references(() => rrpp.id, { onDelete: 'cascade' })
    .notNull(),
});

// Relaciones
export const eventsRelations = relations(events, ({ many }) => ({
  tickets: many(tickets),
  eventArtists: many(eventArtists),
  eventTags: many(eventTags),
  eventRrpp: many(eventRrpp),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  event: one(events, {
    fields: [tickets.eventId],
    references: [events.id],
  }),
}));

export const artistsRelations = relations(artists, ({ many }) => ({
  eventArtists: many(eventArtists),
  socialLinks: many(artistSocialLinks),
}));

export const eventArtistsRelations = relations(eventArtists, ({ one }) => ({
  event: one(events, {
    fields: [eventArtists.eventId],
    references: [events.id],
  }),
  artist: one(artists, {
    fields: [eventArtists.artistId],
    references: [artists.id],
  }),
}));

export const artistSocialLinksRelations = relations(
  artistSocialLinks,
  ({ one }) => ({
    artist: one(artists, {
      fields: [artistSocialLinks.artistId],
      references: [artists.id],
    }),
  })
);

export const tagsRelations = relations(tags, ({ many }) => ({
  eventTags: many(eventTags),
}));

export const eventTagsRelations = relations(eventTags, ({ one }) => ({
  event: one(events, {
    fields: [eventTags.eventId],
    references: [events.id],
  }),
  tag: one(tags, {
    fields: [eventTags.tagId],
    references: [tags.id],
  }),
}));

export const rrppRelations = relations(rrpp, ({ many }) => ({
  eventRrpp: many(eventRrpp),
}));

export const eventRrppRelations = relations(eventRrpp, ({ one }) => ({
  event: one(events, {
    fields: [eventRrpp.eventId],
    references: [events.id],
  }),
  rrpp: one(rrpp, {
    fields: [eventRrpp.rrppId],
    references: [rrpp.id],
  }),
}));
