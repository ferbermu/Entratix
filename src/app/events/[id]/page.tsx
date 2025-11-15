'use client';

import { EventArtist, EventArtistProps } from './components/EventArtist';
import { EventBanner } from './components/EventBanner';
import { EventData } from './components/EventData';
import { EventDescription } from './components/EventDescription';
import { EventCheckout, IEventTicketOptions } from './components/EventCheckout';
import { EventLocation } from './components/EventLocation';
import { Tags } from './components/Tags';
import {
  EventOrganizer,
  EventOrganizerProps,
} from './components/EventOrganizer';
import { useEffect, useState } from 'react';
import { getEventByIdAction } from '../../actions/events';
import { useParams } from 'next/navigation';
import { useAuthRedux } from '../../login/hooks/useAuthRedux';

export default function Page() {
  const params = useParams();
  const eventId = params.id as string;
  const { user } = useAuthRedux();

  const [eventData, setEventData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const data = await getEventByIdAction(eventId);
        setEventData(data);
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1A1A]">
        <div className="text-white text-xl">Cargando evento...</div>
      </div>
    );
  }

  if (!eventData || !eventData.event) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1C1A1A]">
        <div className="text-white text-xl">Evento no encontrado</div>
      </div>
    );
  }

  const { event, tickets, artists, tags } = eventData;

  // Calculate minimum ticket price
  const minPrice =
    tickets.length > 0
      ? Math.min(...tickets.map((t: any) => parseFloat(t.price)))
      : 0;

  // Format artists data
  const eventArtistsData: EventArtistProps[] = artists.map((artist: any) => ({
    photo: artist.photoUrl || '/assets/show3.jpg',
    name: artist.name,
    description: artist.description || 'Artista',
    artistSocialLinks: artist.socialLinks.map((link: any) => ({
      url: link.url,
      icon:
        link.platform === 'spotify'
          ? '/assets/icons/social-media/SpotifyIcon.svg'
          : link.platform === 'soundcloud'
          ? '/assets/icons/social-media/SoundcloudIcon.svg'
          : link.platform === 'youtube'
          ? '/assets/icons/social-media/YoutubeIcon.svg'
          : '/assets/icons/social-media/SpotifyIcon.svg',
    })),
  }));

  // Format tickets data
  const eventTicketsData: IEventTicketOptions[] = tickets.map(
    (ticket: any) => ({
      id: ticket.id, // Use the actual ticket UUID
      ticketType: ticket.type,
      price: parseFloat(ticket.price),
      quantity: ticket.quantity,
    })
  );

  const eventOrganizerData: EventOrganizerProps = {
    name: event.organizerName || 'Organizador',
    description: event.organizerDescription || 'Información del organizador',
    avatarUrl: event.organizerAvatarUrl || '/assets/show5.jpg',
  };

  return (
    <div className="grid grid-cols-3 max-[1280px]:grid-cols-1 gap-6 px-24 max-[1280px]:px-4 pt-8 my-20 bg-[#1C1A1A]">
      <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-1">
        <EventBanner bannerImageUrls={event.bannerImageUrls} />
      </div>

      <div className="max-[1280px]:order-3">
        <EventData
          date={event.date}
          startTime={event.startTime}
          endTime={event.endTime}
          minPrice={minPrice}
        />
      </div>

      <div className="col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-2">
        <EventDescription title={event.title} description={event.description} />
      </div>

      {eventArtistsData.length > 0 && (
        <div className="flex flex-col bg-[#4E4B4B]/20 border border-[#4E4B4B]/80 rounded-lg col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-4 divide-y divide-[#4E4B4B] px-6">
          {eventArtistsData.map((item, key) => (
            <EventArtist
              key={key}
              photo={item.photo}
              name={item.name}
              description={item.description}
              artistSocialLinks={item.artistSocialLinks}
            />
          ))}
        </div>
      )}

      <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-5">
        <EventCheckout
          eventId={eventId}
          userId={user?.id}
          ticketOptions={eventTicketsData}
        />
      </div>

      <div className="flex flex-col col-span-1 max-[1280px]:order-6 gap-6">
        <EventLocation address={event.address} location={event.location} />
        {tags.length > 0 && <Tags tags={tags} />}
        <EventOrganizer
          name={eventOrganizerData.name}
          description={eventOrganizerData.description}
          avatarUrl={eventOrganizerData.avatarUrl}
        />
      </div>
    </div>
  );
}
