'use client';
import React, { useState, useEffect, useRef } from 'react';
import { CaretDown } from '@phosphor-icons/react';

interface CustomDropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selected,
  onSelect,
  placeholder = 'Select an option',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Cerrar al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: '180px' }}
    >
      <button
        type="button"
        className="w-full h-11 cursor-pointer flex items-center justify-between gap-2 bg-[#3BAFBB1A] hover:bg-[#3BAFBB33] text-[#3BAFBB] border border-[#3BAFBB40] px-3 py-2 text-sm rounded-md truncate"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">{selected || placeholder}</span>
        <CaretDown size={12} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-[#1C1A1A] border border-[#3BAFBB40] rounded-md shadow-lg z-20 w-full">
          {options.map(option => (
            <button
              key={option}
              className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#3BAFBB1A] first:rounded-t-md last:rounded-b-md truncate"
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
