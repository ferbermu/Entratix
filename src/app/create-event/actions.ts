'use server';

import { db } from '../../lib/db';
import {
  events,
  tickets as ticketsTable,
  artists as artistsTable,
  artistSocialLinks,
  eventArtists,
  tags as tagsTable,
  eventTags,
  rrpp as rrppTable,
  eventRrpp,
} from '../../lib/db/schema/events';
import { inArray, type InferSelectModel } from 'drizzle-orm';

type TagRow = InferSelectModel<typeof tagsTable>;
type RrppRow = InferSelectModel<typeof rrppTable>;

export type CreateTicketInput = {
  type: string;
  price: number;
  quantity: number;
  description?: string;
};

export type CreateArtistInput = {
  name: string;
  photoUrl?: string;
  description?: string;
  socialLinks?: string[];
};

export type CreateEventInput = {
  title: string;
  category: string;
  description: string;
  date: Date;
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  address: string;
  location: string;
  cardImageUrl?: string;
  bannerImageUrls?: string[];
  carouselImageUrl?: string;
  isFeatured?: boolean;
  isCarousel?: boolean;
  organizerName?: string;
  organizerDescription?: string;
  organizerAvatarUrl?: string;
  organizerEmail?: string;
  organizerPhone?: string;
  tickets?: CreateTicketInput[];
  artists?: CreateArtistInput[];
  tags?: string[];
  rrppEmails?: string[];
};

export async function createEventAction(input: CreateEventInput) {
  const {
    title,
    category,
    description,
    date,
    startTime,
    endTime,
    address,
    location,
    cardImageUrl,
    bannerImageUrls,
    carouselImageUrl,
    isFeatured = false,
    isCarousel = false,
    organizerName,
    organizerDescription,
    organizerAvatarUrl,
    organizerEmail,
    organizerPhone,
    tickets,
    artists,
    tags,
    rrppEmails,
  } = input;

  // 1. Crear evento principal
  const [event] = await db
    .insert(events)
    .values({
      title,
      category,
      description,
      date,
      startTime,
      endTime,
      address,
      location,
      cardImageUrl: cardImageUrl || null,
      bannerImageUrls:
        bannerImageUrls && bannerImageUrls.length > 0 ? bannerImageUrls : null,
      carouselImageUrl: carouselImageUrl || null,
      isFeatured,
      isCarousel,
      organizerName: organizerName || null,
      organizerDescription: organizerDescription || null,
      organizerAvatarUrl: organizerAvatarUrl || null,
      organizerEmail: organizerEmail || null,
      organizerPhone: organizerPhone || null,
    })
    .returning();

  // 2. Tickets
  if (tickets && tickets.length > 0) {
    await db.insert(ticketsTable).values(
      tickets.map(t => ({
        eventId: event.id,
        type: t.type,
        price: t.price.toString(),
        quantity: t.quantity,
        description: t.description ?? null,
      }))
    );
  }

  // 3. Artistas + links sociales
  if (artists && artists.length > 0) {
    for (const artist of artists) {
      const [artistRow] = await db
        .insert(artistsTable)
        .values({
          name: artist.name,
          photoUrl: artist.photoUrl ?? null,
          description: artist.description ?? null,
        })
        .returning();

      await db.insert(eventArtists).values({
        eventId: event.id,
        artistId: artistRow.id,
      });

      if (artist.socialLinks && artist.socialLinks.length > 0) {
        await db.insert(artistSocialLinks).values(
          artist.socialLinks
            .filter(url => url.trim().length > 0)
            .map(url => ({
              artistId: artistRow.id,
              url,
            }))
        );
      }
    }
  }

  // 4. Tags (upsert por nombre)
  if (tags && tags.length > 0) {
    const normalized = Array.from(
      new Set(tags.map(t => t.trim()).filter(Boolean))
    );

    if (normalized.length > 0) {
      await db
        .insert(tagsTable)
        .values(normalized.map(name => ({ name })))
        .onConflictDoNothing();

      const dbTags = await db
        .select()
        .from(tagsTable)
        .where(inArray(tagsTable.name, normalized));

      if (dbTags.length > 0) {
        await db.insert(eventTags).values(
          dbTags.map((tag: TagRow) => ({
            eventId: event.id,
            tagId: tag.id,
          }))
        );
      }
    }
  }

  // 5. RRPP (upsert por email)
  if (rrppEmails && rrppEmails.length > 0) {
    const normalizedEmails = Array.from(
      new Set(
        rrppEmails
          .map(email => email.trim().toLowerCase())
          .filter(email => email.length > 0)
      )
    );

    if (normalizedEmails.length > 0) {
      await db
        .insert(rrppTable)
        .values(normalizedEmails.map(email => ({ email })))
        .onConflictDoNothing();

      const dbRrpp = await db
        .select()
        .from(rrppTable)
        .where(inArray(rrppTable.email, normalizedEmails));

      if (dbRrpp.length > 0) {
        await db.insert(eventRrpp).values(
          dbRrpp.map((r: RrppRow) => ({
            eventId: event.id,
            rrppId: r.id,
          }))
        );
      }
    }
  }

  return { eventId: event.id };
}
