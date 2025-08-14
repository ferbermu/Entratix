import React from 'react';
import Image from 'next/image';
import { Dropdown } from './Dropdown';

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
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  selectedValue,
  onValueChange,
  width = 'w-full',
}) => (
  <div
    className={`relative h-full flex items-center py-1 gap-3 justify-start pl-2 ${width} max-[700px]:w-full`}
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
      className="flex-1 min-w-0"
    />
  </div>
);
