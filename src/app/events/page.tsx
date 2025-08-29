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
  {
    id: 1,
    ticketType: 'Early Bird',
    price: 700,
  },
  {
    id: 2,
    ticketType: 'Normal',
    price: 900,
  },
  {
    id: 3,
    ticketType: 'VIP',
    price: 1200,
  },
  {
    id: 4,
    ticketType: 'Table',
    price: 2400,
  },
  {
    id: 5,
    ticketType: 'Table VIP',
    price: 3200,
  },
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
export default function Page() {
  return (
    <div className="grid grid-cols-3 max-[1280px]:grid-cols-1 gap-6 px-24 max-[1280px]:px-4 pt-8 my-20 ">
      <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-1">
        <EventBanner />
      </div>

      <div className="max-[1280px]:order-3">
        <EventData />
      </div>

      <div className="col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-2">
        <EventDescription
          title={'Phonothèque presenta apertura 2024'}
          description={
            'Lorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi laoreet. Feugiat habitant ut enim mollis viverra justo. Sit mus pulvinar risus interdum ut morbi neque malesuada ultricies. Consequat nec pellentesque in pellentesque lobortis sit nuncLorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi laoreet. Feugiat habitant ut enim mollis viverra justo. Sit mus pulvinar risus interdum ut morbi neque malesuada ultricies. Consequat nec pellentesque in pellentesque lobortis sit nuncLorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi laoreet. Feugiat habitant ut enim mollis viverra justo. Sit mus pulvinar risus interdum ut morbi neque malesuada ultricies. Consequat nec pellentesque in pellentesque lobortis sit nunc'
          }
        />
      </div>

      <div className="flex flex-col bg-[#4E4B4B]/20 border border-[#4E4B4B]/80 rounded-lg col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-4 divide-y divide-[#4E4B4B] px-6">
        {EventArtistData.map((item, key) => (
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
        <EventCheckout ticketOptions={EventCheckoutData} />
      </div>

      <div className="flex flex-col col-span-1 max-[1280px]:order-6 gap-6">
        <EventLocation />
        <Tags tags={tagList} />
        <EventOrganizer
          name={EventOrganizerData.name}
          description={EventOrganizerData.description}
          avatarUrl={EventOrganizerData.avatarUrl}
        />
      </div>
    </div>
  );
}
