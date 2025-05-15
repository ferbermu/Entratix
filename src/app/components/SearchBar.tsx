'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > 700;
      setIsSticky(shouldBeSticky);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div
      className={`
        w-full transition-all duration-500 ease-in-out
        ${
          isSticky
            ? 'fixed top-[88px] left-0 right-0 z-40 px-0 w-full bg-[#1C1A1A]'
            : ''
        }
      `}
    >
      <div
        className={`
          flex items-center justify-between gap-4 rounded-lg p-4 
          transition-all duration-500 ease-in-out
          mx-auto max-[870px]:hidden
          ${
            isSticky
              ? 'bg-black/95 border-x-0 border-t-0 border-b border-[#3BAFBB] rounded-none w-full max-w-none px-12'
              : 'bg-[#3BAFBB1A] border border-[#3BAFBB] max-w-[1400px]'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/icons/search_bar/search.svg"
            alt="search"
            width={16}
            height={16}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Event"
            className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent"
          />
        </div>

        <div className="border-l-[#3BAFBB33] border-l-2 flex items-center gap-3 justify-center pl-2">
          <Image
            src="/assets/icons/search_bar/calendar_month.svg"
            alt="calendar"
            width={16}
            height={16}
          />
          <input
            type="text"
            placeholder="Date"
            className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent"
          />
        </div>

        <div className="border-l-[#3BAFBB33] border-l-2 flex items-center gap-3 justify-center pl-2">
          <Image
            src="/assets/icons/search_bar/location.svg"
            alt="location"
            width={16}
            height={16}
          />
          <input
            type="text"
            placeholder="Location"
            className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent"
          />
        </div>

        <button
          className={`
            border border-[#2d8a93] px-6 py-2 rounded-lg flex 
            hover:bg-[#2d8a93]/30 transition-colors cursor-pointer
            ${isSticky ? 'hover:bg-[#3BAFBB]/20' : ''}
          `}
        >
          <Image
            src="/assets/icons/nav_bar/search.svg"
            alt="search icon"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};
