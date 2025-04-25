import Image from 'next/image';
import React from 'react';

export const EventBanner = () => {
  return (
    <div className="w-full h-[400px] relative  ">
      <Image
        className="object-cover rounded-md "
        fill
        src={'/assets/show3.jpg'}
        alt={''}
        sizes="100vw"
      />
    </div>
  );
};
