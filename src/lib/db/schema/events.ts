import { pgTable, uuid, text, timestamp, decimal, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const events = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
  address: text('address').notNull(),
  location: text('location').notNull(),
  cardImageUrl: text('card_image_url'),
  bannerImageUrls: text('banner_image_urls').array(),
  carouselImageUrl: text('carousel_image_url'),
  isFeatured: boolean('is_featured').default(false).notNull(),
  isCarousel: boolean('is_carousel').default(false).notNull(),
  organizerId: uuid('organizer_id').references(() => users.id, { onDelete: 'set null' }),
  organizerName: text('organizer_name'),
  organizerEmail: text('organizer_email'),
  organizerPhone: text('organizer_phone'),
  organizerLogo: text('organizer_logo'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
});

export const tickets = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  quantity: text('quantity').notNull(),
  maxQuantity: text('max_quantity'),
  description: text('description'),
  benefits: text('benefits').array(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const artists = pgTable('artists', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  photoUrl: text('photo_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, { fields: [events.organizerId], references: [users.id] }),
  tickets: many(tickets),
  artists: many(artists),
  orders: many('orders'),
}));

export const ticketsRelations = relations(tickets, ({ one }) => ({
  event: one(events, { fields: [tickets.eventId], references: [events.id] }),
}));

export const artistsRelations = relations(artists, ({ one }) => ({
  event: one(events, { fields: [artists.eventId], references: [events.id] }),
}));

