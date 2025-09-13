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
        className="w-full h-11 cursor-pointer flex items-center justify-between gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-cyan-300 border border-pink-500/30 px-3 py-2 text-sm rounded-md truncate backdrop-blur-sm"
        onClick={() => setOpen(!open)}
      >
        <span className="truncate">{selected || placeholder}</span>
        <CaretDown size={12} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 border border-pink-500/30 rounded-md shadow-lg z-20 w-full">
          {options.map(option => (
            <button
              key={option}
              className="w-full text-left px-3 py-2 text-sm text-cyan-300 hover:bg-gradient-to-r hover:from-pink-500/40 hover:via-purple-500/40 hover:to-cyan-400/40 first:rounded-t-md last:rounded-b-md truncate"
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
