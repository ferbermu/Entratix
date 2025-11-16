'use server';

import { db } from '../../lib/db';
import { events, tickets, artists } from '../../lib/db/schema/events';
import { desc, eq, and } from 'drizzle-orm';

export async function getAllEventsAction() {
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

export async function getFeaturedEventsAction() {
  try {
    const featuredEvents = await db
      .select()
      .from(events)
      .where(and(eq(events.isFeatured, true), eq(events.isActive, true)))
      .orderBy(desc(events.createdAt));

    return featuredEvents;
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
}

export async function getNonFeaturedEventsAction() {
  try {
    const nonFeaturedEvents = await db
      .select()
      .from(events)
      .where(and(eq(events.isFeatured, false), eq(events.isActive, true)))
      .orderBy(desc(events.createdAt));

    return nonFeaturedEvents;
  } catch (error) {
    console.error('Error fetching non-featured events:', error);
    return [];
  }
}

export async function getCarouselEventsAction() {
  try {
    const carouselEvents = await db
      .select()
      .from(events)
      .where(and(eq(events.isCarousel, true), eq(events.isActive, true)))
      .orderBy(desc(events.createdAt));

    return carouselEvents;
  } catch (error) {
    console.error('Error fetching carousel events:', error);
    return [];
  }
}

export async function getEventByIdAction(eventId: string) {
  try {
    const [event] = await db
      .select()
      .from(events)
      .where(and(eq(events.id, eventId), eq(events.isActive, true)))
      .limit(1);

    if (!event) {
      return null;
    }

    const eventTickets = await db
      .select()
      .from(tickets)
      .where(eq(tickets.eventId, eventId));

    const eventArtists = await db
      .select()
      .from(artists)
      .where(eq(artists.eventId, eventId));

    return {
      ...event,
      tickets: eventTickets,
      artists: eventArtists,
    };
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    return null;
  }
}

