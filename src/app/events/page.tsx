'use client';

import { TwitterLogo, YoutubeLogo } from '@phosphor-icons/react';
import {
  EventArtist,
  EventArtistProps,
  ArtistSocialLinks,
} from './components/EventArtist';
import { EventBanner } from './components/EventBanner';
import { EventData } from './components/EventData';
import { EventDescription } from './components/EventDescription';

const EventArtistData: EventArtistProps[] = [
  {
    photo: '/assets/show3.jpg',
    name: 'YsY A',
    description: 'Artista de Trap',
    artistSocialLinks: [
      {
        url: 'https://www.youtube.com/channel/UC6ZqzTu-T77_yp1TCIIy93g',
        icon: '/assets/icons/social-media/twitter.svg',
      },
      {
        url: 'https://www.youtube.com/channel/UC6ZqzTu-T77_yp1TCIIy93g',
        icon: '/assets/icons/social-media/twitter.svg',
      },
      {
        url: 'https://www.youtube.com/channel/UC6ZqzTu-T77_yp1TCIIy93g',
        icon: '/assets/icons/social-media/twitter.svg',
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="grid grid-cols-3 max-[1280px]:grid-cols-1 gap-6 px-24 max-[1280px]:px-0 pt-8 my-20 bg-[#1C1A1A]  ">
      {/* 1. Banner: stays first on small */}
      <div className="col-span-2 max-[1280px]:col-span-1 max-[1280px]:order-1">
        <EventBanner />
      </div>

      {/* 2. Data: we’ll move this to 3rd on small */}
      <div className=" max-[1280px]:order-3">
        <EventData />
      </div>

      {/* 3. Descripción: force to 2nd on small */}
      <div className=" col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-2">
        {' '}
        <EventDescription
          title={'Phonothèque presenta apertura 2024'}
          description={
            'Lorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi laoreet. Feugiat habitant ut enim mollis viverra justo. Sit mus pulvinar risus interdum ut morbi neque malesuada ultricies. Consequat nec pellentesque in pellentesque lobortis sit nuncLorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi laoreet. Feugiat habitant ut enim mollis viverra justo. Sit mus pulvinar risus interdum ut morbi neque malesuada ultricies. Consequat nec pellentesque in pellentesque lobortis sit nuncLorem ipsum dolor sit amet consectetur. Convallis ullamcorper tortor nulla amet purus. Mi viverra viverra sed nisl sodales suscipit. Elit mauris malesuada tempor in at non laoreet interdum. Egestas semper aliquam facilisi laoreet. Feugiat habitant ut enim mollis viverra justo. Sit mus pulvinar risus interdum ut morbi neque malesuada ultricies. Consequat nec pellentesque in pellentesque lobortis sit nunc'
          }
        />
      </div>

      {/* 4. Artistas: comes after */}
      <div className=" col-span-3 max-[1280px]:col-span-1 text-center max-[1280px]:order-4">
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

      {/* 5. Checkout */}
      <div className="col-span-2 max-[1280px]:col-span-1 bg-amber-700 max-[1280px]:order-5">
        acá va a ir el checkout
      </div>

      {/* 6. Ubicación */}
      <div className="bg-blue-700 max-[1280px]:order-6">
        acá va a ir la ubicación
      </div>

      {/* 7. Tags */}
      <div className="col-start-3 max-[1280px]:col-span-1 bg-green-400 max-[1280px]:order-7">
        Tags
      </div>

      {/* 8. Organizer */}
      <div className="col-start-3 max-[1280px]:col-span-1 bg-purple-500 max-[1280px]:order-8">
        Organizer
      </div>
    </div>
  );
}
