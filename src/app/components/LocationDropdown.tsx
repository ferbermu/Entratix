import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, CaretDown } from '@phosphor-icons/react';

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

interface LocationDropdownProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  width?: string;
  customIcon?: React.ReactNode;
  containerClassName?: string; // Para personalizar el contenedor completo
  dropdownClassName?: string; // Para personalizar el dropdown interno
  iconClassName?: string; // Para personalizar el ícono
  textClassName?: string; // Para personalizar el texto
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  selectedValue,
  onValueChange,
  width = 'w-full',
  containerClassName,
  dropdownClassName,
  iconClassName,
  textClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

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

  const displayText = selectedValue || 'Location';

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
            src="/assets/icons/search_bar/location.svg"
            alt="location"
            width={20}
            height={20}
            className={
              iconClassName ||
              'drop-shadow-[0_0_8px_rgba(59,175,187,0.6)] filter brightness-125'
            }
          />
        </div>
      )}

      {/* Caja estilo CalendarDropdown */}
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
              selectedValue ? 'text-[#3BAFBB]' : 'text-[#3BAFBB]/80'
            }`
          }
        >
          {displayText}
        </p>

        {/* Botón X o Caret - Siempre alineado a la derecha */}
        <div className="flex-shrink-0">
          {selectedValue ? (
            <X
              size={20}
              className="text-white cursor-pointer hover:text-cyan-300 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] hover:scale-110"
              onClick={e => {
                e.stopPropagation();
                onValueChange('');
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

      {/* Dropdown con opciones */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`bg-gradient-to-b from-[#1C1A1A]/35 via-black/45 to-[#1C1A1A]/35 ${width} left-0 absolute top-full mt-4 z-[9999] shadow-2xl border border-[#3BAFBB]/30 rounded-lg backdrop-blur-sm max-h-60 overflow-y-auto`}
        >
          {departments.map(department => (
            <div
              key={department}
              className="cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,175,187,0.3)] p-3 text-sm text-cyan-200 hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:text-cyan-100"
              onClick={() => {
                onValueChange(department);
                setIsOpen(false);
              }}
            >
              {department}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
