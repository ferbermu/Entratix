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
import {
  EventWithRelations,
  SocialLink,
  convertUrlsToSocialLinks,
} from '@/types/prisma';

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [event, setEvent] = useState<EventWithRelations | null>(null);
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
        const eventData: EventWithRelations = await response.json();
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
    (artistOnEvent: EventWithRelations['artists'][0]) => {
      // Convertir array de URLs a SocialLink[]
      const socialLinks = convertUrlsToSocialLinks(
        artistOnEvent.artist.socialLinks
      );

      return {
        photo: artistOnEvent.artist.photo || '/assets/show3.jpg', // Usar photo del artista o imagen por defecto
        name: artistOnEvent.artist.name,
        description: artistOnEvent.artist.description,
        artistSocialLinks: socialLinks,
      };
    }
  );

  // Transformar datos de tickets para el componente EventCheckout
  const eventCheckoutData: IEventTicketOptions[] = event.ticketTypes.map(
    (ticket: EventWithRelations['ticketTypes'][0]) => ({
      id: ticket.id,
      ticketType: ticket.name,
      price: ticket.price,
    })
  );

  // Extraer nombres de tags
  const tagList = event.tags.map(
    (tagOnEvent: EventWithRelations['tags'][0]) => tagOnEvent.tag.name
  );

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
