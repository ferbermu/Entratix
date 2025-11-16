'use server';

import { db } from '../../lib/db';
import { events, tickets, artists } from '../../lib/db/schema/events';

interface CreateEventInput {
  title: string;
  category: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  address: string;
  location: string;
  cardImageUrl?: string;
  bannerImageUrls?: string[];
  carouselImageUrl?: string;
  isFeatured?: boolean;
  isCarousel?: boolean;
  organizerId?: string;
  organizerName?: string;
  organizerEmail?: string;
  organizerPhone?: string;
  organizerLogo?: string;
  tickets: {
    type: string;
    price: number;
    quantity: string;
    maxQuantity?: string;
    description?: string;
    benefits?: string[];
  }[];
  artists: {
    name: string;
    photoUrl: string;
  }[];
}

export async function createEventAction(input: CreateEventInput) {
  try {
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
      isFeatured,
      isCarousel,
      organizerId,
      organizerName,
      organizerEmail,
      organizerPhone,
      organizerLogo,
      tickets: ticketsData,
      artists: artistsData,
    } = input;

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
        bannerImageUrls: bannerImageUrls && bannerImageUrls.length > 0 ? bannerImageUrls : null,
        carouselImageUrl: carouselImageUrl || null,
        isFeatured: isFeatured || false,
        isCarousel: isCarousel || false,
        organizerId: organizerId || null,
        organizerName: organizerName || null,
        organizerEmail: organizerEmail || null,
        organizerPhone: organizerPhone || null,
        organizerLogo: organizerLogo || null,
      })
      .returning();

    if (ticketsData && ticketsData.length > 0) {
      await db.insert(tickets).values(
        ticketsData.map((ticket) => ({
          eventId: event.id,
          type: ticket.type,
          price: ticket.price.toString(),
          quantity: ticket.quantity,
          maxQuantity: ticket.maxQuantity || null,
          description: ticket.description || null,
          benefits: ticket.benefits || null,
        }))
      );
    }

    if (artistsData && artistsData.length > 0) {
      await db.insert(artists).values(
        artistsData.map((artist) => ({
          eventId: event.id,
          name: artist.name,
          photoUrl: artist.photoUrl,
        }))
      );
    }

    return {
      success: true,
      message: 'Event created successfully',
      eventId: event.id,
    };
  } catch (error) {
    console.error('Error creating event:', error);
    return { success: false, message: 'Failed to create event' };
  }
}

