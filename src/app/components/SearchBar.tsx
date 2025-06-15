'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { CaretDown } from '@phosphor-icons/react';
import { Calendar } from './Calendar';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { Dropdown } from './Dropdown';

const departments = [
  'Artigas',
  'Canelones',
  'Cerro Largo',
  'Colonia',
  'Durazno',
  'Flores',
  'Florida',
  'Lavalleja',
  'Maldonado',
  'Montevideo',
  'Paysandú',
  'Río Negro',
  'Rivera',
  'Rocha',
  'Salto',
  'San José',
  'Soriano',
  'Tacuarembó',
  'Treinta y Tres',
];

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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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
    const value = e.target.value;
    setSearchTerm(value);
  };
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
        <div className="flex items-center gap-3 w-full">
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

        <div className="relative w-full ">
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="cursor-pointer border-l-[#3BAFBB33] border-l-2 flex items-center gap-3 pl-2 w-full justify-between"
          >
            <Image
              src="/assets/icons/search_bar/calendar_month.svg"
              alt="calendar"
              width={16}
              height={16}
            />{' '}
            <input
              type="text"
              placeholder="Date"
              value={
                date?.from
                  ? date.to
                    ? `${format(date.from, 'dd/MM/yyyy')} - ${format(
                        date.to,
                        'dd/MM/yyyy'
                      )}`
                    : format(date.from, 'dd/MM/yyyy')
                  : ''
              }
              readOnly
              className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent cursor-pointer"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            />
            <CaretDown className="text-[#3BAFBB]" size={32} />
          </button>{' '}
          {isCalendarOpen && (
            <div
              ref={calendarRef}
              className="bg-[#1C1A1A] absolute w-full top-full left-0 mt-5 ml-1.5 z-50 transform transition-all duration-200 ease-in-out opacity-100 scale-100 shadow-lg max-sm:fixed max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:top-1/2 max-sm:-translate-y-1/2"
            >
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border w-full bg-[#3BAFBB1A] text-[#3BAFBB] border-[#3BAFBB] shadow-xl max-sm:w-[calc(100vw-2rem)]"
                locale={es}
                showOutsideDays={false}
              />
            </div>
          )}
        </div>

        <div className="relative border-l-[#3BAFBB33] border-l-2 flex items-center gap-3 justify-center pl-2 w-full">
          <Image
            src="/assets/icons/search_bar/location.svg"
            alt="location"
            width={16}
            height={16}
          />
          <Dropdown
            options={departments}
            selectedValue={location}
            onValueChange={setLocation}
            placeholder="Location"
          />
        </div>
      </div>
    </div>
  );
};
