'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { type DateRange } from 'react-day-picker';
import { LocationDropdown } from './LocationDropdown';
import { CalendarDropdown } from './CalendarDropdown';
import { X } from '@phosphor-icons/react';

interface SearchBarProps {
  onFilterChange: (filters: {
    searchTerm: string;
    dateRange?: DateRange;
    location: string;
  }) => void;
}

export const SearchBar = ({ onFilterChange }: SearchBarProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeSticky = window.scrollY > 700;
      setIsSticky(shouldBeSticky);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    onFilterChange({ searchTerm, dateRange: date, location });
  }, [searchTerm, date, location, onFilterChange]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => setSearchTerm('');

  const handleDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
  };

  return (
    <div
      className={`
        w-full transition-all duration-500 ease-in-out rounded-lg 
        ${
          isSticky
            ? 'fixed top-[88px] left-0 right-0 z-30 px-0 w-full bg-[#1C1A1A] '
            : 'bg-[#1C1A1A]'
        }
      `}
    >
      <div
        className={`
          flex items-center justify-between gap-4 rounded-lg p-4 
          transition-all duration-500 ease-in-out 
          mx-auto max-[870px]:hidden relative
          ${
            isSticky
              ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border-x-0 border-t-0 border-b border-pink-500/50 rounded-lg w-full max-w-none px-12 shadow-[0_0_25px_rgba(255,20,147,0.3)] backdrop-blur-sm'
              : 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border border-pink-500/50 max-w-[1400px] shadow-[0_0_25px_rgba(255,20,147,0.3)]'
          }
        `}
      >
        {/* Neon glow background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-400/5 blur-xl"></div>
        <div className="absolute inset-0 border border-pink-500/20 rounded-lg shadow-inner"></div>

        {/* Search Input */}
        <div className="flex items-center gap-2 w-full relative z-10">
          {/* Icono fuera del recuadro */}
          <div className="relative">
            <Image
              src="/assets/icons/search_bar/search.svg"
              alt="search"
              width={18}
              height={18}
              className="drop-shadow-[0_0_8px_rgba(59,175,187,0.6)] filter brightness-125"
            />
          </div>

          {/* Input con mismo estilo que Calendar/Location */}
          <div className="cursor-pointer flex items-center justify-between gap-2 px-4 py-2 rounded-lg w-full bg-gradient-to-r from-black/80 via-[#1C1A1A]/90 to-black/80 border border-[#3BAFBB66] hover:border-[#3BAFBB] focus-within:border-cyan-400 focus-within:shadow-[0_0_15px_rgba(59,175,187,0.4)] transition-all duration-300 shadow-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Event"
              className="placeholder:text-[#3BAFBB]/80 text-[#3BAFBB] bg-transparent outline-none w-full font-medium drop-shadow-sm"
            />

            {/* Clear Button */}
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="text-[#3BAFBB] hover:text-cyan-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,175,187,0.8)] hover:scale-110"
              >
                <X size={18} className="cursor-pointer" />
              </button>
            )}
          </div>
        </div>

        <div className="relative border-l-pink-500/40 border-l-2 flex items-center gap-2 justify-center pl-2 w-full z-[10000] h-6">
          <CalendarDropdown
            width="w-full"
            date={date}
            onDateChange={handleDateSelect}
          />
        </div>

        <div className="relative border-l-pink-500/40 border-l-2 flex items-center gap-2 justify-center pl-2 w-full z-[10000] h-6">
          <LocationDropdown
            selectedValue={location}
            onValueChange={setLocation}
          />
        </div>
      </div>
    </div>
  );
};
