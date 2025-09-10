import React from 'react';
import Image from 'next/image';
import { Dropdown } from './Dropdown';
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
}) => (
  <div
    className={
      containerClassName ||
      `relative h-full flex items-center px-4 py-2 gap-3 justify-start pl-2 ${width} max-[700px]:w-full`
    }
  >
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
    <Dropdown
      options={departments}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      placeholder="Location"
      className={
        dropdownClassName ||
        'flex-1 min-w-0 bg-gradient-to-r from-black/70 via-[#1C1A1A]/70 to-black/70 border border-[#3BAFBB66] hover:border-[#3BAFBB] focus-within:border-cyan-400 focus-within:shadow-[0_0_15px_rgba(59,175,187,0.4)] rounded-md transition-all duration-300 shadow-lg'
      }
      customIcon={
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
      }
    />
  </div>
);
