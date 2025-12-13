'use client';

import { motion, Variants } from 'framer-motion';
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
import { getAllEventsAction, getEventByIdAction } from '../actions/events';
import { useAuth } from '../providers/AuthProvider';

// === DATA ===
const formatDateLong = (date: Date) =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

// === ANIMATION VARIANTS ===
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function Page() {
  const { user } = useAuth();
  const [eventTitle, setEventTitle] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  const [eventDateText, setEventDateText] = useState<string>('');
  const [eventTimeText, setEventTimeText] = useState<string>('');
  const [eventAddress, setEventAddress] = useState<string>('');
  const [eventLocationText, setEventLocationText] = useState<string>('');
  const [artistData, setArtistData] = useState<EventArtistProps[]>([]);
  const [ticketOptions, setTicketOptions] = useState<IEventTicketOptions[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [eventId, setEventId] = useState<string>('');
  const [organizer, setOrganizer] = useState<EventOrganizerProps>({
    name: '',
    description: '',
    avatarUrl: '/assets/party.png',
  });
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);

  const placeholderArtists: EventArtistProps[] = [
    {
      photo: '/assets/party.png',
      name: 'Artist One',
      description: 'Artist',
      artistSocialLinks: [],
    },
    {
      photo: '/assets/party.png',
      name: 'Artist Two',
      description: 'Artist',
      artistSocialLinks: [],
    },
    {
      photo: '/assets/party.png',
      name: 'Artist Three',
      description: 'Artist',
      artistSocialLinks: [],
    },
  ];

  const placeholderTickets: IEventTicketOptions[] = [
    { id: 'placeholder-1', ticketType: 'General Admission', price: 35 },
    { id: 'placeholder-2', ticketType: 'VIP', price: 80 },
  ];

  const placeholderTags = ['MUSIC', 'PARTY NIGHT', 'BUY TICKETS'];

  const artistsToRender = artistData.length > 0 ? artistData : placeholderArtists;
  const ticketsToRender =
    ticketOptions.length > 0 ? ticketOptions : placeholderTickets;
  const tagsToRender = tags.length > 0 ? tags : placeholderTags;
  const organizerToRender: EventOrganizerProps =
    organizer.name.trim().length > 0
      ? organizer
      : {
          name: 'Organizer',
          description: eventDescription || 'Organizer description',
          avatarUrl: '/assets/party.png',
        };

  useEffect(() => {
    const fetchEvent = async () => {
      const all = await getAllEventsAction();
      if (!all || all.length === 0) return;
      const first = all[0];
      const full = await getEventByIdAction(first.id);
      if (!full) return;

      setEventId(full.id);
      setEventTitle(full.title);
      setEventDescription(full.description);
      setEventDateText(formatDateLong(new Date(full.date)));
      setEventTimeText(`${full.startTime} - ${full.endTime}`);
      setEventAddress(full.address);
      setEventLocationText(full.location);

      const mappedArtists: EventArtistProps[] = (full.artists || []).map(a => ({
        photo: a.photoUrl || '/assets/party.png',
        name: a.name,
        description: 'Artist',
        artistSocialLinks: [],
      }));
      setArtistData(mappedArtists);

      const mappedTickets: IEventTicketOptions[] = (full.tickets || []).map(
        (t) => ({
          id: t.id,
          ticketType: t.type,
          price: parseFloat(t.price as unknown as string),
        })
      );
      setTicketOptions(mappedTickets);

      const images: string[] = [];
      if (full.carouselImageUrl) images.push(full.carouselImageUrl);
      if (
        Array.isArray(full.bannerImageUrls) &&
        full.bannerImageUrls.length > 0
      ) {
        images.push(...full.bannerImageUrls);
      }
      if (images.length === 0 && full.cardImageUrl) {
        images.push(full.cardImageUrl);
      }
      setBannerUrls(images);

      const derivedTags = Array.from(
        new Set(
          [
            full.category,
            full.location,
            'MUSIC',
            'PARTY NIGHT',
            'BUY TICKETS',
          ].filter(Boolean) as string[]
        )
      );
      setTags(derivedTags);

      setOrganizer({
        name: full.organizerName || 'Organizer',
        description: full.description,
        avatarUrl: full.organizerLogo || '/assets/party.png',
      });
    };

    fetchEvent();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black relative overflow-hidden">
      {/* Enhanced retrowave background effects - Fixed opacity */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-500/20 via-purple-900/40 to-black/80 pointer-events-none opacity-100 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none opacity-100 z-0"></div>

      {/* Retrowave grid background - Fixed opacity */}
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

      {/* Enhanced neon glow effects */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 blur-3xl rounded-full animate-pulse z-0"></div>
      <div className="fixed bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/25 via-pink-500/25 to-purple-500/25 blur-3xl rounded-full z-0"></div>
      <div className="fixed top-1/2 right-10 w-60 h-60 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 blur-2xl rounded-full z-0"></div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 grid grid-cols-3 max-[1280px]:grid-cols-1 gap-6 px-24 max-[1280px]:px-4 pt-8 my-20"
      >
        <motion.div
          variants={item}
          className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-1"
        >
          <EventBanner urls={bannerUrls.length > 0 ? bannerUrls : undefined} />
        </motion.div>

        <motion.div variants={item} className="max-[1280px]:order-3">
          <EventData
            date={eventDateText}
            time={eventTimeText}
            startingPrice={
              ticketsToRender.map(t => t.price).sort((a, b) => a - b)[0]
            }
          />
        </motion.div>

        <motion.div
          variants={item}
          className="col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-2"
        >
          <EventDescription
            title={eventTitle || 'Event'}
            description={eventDescription || '...'}
          />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-4 divide-y divide-gray-600/40  shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300"
        >
          {artistsToRender.map((artist, key) => (
            <motion.div key={key} variants={item}>
              <EventArtist {...artist} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-5"
        >
          <EventCheckout
            eventId={eventId}
            userId={user?.id}
            ticketOptions={ticketsToRender}
          />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col col-span-1 max-[1280px]:order-6 gap-6"
        >
          <EventLocation address={eventAddress} location={eventLocationText} />
          <Tags tags={tagsToRender} />
          <EventOrganizer {...organizerToRender} />
        </motion.div>
      </motion.div>
    </div>
  );
}
