'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { cn } from '../../lib/cn';

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Dropdown = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  className,
  icon,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onValueChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative w-full', className)}>
      <div
        className="w-full relative cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {icon}
          <input
            type="text"
            placeholder={placeholder}
            value={selectedValue}
            readOnly
            className="placeholder:text-[#3BAFBB] text-[#3BAFBB] outline-none bg-transparent cursor-pointer"
          />
        </div>
        <CaretDown className="text-[#3BAFBB]" size={30} />
      </div>
      {isOpen && (
        <div className="absolute w-full top-full left-0 mt-5 z-50 bg-[#1C1A1A] border border-[#3BAFBB] rounded-lg shadow-lg">
          <ul className="max-h-60 overflow-y-auto no-scrollbar">
            {options.map(option => (
              <li
                key={option}
                className="px-2 py-4 text-[#3BAFBB] hover:bg-[#3BAFBB33] cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
