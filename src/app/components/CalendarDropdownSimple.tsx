'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  placeholder = 'Date of Birth',
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [month, setMonth] = useState<Date>(date || new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const locationClass =
    location === 'right'
      ? 'right-0'
      : location === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';

  // Cierra el calendario si se hace click fuera (excepto en el trigger)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setMonth(date || new Date());
    onDateChange(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsCalendarOpen(prev => !prev)}
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
          value={selectedDate ? format(selectedDate, 'dd/MM/yyyy') : ''}
          readOnly
          className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent cursor-pointer"
        />
        <CaretDown className="text-[#3BAFBB]" size={32} />
      </div>

      {/* Dropdown */}
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className={`bg-[#1C1A1A] ${width} ${locationClass} absolute top-full mt-2 ml-1.5 z-50 transform transition-all duration-200 ease-in-out opacity-100 scale-100 shadow-lg`}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={month}
            onMonthChange={setMonth}
            captionLayout="dropdown"
            className="rounded-md border w-full bg-[#3BAFBB1A] text-[#3BAFBB] border-[#3BAFBB] shadow-xl"
            locale={es}
            showOutsideDays={false}
          />
        </div>
      )}
    </div>
  );
};
