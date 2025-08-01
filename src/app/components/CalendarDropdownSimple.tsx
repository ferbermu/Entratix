import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { CaretDown } from '@phosphor-icons/react';
import { Calendar } from './Calendar';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

interface CalendarDropdownSimpleProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  width?: string;
  location?: 'right' | 'left' | 'center';
  placeholder?: string;
}

export const CalendarDropdownSimple: React.FC<CalendarDropdownSimpleProps> = ({
  date,
  onDateChange,
  width = 'w-full',
  location = 'left',
  placeholder = 'Date of Birth', // Placeholder por defecto
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const locationClass =
    location === 'right'
      ? 'right-0'
      : location === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';

  // Close calendar when clicking outside
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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    onDateChange(selectedDate);
    setIsCalendarOpen(false);
  };

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
          placeholder={placeholder}
          value={date ? format(date, 'dd/MM/yyyy') : ''}
          readOnly
          className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent cursor-pointer"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        />
        <CaretDown className="text-[#3BAFBB]" size={32} />
      </button>
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className={`bg-[#1C1A1A] ${width} ${locationClass} absolute top-full mt-5 ml-1.5 z-50 transform transition-all duration-200 ease-in-out opacity-100 scale-100 shadow-lg max-sm:fixed max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:top-1/2 max-sm:-translate-y-1/2`}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border w-full bg-[#3BAFBB1A] text-[#3BAFBB] border-[#3BAFBB] shadow-xl max-sm:w-[calc(100vw-2rem)]"
            locale={es}
            showOutsideDays={false}
          />
        </div>
      )}
    </div>
  );
};
