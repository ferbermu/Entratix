import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { CaretDown } from '@phosphor-icons/react';
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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const locationClass =
    location === 'right'
      ? 'right-0'
      : location === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';
  // Cierra el calendario si se hace click fuera
  React.useEffect(() => {
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

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="cursor-pointer border-l-[#3BAFBB33] flex items-center gap-3 pl-2 w-full justify-between"
      >
        <Image
          src="/assets/icons/search_bar/calendar_month.svg"
          alt="calendar"
          width={16}
          height={16}
        />
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
      </button>
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className={`bg-[#1C1A1A] ${width} ${locationClass} absolute top-full mt-5 ml-1.5 z-50 transform transition-all duration-200 ease-in-out opacity-100 scale-100 shadow-lg max-[1200px]:w-[36rem] max-[700px]:w-[calc(100vw-2rem)] max-[700px]:fixed max-[700px]:left-1/2 max-[700px]:-translate-x-1/2 max-[700px]:top-1/2 max-[700px]:-translate-y-1/2`}
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={onDateChange}
            className="rounded-md border w-full bg-[#3BAFBB1A] text-[#3BAFBB] border-[#3BAFBB] shadow-xl"
            locale={es}
            showOutsideDays={false}
          />
        </div>
      )}
    </div>
  );
};
