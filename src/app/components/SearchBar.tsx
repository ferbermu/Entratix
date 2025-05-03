import React from 'react';
import Image from 'next/image';

export const SearchBar = () => {
  return (
    <div className="flex  items-center justify-between bg-[#3BAFBB1A] gap-4 rounded-lg p-4  mx-25 border border-[#3BAFBB33] max-[870px]:hidden">
      <div className="flex items-center gap-3 ">
        <Image
          src="/assets/icons/search_bar/search.svg"
          alt="search"
          width={16}
          height={16}
          className="opacity-60"
        />
        <input
          type="text"
          placeholder="Search Event"
          className=" text-[#3BAFBB] w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-3  justify-center">
        <div className="h-8 w-[1px] bg-[#3BAFBB33]" />
        <Image
          src="/assets/icons/search_bar/calendar_month.svg"
          alt="calendar"
          width={16}
          height={16}
        />
        <input
          type="text"
          placeholder="Date"
          className=" text-[#3BAFBB] w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-3 justify-center">
        <div className="h-8 w-[1px] bg-[#3BAFBB33]" />
        <Image
          src="/assets/icons/search_bar/location.svg"
          alt="location"
          width={16}
          height={16}
        />
        <input
          type="text"
          placeholder="Location"
          className=" text-[#3BAFBB] w-full outline-none"
        />
      </div>

      <button className="bg-[#3BAFBB] px-6 py-2 rounded-lg flex hover:bg-[#2d8a93] transition-colors">
        <Image
          src="/assets/icons/nav_bar/search.svg"
          alt="search icon"
          width={16}
          height={16}
        />
      </button>
    </div>
  );
};
