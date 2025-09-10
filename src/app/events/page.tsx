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

// === DATA ===
const EventArtistData: EventArtistProps[] = [
  {
    photo: '/assets/show3.jpg',
    name: 'YsY A',
    description: 'Artista de Trap',
    artistSocialLinks: [
      {
        url: 'https://soundcloud.com/ysyashakur',
        icon: '/assets/icons/social-media/SoundcloudIcon.svg',
      },
      {
        url: 'https://open.spotify.com/intl-es/artist/2qWK8K2Jfh67UqtwY8tCW6',
        icon: '/assets/icons/social-media/SpotifyIcon.svg',
      },
      {
        url: 'https://www.youtube.com/channel/UC6ZqzTu-T77_yp1TCIIy93g',
        icon: '/assets/icons/social-media/YoutubeIcon.svg',
      },
    ],
  },
  {
    photo: '/assets/show5.jpg',
    name: 'TussiWarriors',
    description: 'Artistas de Trap',
    artistSocialLinks: [
      {
        url: 'https://soundcloud.com/tussiwarriors-music',
        icon: '/assets/icons/social-media/SoundcloudIcon.svg',
      },
      {
        url: 'https://open.spotify.com/intl-es/artist/4iVXdkoTNazv6MQh1wojj0',
        icon: '/assets/icons/social-media/SpotifyIcon.svg',
      },
      {
        url: 'https://www.youtube.com/@tussiwarriors',
        icon: '/assets/icons/social-media/YoutubeIcon.svg',
      },
    ],
  },
];

const EventCheckoutData: IEventTicketOptions[] = [
  { id: 1, ticketType: 'Early Bird', price: 700 },
  { id: 2, ticketType: 'Normal', price: 900 },
  { id: 3, ticketType: 'VIP', price: 1200 },
  { id: 4, ticketType: 'Table', price: 2400 },
  { id: 5, ticketType: 'Table VIP', price: 3200 },
];

const tagList = [
  'MUSIC PARTY',
  'PARTY NIGHT',
  'FUN NIGHT',
  'FUN MUSIC',
  'BUY TICKETS',
  'URUGUAY PARTY',
  'ELECTRONIC MUSIC',
  'ARTIST NAME XYZ',
];

const EventOrganizerData: EventOrganizerProps = {
  name: 'Name',
  description:
    'Lorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi.',
  avatarUrl: '/assets/show5.jpg',
};

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
        viewport={{ once: false, amount: 0.2 }}
        className="relative z-10 grid grid-cols-3 max-[1280px]:grid-cols-1 gap-6 px-24 max-[1280px]:px-4 pt-8 my-20"
      >
        <motion.div
          variants={item}
          className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-1"
        >
          <EventBanner />
        </motion.div>

        <motion.div variants={item} className="max-[1280px]:order-3">
          <EventData />
        </motion.div>

        <motion.div
          variants={item}
          className="col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-2"
        >
          <EventDescription
            title={'Phonothèque presenta apertura 2024'}
            description={
              'Lorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi laoreet. Feugiat habitant ut enim mollis viverra justo...'
            }
          />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-4 divide-y divide-gray-600/40 px-6 shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300"
        >
          {EventArtistData.map((artist, key) => (
            <motion.div key={key} variants={item}>
              <EventArtist {...artist} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-5"
        >
          <EventCheckout ticketOptions={EventCheckoutData} />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col col-span-1 max-[1280px]:order-6 gap-6"
        >
          <EventLocation />
          <Tags tags={tagList} />
          <EventOrganizer {...EventOrganizerData} />
        </motion.div>
      </motion.div>
    </div>
  );
}
