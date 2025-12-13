'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { EventBanner } from '../components/EventBanner';
import { EventData } from '../components/EventData';
import { EventDescription } from '../components/EventDescription';
import { EventLocation } from '../components/EventLocation';
import { EventArtist, EventArtistProps } from '../components/EventArtist';
import { EventCheckout } from './components/EventCheckout';
import { EventOrganizer } from '../components/EventOrganizer';
import { getEventByIdAction } from '../../actions/events';
import { useAuth } from '../../providers/AuthProvider';
import { Tags } from '../components/Tags';

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
  category?: string | null;
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
  const { user } = useAuth();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string>('');

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const eventData = await getEventByIdAction(eventId);
        setEvent(eventData);
        if (!eventData) {
          setLoadError('Event not found');
        }
      } catch {
        setEvent(null);
        setLoadError('Failed to load event');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const displayEvent: EventData = event || {
    id: eventId,
    title: 'Event',
    description: '...',
    date: new Date(),
    startTime: '22:00',
    endTime: '06:00',
    address: 'Unknown',
    location: 'Unknown',
    bannerImageUrls: ['/assets/party.png'],
    organizerName: 'Organizer',
    organizerEmail: null,
    organizerPhone: null,
    organizerLogo: '/assets/party.png',
    tickets: [],
    artists: [
      { id: 'placeholder-1', eventId, name: 'Artist One', photoUrl: '/assets/party.png', createdAt: new Date() },
      { id: 'placeholder-2', eventId, name: 'Artist Two', photoUrl: '/assets/party.png', createdAt: new Date() },
      { id: 'placeholder-3', eventId, name: 'Artist Three', photoUrl: '/assets/party.png', createdAt: new Date() },
    ],
  };

  const placeholderArtists: EventData['artists'] = [
    { id: 'placeholder-1', eventId, name: 'Artist One', photoUrl: '/assets/party.png', createdAt: new Date() },
    { id: 'placeholder-2', eventId, name: 'Artist Two', photoUrl: '/assets/party.png', createdAt: new Date() },
    { id: 'placeholder-3', eventId, name: 'Artist Three', photoUrl: '/assets/party.png', createdAt: new Date() },
  ];

  const normalizedEvent: EventData = {
    ...displayEvent,
    title: displayEvent.title && displayEvent.title.trim() !== '' ? displayEvent.title : 'Event',
    description:
      displayEvent.description && displayEvent.description.trim() !== ''
        ? displayEvent.description
        : '...',
    startTime:
      displayEvent.startTime && displayEvent.startTime.trim() !== ''
        ? displayEvent.startTime
        : '22:00',
    endTime:
      displayEvent.endTime && displayEvent.endTime.trim() !== ''
        ? displayEvent.endTime
        : '06:00',
    address:
      displayEvent.address && displayEvent.address.trim() !== ''
        ? displayEvent.address
        : 'Unknown',
    location:
      displayEvent.location && displayEvent.location.trim() !== ''
        ? displayEvent.location
        : 'Unknown',
    bannerImageUrls:
      Array.isArray(displayEvent.bannerImageUrls) && displayEvent.bannerImageUrls.length > 0
        ? displayEvent.bannerImageUrls
        : ['/assets/party.png'],
    artists:
      Array.isArray(displayEvent.artists) && displayEvent.artists.length > 0
        ? displayEvent.artists
        : placeholderArtists,
    organizerName:
      displayEvent.organizerName && displayEvent.organizerName.trim() !== ''
        ? displayEvent.organizerName
        : 'Organizer',
    organizerLogo: displayEvent.organizerLogo || '/assets/party.png',
  };

  const tagsToRender = useMemo(() => {
    const base = [
      normalizedEvent.category,
      normalizedEvent.location,
      'MUSIC',
      'PARTY NIGHT',
      'BUY TICKETS',
    ].filter(Boolean) as string[];
    return Array.from(new Set(base));
  }, [normalizedEvent.category, normalizedEvent.location]);

  const artistsToRender = useMemo<EventArtistProps[]>(() => {
    return normalizedEvent.artists.map(a => ({
      photo: a.photoUrl && a.photoUrl.trim() !== '' ? a.photoUrl : '/assets/party.png',
      name: a.name,
      description: 'Artist',
      artistSocialLinks: [],
    }));
  }, [normalizedEvent.artists]);

  const organizerToRender = useMemo(() => {
    return {
      name: normalizedEvent.organizerName,
      description: normalizedEvent.description,
      avatarUrl: normalizedEvent.organizerLogo || '/assets/party.png',
    };
  }, [normalizedEvent.organizerName, normalizedEvent.description, normalizedEvent.organizerLogo]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black">
        <div className="text-white text-2xl">Loading event...</div>
      </div>
    );
  }

  const eventTicketsData =
    normalizedEvent.tickets.length > 0
      ? normalizedEvent.tickets.map(ticket => ({
          id: ticket.id,
          name: ticket.type,
          price: parseFloat(ticket.price),
          benefits: ticket.benefits || [],
          maxQuantity: parseInt(ticket.maxQuantity || '10'),
        }))
      : [];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black relative overflow-hidden text-white">
      {/* Background effects (match /events) */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-500/20 via-purple-900/40 to-black/80 pointer-events-none opacity-100 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none opacity-100 z-0"></div>
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      <div className="fixed top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 blur-3xl rounded-full z-0"></div>
      <div className="fixed bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/25 via-pink-500/25 to-purple-500/25 blur-3xl rounded-full z-0"></div>
      <div className="fixed top-1/2 right-10 w-60 h-60 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 blur-2xl rounded-full z-0"></div>

      <div className="relative z-10 grid grid-cols-3 max-[1280px]:grid-cols-1 gap-6 px-24 max-[1280px]:px-4 pt-8 my-20">
        {loadError && (
          <div className="col-span-3 mb-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-200">
            {loadError} — showing placeholders.
          </div>
        )}
        {/* 1) Banner */}
        <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-1">
          <EventBanner urls={normalizedEvent.bannerImageUrls || []} />
        </div>

        {/* 3) Data (Date/Time/Price) */}
        <div className="max-[1280px]:order-3">
          <EventData
            date={formatDate(normalizedEvent.date)}
            time={`${normalizedEvent.startTime} - ${normalizedEvent.endTime}`}
            startingPrice={Math.min(
              ...(normalizedEvent.tickets.length > 0
                ? normalizedEvent.tickets.map(t => parseFloat(t.price))
                : [35])
            )}
          />
        </div>

        {/* 2) Description */}
        <div className="col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-2">
          <EventDescription
            title={normalizedEvent.title}
            description={normalizedEvent.description}
          />
        </div>

        {/* 4) Artists */}
        <div className="flex flex-col bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-4 divide-y divide-gray-600/40 shadow-2xl">
          {artistsToRender.map(artist => (
            <div key={artist.name}>
              <EventArtist {...artist} />
            </div>
          ))}
        </div>

        {/* 5) Checkout */}
        <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-5">
          <EventCheckout
            eventId={eventId}
            userId={user?.id || undefined}
            eventTickets={eventTicketsData}
          />
        </div>

        {/* 6) Location + Tags + Organizer */}
        <div className="flex flex-col col-span-1 max-[1280px]:order-6 gap-6">
          <EventLocation
            address={normalizedEvent.address}
            location={normalizedEvent.location}
          />
          <Tags tags={tagsToRender} />
          <EventOrganizer {...organizerToRender} />
        </div>
      </div>
    </div>
  );
}
