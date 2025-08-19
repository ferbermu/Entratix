import React, { useState, useRef } from 'react';
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
  customIcon?: React.ReactNode;
}

export const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  date,
  onDateChange,
  width = 'w-full',
  location = 'left',
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const locationClass =
    location === 'right'
      ? 'right-0'
      : location === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'left-0';

  React.useEffect(() => {
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Determinar el texto a mostrar
  const displayText = date?.from
    ? date.to
      ? `${format(date.from, 'dd/MM/yyyy')} - ${format(date.to, 'dd/MM/yyyy')}`
      : format(date.from, 'dd/MM/yyyy')
    : 'Date';

  return (
    <div className="relative w-full h-full">
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => setIsCalendarOpen(prev => !prev)}
        className={`h-full flex items-center py-1 gap-3 pl-2 pr-2 ${width} cursor-pointer border-l-[#3BAFBB33]`}
      >
        <Image
          src="/assets/icons/search_bar/calendar_month.svg"
          alt="calendar"
          width={16}
          height={16}
        />

        {/* 👇 AQUÍ ESTÁ EL CAMBIO PRINCIPAL 👇 */}
        {/* Reemplazamos el <input> por un <p> para un estilo idéntico */}
        <p className="flex-1 min-w-0 text-left truncate">
          <span
            className={
              date?.from
                ? 'text-[#3BAFBB]' // Color del valor seleccionado
                : 'text-[#3BAFBB]/70' // Color del placeholder (con opacidad para diferenciar)
            }
          >
            {displayText}
          </span>
        </p>

        {date?.from ? (
          <X
            size={20}
            className="text-[#3BAFBB] cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onDateChange(undefined);
            }}
          />
        ) : (
          <CaretDown className="text-[#3BAFBB]" size={20} />
        )}
      </div>

      {/* Dropdown */}
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
