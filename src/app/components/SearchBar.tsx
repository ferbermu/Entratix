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
              ? ' bg-[#3BAFBB1A] border-x-0 border-t-0 border-b border-[#3BAFBB] rounded-none w-full max-w-none px-12'
              : 'bg-[#3BAFBB1A] border border-[#3BAFBB] max-w-[1400px]'
          }
        `}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2 w-full">
          {/* Icono fuera del recuadro */}
          <Image
            src="/assets/icons/search_bar/search.svg"
            alt="search"
            width={18}
            height={18}
            className="text-[#3BAFBB]"
          />

          {/* Input con mismo estilo que Calendar/Location */}
          <div
            className=" cursor-pointer
      flex items-center justify-between gap-2 px-4 py-2 rounded-md w-full
      bg-[#1C1A1A] border border-[#3BAFBB66] hover:border-[#3BAFBB]
    "
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Event"
              className="
        placeholder:text-[#3BAFBB] text-[#3BAFBB]
        bg-transparent outline-none w-full
      "
            />

            {/* Clear Button */}
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="text-[#3BAFBB] hover:text-white"
              >
                <X size={18} className="cursor-pointer" />
              </button>
            )}
          </div>
        </div>

        <div className="relative  border-l-[#3BAFBB33] border-l-2 flex items-center gap-2 justify-center pl-2 w-full">
          <CalendarDropdown
            width="w-full"
            date={date}
            onDateChange={handleDateSelect}
          />
        </div>

        <div className="relative w-full">
          <LocationDropdown
            selectedValue={location}
            onValueChange={setLocation}
          />
        </div>
      </div>
    </div>
  );
};
