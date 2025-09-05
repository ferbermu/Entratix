import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CaretDown, X } from '@phosphor-icons/react';
import { Calendar } from './Calendar';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import { type DateRange } from 'react-day-picker';

interface CalendarDropdownProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
  width?: string;
  location?: 'right' | 'left' | 'center';
}

export const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  date,
  onDateChange,
  width = 'w-full',
  location = 'left',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const locationClass =
    location === 'right'
      ? 'right-0'
      : location === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayText = date?.from
    ? date.to
      ? `${format(date.from, 'dd/MM/yyyy')} - ${format(date.to, 'dd/MM/yyyy')}`
      : format(date.from, 'dd/MM/yyyy')
    : 'Date';

  return (
    <div className={`relative h-full flex items-center gap-3 ${width}`}>
      {/* Ícono a la izquierda (afuera del input) */}
      <div className="relative">
        <Image
          src="/assets/icons/search_bar/calendar_month.svg"
          alt="calendar"
          width={16}
          height={16}
          className="drop-shadow-[0_0_8px_rgba(59,175,187,0.6)] filter brightness-125"
        />
      </div>

      {/* Caja estilo LocationDropdown */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center flex-1 min-w-0 bg-gradient-to-r from-black/80 via-[#1C1A1A]/90 to-black/80 border border-[#3BAFBB66] hover:border-[#3BAFBB] focus-within:border-cyan-400 hover:shadow-[0_0_15px_rgba(59,175,187,0.4)] rounded-md px-4 py-2 cursor-pointer transition-all duration-300 shadow-lg"
      >
        {/* Texto */}
        <p
          className={`flex-1 truncate font-medium drop-shadow-sm ${
            date?.from ? 'text-[#3BAFBB]' : 'text-[#3BAFBB]/80'
          }`}
        >
          {displayText}
        </p>

        {/* Botón X o Caret */}
        {date?.from ? (
          <X
            size={20}
            className="text-[#3BAFBB] cursor-pointer hover:text-cyan-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(59,175,187,0.8)] hover:scale-110"
            onClick={e => {
              e.stopPropagation();
              onDateChange(undefined);
            }}
          />
        ) : (
          <CaretDown
            className="text-[#3BAFBB] drop-shadow-[0_0_6px_rgba(59,175,187,0.5)] transition-all duration-300"
            size={20}
          />
        )}
      </div>

      {/* Dropdown con calendario */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`bg-gradient-to-b from-[#1C1A1A] via-black/95 to-[#1C1A1A] ${width} ${locationClass} absolute top-full mt-2 z-50 shadow-2xl border border-[#3BAFBB]/30 rounded-lg backdrop-blur-sm`}
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={onDateChange}
            className="rounded-md border w-full bg-gradient-to-b from-[#1C1A1A]/95 via-black/90 to-[#1C1A1A]/95 text-[#3BAFBB] border-[#3BAFBB] shadow-[0_0_25px_rgba(59,175,187,0.3)] backdrop-blur-sm"
            locale={es}
            showOutsideDays={false}
          />
        </div>
      )}
    </div>
  );
};
