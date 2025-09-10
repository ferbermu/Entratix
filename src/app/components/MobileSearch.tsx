'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from '@phosphor-icons/react';
import { LocationDropdown } from './LocationDropdown';
import { CalendarDropdown } from './CalendarDropdown';
import { type DateRange } from 'react-day-picker';

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
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>();
  const [selectedLocation, setSelectedLocation] = useState('');

  const resetSearch = () => {
    setSearchEvent('');
    setSelectedDate(undefined);
    setSelectedLocation('');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 870 && isOpen) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      resetSearch();
    }
  }, [isOpen]);

  const handleSearch = () => {
    const dateString = selectedDate?.from
      ? selectedDate.to
        ? `${selectedDate.from.toLocaleDateString()} - ${selectedDate.to.toLocaleDateString()}`
        : selectedDate.from.toLocaleDateString()
      : '';

    const searchTerms = [searchEvent, dateString, selectedLocation]
      .filter(Boolean)
      .join(' ');
    onSearch(searchTerms);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99] md:hidden">
      <div className="absolute inset-0 bg-black">
        {/* Capa base completamente opaca */}
        <div className="absolute inset-0 bg-black"></div>
        {/* Enhanced retrowave background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 via-purple-900/50 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none"></div>

        {/* Retrowave grid background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute inset-0"
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
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/25 via-pink-500/25 to-purple-500/25 blur-3xl rounded-full"></div>

        <div className="max-w-[870px] mx-auto h-full flex flex-col relative z-10">
          {/* Header con botón de cerrar */}
          <div className="flex justify-between items-center p-4 border-b border-pink-500/30">
            <h2 className="text-2xl font-condensed font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text">
              Search Events
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-pink-500/20 transition-colors border border-cyan-400/50 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10"
            >
              <X
                size={24}
                className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
              />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-cyan-400/50 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 hover:from-pink-500/15 hover:via-purple-500/15 hover:to-cyan-400/15 transition-all duration-300">
              <Image
                src="/assets/icons/search_bar/search.svg"
                alt="search"
                width={20}
                height={20}
                className="drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
              />
              <input
                type="text"
                value={searchEvent}
                onChange={e => setSearchEvent(e.target.value)}
                placeholder="Search Event"
                className="w-full bg-transparent text-white outline-none placeholder:text-cyan-300/70 text-md focus:placeholder:text-pink-400/50 transition-colors"
              />
            </div>

            {/* Calendar Dropdown - Estructura idéntica al input de search */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-cyan-400/50 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 hover:from-pink-500/15 hover:via-purple-500/15 hover:to-cyan-400/15 transition-all duration-300">
              <Image
                src="/assets/icons/search_bar/calendar_month.svg"
                alt="calendar"
                width={20}
                height={20}
                className="drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]"
              />
              <CalendarDropdown
                date={selectedDate}
                onDateChange={setSelectedDate}
                width="w-full"
                location="center"
                containerClassName="w-full"
                dropdownClassName="flex items-center justify-between w-full bg-transparent cursor-pointer px-0 py-0 rounded-none border-none shadow-none"
                iconClassName="hidden"
                textClassName={`flex-1 bg-transparent outline-none font-medium text-md transition-colors ${
                  selectedDate?.from ? 'text-white' : 'text-cyan-300/70'
                }`}
              />
            </div>

            {/* Location Dropdown - Estructura idéntica al input de search */}
            <div className="flex items-center gap-3 p-4 rounded-lg border border-cyan-400/50 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 hover:from-pink-500/15 hover:via-purple-500/15 hover:to-cyan-400/15 transition-all duration-300">
              <Image
                src="/assets/icons/search_bar/location.svg"
                alt="location"
                width={20}
                height={20}
                className="drop-shadow-[0_0_8px_rgba(128,0,255,0.6)]"
              />
              <LocationDropdown
                selectedValue={selectedLocation}
                onValueChange={setSelectedLocation}
                width="w-full"
                containerClassName="w-full"
                dropdownClassName="flex items-center justify-between w-full bg-transparent cursor-pointer px-0 py-0 rounded-none border-none shadow-none"
                iconClassName="hidden"
                textClassName={`text-white hover:text-cyan-300 transition-all duration-300 ${
                  !selectedLocation ? 'text-cyan-300/70' : ''
                }`}
              />
            </div>

            <button
              onClick={handleSearch}
              className="mt-4 w-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 border border-cyan-400 rounded-lg text-cyan-300 py-4 font-bold cursor-pointer hover:from-pink-500/30 hover:via-purple-500/30 hover:to-cyan-400/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
