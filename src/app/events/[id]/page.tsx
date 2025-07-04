'use client';

import { useEffect, useState, use } from 'react';
import { EventArtist, EventArtistProps } from '../components/EventArtist';
import { EventBanner } from '../components/EventBanner';
import { EventData } from '../components/EventData';
import { EventDescription } from '../components/EventDescription';
import {
  EventCheckout,
  IEventTicketOptions,
} from '../components/EventCheckout';
import { EventLocation } from '../components/EventLocation';
import { Tags } from '../components/Tags';
import {
  EventOrganizer,
  EventOrganizerProps,
} from '../components/EventOrganizer';

interface Event {
  id: number;
  imageUrl: string[];
  date: string;
  title: string;
  description: string;
  location: string;
  address: string;
  producer: {
    id: number;
    description: string;
    image: string;
    userId: number;
  };
  artists: Array<{
    eventId: number;
    artistId: number;
    assignedAt: string;
    artist: {
      id: number;
      name: string;
      description: string;
      socialLinks: string[];
      createdAt: string;
      updatedAt: string;
    };
  }>;
  tags: Array<{
    eventId: number;
    tagId: number;
    assignedAt: string;
    tag: {
      id: number;
      name: string;
    };
  }>;
  ticketTypes: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    eventId: number;
    createdAt: string;
    updatedAt: string;
  }>;
}

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Evento no encontrado');
        }
        const eventData: Event = await response.json();
        setEvent(eventData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Error al cargar el evento'
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1A1A]">
        <div className="text-white text-xl">Cargando evento...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1A1A]">
        <div className="text-white text-xl">
          {error || 'Evento no encontrado'}
        </div>
      </div>
    );
  }

  // Transformar datos de artistas para el componente EventArtist
  const eventArtistData: EventArtistProps[] = event.artists.map(
    artistOnEvent => ({
      photo: '/assets/show3.jpg', // Imagen por defecto, podrías agregar campo photo al modelo Artist
      name: artistOnEvent.artist.name,
      description: artistOnEvent.artist.description,
      artistSocialLinks: artistOnEvent.artist.socialLinks.map(
        (link, index) => ({
          url: link,
          icon: getSocialIcon(link),
        })
      ),
    })
  );

  // Transformar datos de tickets para el componente EventCheckout
  const eventCheckoutData: IEventTicketOptions[] = event.ticketTypes.map(
    ticket => ({
      id: ticket.id,
      ticketType: ticket.name,
      price: ticket.price,
    })
  );

  // Extraer nombres de tags
  const tagList = event.tags.map(tagOnEvent => tagOnEvent.tag.name);

  // Datos del organizador (productor)
  const eventOrganizerData: EventOrganizerProps = {
    name: 'Productor', // Podrías agregar nombre al modelo Producer
    description: event.producer.description,
    avatarUrl: event.producer.image.replace(/[\[\]]/g, ''), // Remover corchetes del string
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="grid grid-cols-3 max-[1280px]:grid-cols-1 gap-6 px-24 max-[1280px]:px-4 pt-8 my-20 bg-[#1C1A1A]">
      <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-1">
        <EventBanner />
      </div>

      <div className="max-[1280px]:order-3">
        <EventData />
      </div>

      <div className="col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-2">
        <EventDescription title={event.title} description={event.description} />
      </div>

      <div className="flex flex-col bg-[#4E4B4B]/20 border border-[#4E4B4B]/80 rounded-lg col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-4 divide-y divide-[#4E4B4B] px-6">
        {eventArtistData.map((item, key) => (
          <EventArtist
            key={key}
            photo={item.photo}
            name={item.name}
            description={item.description}
            artistSocialLinks={item.artistSocialLinks}
          />
        ))}
      </div>

      <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-5">
        <EventCheckout ticketOptions={eventCheckoutData} />
      </div>

      <div className="flex flex-col col-span-1 max-[1280px]:order-6 gap-6">
        <EventLocation />
        <Tags tags={tagList} />
        <EventOrganizer
          name={eventOrganizerData.name}
          description={eventOrganizerData.description}
          avatarUrl={eventOrganizerData.avatarUrl}
        />
      </div>
    </div>
  );
}

function getSocialIcon(url: string): string {
  if (url.includes('soundcloud'))
    return '/assets/icons/social-media/SoundcloudIcon.svg';
  if (url.includes('spotify'))
    return '/assets/icons/social-media/SpotifyIcon.svg';
  if (url.includes('youtube'))
    return '/assets/icons/social-media/YoutubeIcon.svg';
  if (url.includes('instagram'))
    return '/assets/icons/social-media/instagram.svg';
  if (url.includes('facebook'))
    return '/assets/icons/social-media/facebook.svg';
  if (url.includes('twitter')) return '/assets/icons/social-media/twitter.svg';
  return '/assets/icons/social-media/instagram.svg'; // Icono por defecto
}
