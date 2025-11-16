'use client';

import React, { useEffect, useState, use } from 'react';
import { EventBanner } from './components/EventBanner';
import { EventData } from './components/EventData';
import { EventDescription } from './components/EventDescription';
import { EventLocation } from './components/EventLocation';
import { EventArtist } from './components/EventArtist';
import { EventCheckout } from './components/EventCheckout';
import { EventOrganizer } from './components/EventOrganizer';
import { getEventByIdAction } from '../../actions/events';
import { useAuthRedux } from '../../login/hooks/useAuthRedux';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface EventData {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  address: string;
  location: string;
  bannerImageUrls: string[] | null;
  organizerName: string | null;
  organizerEmail: string | null;
  organizerPhone: string | null;
  organizerLogo: string | null;
  tickets: {
    id: string;
    eventId: string;
    type: string;
    price: string;
    quantity: string;
    maxQuantity: string | null;
    description: string | null;
    benefits: string[] | null;
    createdAt: Date;
  }[];
  artists: {
    id: string;
    eventId: string;
    name: string;
    photoUrl: string;
    createdAt: Date;
  }[];
}

export default function EventPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;
  const { user } = useAuthRedux();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      const eventData = await getEventByIdAction(eventId);
      setEvent(eventData);
      setIsLoading(false);
    };

    fetchEvent();
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black">
        <div className="text-white text-2xl">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black">
        <div className="text-white text-2xl">Event not found</div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const eventTicketsData = event.tickets.map(ticket => ({
    id: ticket.id,
    name: ticket.type,
    price: parseFloat(ticket.price),
    benefits: ticket.benefits || [],
    maxQuantity: parseInt(ticket.maxQuantity || '10'),
  }));

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-40 text-white bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black">
      <EventBanner urls={event.bannerImageUrls || []} />

      <div className="flex flex-col lg:flex-row gap-8 py-8">
        <div className="flex-1 space-y-8">
          <EventData
            date={formatDate(event.date)}
            time={`${event.startTime} - ${event.endTime}`}
            startingPrice={Math.min(
              ...event.tickets.map(t => parseFloat(t.price))
            )}
          />

          <EventDescription
            title={event.title}
            description={event.description}
          />

          <EventLocation address={event.address} location={event.location} />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Artists</h2>
            {event.artists.map((artist, index) => (
              <EventArtist
                key={index}
                name={artist.name}
                photo={artist.photoUrl}
              />
            ))}
          </div>

          {event.organizerName && (
            <EventOrganizer
              name={event.organizerName}
              email={event.organizerEmail}
              phone={event.organizerPhone}
              logo={event.organizerLogo}
            />
          )}
        </div>

        <div className="lg:w-96">
          <EventCheckout
            eventId={eventId}
            userId={user?.id ? String(user.id) : undefined}
            eventTickets={eventTicketsData}
          />
        </div>
      </div>
    </div>
  );
}
