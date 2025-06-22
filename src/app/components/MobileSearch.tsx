'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LocationModal } from './LocationModal';
import { Calendar } from './Calendar';
import { type DateRange } from 'react-day-picker';
import { format } from 'date-fns';

const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      className={className}
    >
      <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
    </svg>
  );
};

const CloseIcon = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="currentColor"
      className={className}
      onClick={onClick}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (searchTerm: string) => void;
}

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

export const MobileSearch = ({
  isOpen,
  onClose,
  onSearch,
}: MobileSearchProps) => {
  const [searchEvent, setSearchEvent] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [searchLocation, setSearchLocation] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [tempDate, setTempDate] = useState<DateRange | undefined>();

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
    if (isCalendarOpen) {
      setTempDate(date);
    }
  }, [isCalendarOpen, date]);

  const handleSearch = () => {
    const searchTerms = [searchEvent, date, searchLocation]
      .filter(Boolean)
      .join(' ');
    onSearch(searchTerms);
    onClose();
  };

  const handleConfirmDate = () => {
    setDate(tempDate);
    setIsCalendarOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 top-22 bg-[#1C1A1A] z-40">
        <div className="max-w-[870px] mx-auto h-full flex flex-col">
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg border border-[#3BAFBB] relative">
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
              {searchEvent && (
                <CloseIcon
                  onClick={() => setSearchEvent('')}
                  className="text-[#3BAFBB] cursor-pointer size-6"
                />
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-[#3BAFBB]">
              <div
                onClick={() => setIsCalendarOpen(true)}
                className="flex items-center gap-3 cursor-pointer w-full"
              >
                <Image
                  src="/assets/icons/search_bar/calendar_month.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
                <span
                  className={`${
                    date ? 'text-white' : 'text-[#3BAFBB]'
                  } bg-transparent outline-none text-md`}
                >
                  {date?.from
                    ? date.to
                      ? `${format(date.from, 'dd/MM/yyyy')} - ${format(
                          date.to,
                          'dd/MM/yyyy'
                        )}`
                      : format(date.from, 'dd/MM/yyyy')
                    : 'Date'}
                </span>
              </div>
              {date && (
                <CloseIcon
                  onClick={() => setDate(undefined)}
                  className="text-[#3BAFBB] cursor-pointer size-6"
                />
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-[#3BAFBB]">
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-3 w-full"
              >
                <Image
                  src="/assets/icons/search_bar/location.svg"
                  alt="location"
                  width={20}
                  height={20}
                />
                <span
                  className={`${
                    searchLocation ? 'text-white' : 'text-[#3BAFBB]'
                  } w-full bg-transparent outline-none text-md text-left`}
                >
                  {searchLocation || 'Location'}
                </span>
              </button>
              {searchLocation && (
                <CloseIcon
                  onClick={() => setSearchLocation('')}
                  className="text-[#3BAFBB] cursor-pointer size-6"
                />
              )}
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
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={setSearchLocation}
        locations={departments}
        selectedLocation={searchLocation}
      />
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1A1A] rounded-lg p-4 flex flex-col gap-4 w-full max-w-md border border-[#3BAFBB]">
            <Calendar
              mode="range"
              selected={tempDate}
              onSelect={setTempDate}
              className="w-full bg-transparent text-[#3BAFBB]"
            />
            <button
              onClick={handleConfirmDate}
              className="w-full bg-[#3BAFBB] text-white py-2 rounded-lg font-medium cursor-pointer flex items-center justify-center"
            >
              <SearchIcon className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
