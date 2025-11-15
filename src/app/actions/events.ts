'use server';

import { db } from '../../lib/db';
import { events, tickets, artists, eventArtists, artistSocialLinks, tags, eventTags } from '../../lib/db/schema/events';
import { desc, eq, and } from 'drizzle-orm';

export async function getEventsAction() {
  try {
    const allEvents = await db
      .select()
      .from(events)
      .where(eq(events.isActive, true))
      .orderBy(desc(events.createdAt));

    return allEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function getNonFeaturedEventsAction() {
  try {
    const nonFeaturedEvents = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.isFeatured, false),
          eq(events.isActive, true)
        )
      )
      .orderBy(desc(events.createdAt));

    return nonFeaturedEvents;
  } catch (error) {
    console.error('Error fetching non-featured events:', error);
    return [];
  }
}

export async function getFeaturedEventsAction() {
  try {
    const featuredEvents = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.isFeatured, true),
          eq(events.isActive, true)
        )
      )
      .orderBy(desc(events.createdAt))
      .limit(6);

    return featuredEvents;
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
}

export async function getCarouselEventsAction() {
  try {
    const carouselEvents = await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.isCarousel, true),
          eq(events.isActive, true)
        )
      )
      .orderBy(desc(events.createdAt))
      .limit(10);

    return carouselEvents;
  } catch (error) {
    console.error('Error fetching carousel events:', error);
    return [];
  }
}

export async function getEventByIdAction(eventId: string) {
  try {
    // Get event basic info
    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId));

    if (!event) return null;

    // Get tickets
    const eventTickets = await db
      .select()
      .from(tickets)
      .where(eq(tickets.eventId, eventId));

    // Get artists with social links
    const eventArtistsData = await db
      .select({
        artist: artists,
        socialLink: artistSocialLinks,
      })
      .from(eventArtists)
      .innerJoin(artists, eq(eventArtists.artistId, artists.id))
      .leftJoin(artistSocialLinks, eq(artists.id, artistSocialLinks.artistId))
      .where(eq(eventArtists.eventId, eventId));

    // Group artists with their social links
    const artistsMap = new Map();
    eventArtistsData.forEach(({ artist, socialLink }) => {
      if (!artistsMap.has(artist.id)) {
        artistsMap.set(artist.id, {
          ...artist,
          socialLinks: [],
        });
      }
      if (socialLink) {
        artistsMap.get(artist.id).socialLinks.push(socialLink);
      }
    });

    const eventArtistsList = Array.from(artistsMap.values());

    // Get tags
    const eventTagsData = await db
      .select({
        tag: tags,
      })
      .from(eventTags)
      .innerJoin(tags, eq(eventTags.tagId, tags.id))
      .where(eq(eventTags.eventId, eventId));

    const eventTagsList = eventTagsData.map(({ tag }) => tag.name);

    return {
      event,
      tickets: eventTickets,
      artists: eventArtistsList,
      tags: eventTagsList,
    };
  } catch (error) {
    console.error('Error fetching event by id:', error);
    return null;
  }
}

