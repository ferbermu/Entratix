import React from 'react';
import Image from 'next/image';
import { Dropdown } from './Dropdown';
import { X } from '@phosphor-icons/react';

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
  customIcon?: React.ReactNode; // 👈 NUEVO
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  selectedValue,
  onValueChange,
  width = 'w-full',
}) => (
  <div
    className={`relative h-full flex items-center px-4 py-2 gap-3 justify-start pl-2 ${width} max-[700px]:w-full`}
  >
    <Image
      src="/assets/icons/search_bar/location.svg"
      alt="location"
      width={16}
      height={16}
    />
    <Dropdown
      options={departments}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      placeholder="Location"
      className="flex-1 min-w-0 bg-[#1C1A1A]  border border-[#3BAFBB66] hover:border-[#3BAFBB] rounded-md "
      customIcon={
        selectedValue ? (
          <X
            size={20}
            className="text-[#3BAFBB] cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onValueChange('');
            }}
          />
        ) : undefined
      }
    />
  </div>
);
