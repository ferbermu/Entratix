'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
}

export const MobileSearch = ({
  isOpen,
  onClose,
  onSearch,
}: MobileSearchProps) => {
  const [searchEvent, setSearchEvent] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 870 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  const handleSearch = () => {
    const searchTerms = [searchEvent, searchDate, searchLocation]
      .filter(Boolean)
      .join(' ');
    onSearch(searchTerms);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-22 bg-[#1C1A1A] z-40">
      {' '}
      {/* Cambiado z-50 a z-40 y añadido top-22 */}
      <div className="max-w-[870px] mx-auto h-full flex flex-col">
        {/* Eliminamos el header con el botón de cerrar y el texto "Search" */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-[#3BAFBB]">
            <Image
              src="/assets/icons/search_bar/search.svg"
              alt="search"
              width={20}
              height={20}
            />
            <input
              type="text"
              value={searchEvent}
              onChange={e => setSearchEvent(e.target.value)}
              placeholder="Search Event"
              className="w-full bg-transparent text-white outline-none placeholder:text-[#3BAFBB] text-md"
            />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg border border-[#3BAFBB]">
            <Image
              src="/assets/icons/search_bar/calendar_month.svg"
              alt="calendar"
              width={20}
              height={20}
            />
            <input
              type="text"
              value={searchDate}
              onChange={e => setSearchDate(e.target.value)}
              placeholder="Date"
              className="w-full bg-transparent text-white outline-none placeholder:text-[#3BAFBB] text-md "
            />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg border border-[#3BAFBB]">
            <Image
              src="/assets/icons/search_bar/location.svg"
              alt="location"
              width={20}
              height={20}
            />
            <input
              type="text"
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
              placeholder="Location"
              className="w-full bg-transparent text-white outline-none placeholder:text-[#3BAFBB] text-md"
            />
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 w-full bg-[#3BAFBB] text-white py-4 rounded-lg font-medium cursor-pointer"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
