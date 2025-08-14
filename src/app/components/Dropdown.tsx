'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CaretDown } from '@phosphor-icons/react';

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  className,
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
    <div ref={dropdownRef} className={`relative w-full ${className ?? ''}`}>
      <div
        className="relative cursor-pointer flex items-center w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={selectedValue}
          readOnly
          className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent cursor-pointer min-w-0"
        />
        <CaretDown className="text-[#3BAFBB]" size={30} />
      </div>
      {isOpen && (
        <div className="absolute w-full top-full left-0 mt-5 z-50 bg-[#1C1A1A] border border-[#3BAFBB] rounded-lg shadow-lg">
          <ul className="max-h-60 overflow-y-auto">
            {options.map(option => (
              <li
                key={option}
                className="p-2 text-[#3BAFBB] hover:bg-[#3BAFBB33] cursor-pointer"
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
