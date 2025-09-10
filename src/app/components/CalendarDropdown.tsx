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
  containerClassName?: string; // Para personalizar el contenedor completo
  dropdownClassName?: string; // Para personalizar el dropdown interno
  iconClassName?: string; // Para personalizar el ícono
  textClassName?: string; // Para personalizar el texto
}

export const CalendarDropdown: React.FC<CalendarDropdownProps> = ({
  date,
  onDateChange,
  width = 'w-full',
  location = 'left',
  containerClassName,
  dropdownClassName,
  iconClassName,
  textClassName,
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
    <div
      className={
        containerClassName || `relative h-full flex items-center gap-3 ${width}`
      }
    >
      {/* Ícono a la izquierda (afuera del input) - Solo si no está oculto */}
      {iconClassName !== 'hidden' && (
        <div className="relative">
          <Image
            src="/assets/icons/search_bar/calendar_month.svg"
            alt="calendar"
            width={20}
            height={20}
            className={
              iconClassName ||
              'drop-shadow-[0_0_8px_rgba(59,175,187,0.6)] filter brightness-125'
            }
          />
        </div>
      )}

      {/* Caja estilo LocationDropdown */}
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(prev => !prev)}
        className={
          dropdownClassName ||
          'flex items-center flex-1 min-w-0 bg-gradient-to-r from-black/70 via-[#1C1A1A]/70 to-black/70 border border-[#3BAFBB66] hover:border-[#3BAFBB] focus-within:border-cyan-400 hover:shadow-[0_0_15px_rgba(59,175,187,0.4)] rounded-md px-4 py-2 cursor-pointer transition-all duration-300 shadow-lg'
        }
      >
        {/* Texto */}
        <p
          className={
            textClassName ||
            `flex-1 truncate font-medium drop-shadow-sm ${
              date?.from ? 'text-[#3BAFBB]' : 'text-[#3BAFBB]/80'
            }`
          }
        >
          {displayText}
        </p>

        {/* Botón X o Caret - Siempre alineado a la derecha */}
        <div className="flex-shrink-0">
          {date?.from ? (
            <X
              size={20}
              className="text-white cursor-pointer hover:text-cyan-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] hover:scale-110"
              onClick={e => {
                e.stopPropagation();
                onDateChange(undefined);
              }}
            />
          ) : (
            <CaretDown
              className="text-cyan-300/70 drop-shadow-[0_0_6px_rgba(0,255,255,0.5)] transition-all duration-300"
              size={20}
            />
          )}
        </div>
      </div>

      {/* Dropdown con calendario */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`bg-gradient-to-b from-[#1C1A1A]/35 via-black/45 to-[#1C1A1A]/35 ${width} ${locationClass} absolute top-full mt-4 z-[9999] shadow-2xl border border-[#3BAFBB]/30 rounded-lg backdrop-blur-sm`}
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={selectedDate => {
              onDateChange(selectedDate);
              // Cerrar dropdown después de seleccionar fecha
              if (selectedDate?.from && selectedDate?.to) {
                setIsOpen(false);
              } else if (selectedDate?.from && !selectedDate?.to) {
                // Si solo se seleccionó una fecha, mantener abierto para seleccionar el rango
                // El dropdown se cerrará cuando se complete el rango
              }
            }}
            className="rounded-md border w-full bg-gradient-to-b from-[#1C1A1A]/30 via-black/40 to-[#1C1A1A]/30 text-[#3BAFBB] border-[#3BAFBB] shadow-[0_0_25px_rgba(59,175,187,0.3)] backdrop-blur-sm"
            locale={es}
            showOutsideDays={false}
          />
        </div>
      )}
    </div>
  );
};
