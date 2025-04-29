import Image from 'next/image';
import React from 'react';

export const JoinNow = () => {
  return (
    <div className="mx-25 px-4 my-16 max-[1280px]:px-0 max-[1280px]:mx-4 ">
      <div className="relative  items-center justify-center  border border-[#1B5055] ">
        <Image
          src="/assets/party.png"
          alt="Background"
          fill
          className="object-cover z-0 opacity-40"
          priority
        />

        <div className="" />

        <div className="relative flex flex-col items-center gap-12 py-12 px-4 text-white">
          <p className="text-5xl font-semibold text-center">
            Join Us as a Partner
          </p>
          <p className="text-2xl text-center max-w-2xl mx-auto px-4 text-gray-400 ">
            Expand your business by selling with us. Join our partner program
            for increased visibility and sales opportunities.
          </p>
          <button className="border border-[#3BAFBB] rounded-lg bg-[#3BAFBB] h-14 w-48 cursor-pointer">
            Join Now!
          </button>
        </div>
      </div>
    </div>
  );
};
