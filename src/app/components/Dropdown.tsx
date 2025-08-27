import { CaretDown } from '@phosphor-icons/react';
import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  customIcon?: ReactNode;
  variant?: 'default' | 'simple';
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Location',
  className = '',
  customIcon,
  variant = 'default',
}) => {
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger */}
      {variant === 'default' ? (
        <div
          className="flex items-center justify-between cursor-pointer 
                     text-[#3BAFBB] 
                     rounded-md px-4 py-2 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate text-md">
            {selectedValue || placeholder}
          </span>
          {customIcon ?? <CaretDown className="text-[#3BAFBB]" size={20} />}
        </div>
      ) : (
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
          {customIcon ?? <CaretDown className="text-[#3BAFBB]" size={30} />}
        </div>
      )}

      {/* Options */}
      {isOpen && (
        <div
          className={`absolute z-10 mt-2 w-full max-h-60 overflow-y-auto rounded-lg shadow-lg
          ${
            variant === 'default'
              ? 'bg-[#1E1E1E] border border-[#3BAFBB66]'
              : 'bg-[#1C1A1A] border border-[#3BAFBB] mt-5'
          }`}
        >
          {options.map(option => (
            <div
              key={option}
              className={`cursor-pointer transition-colors
              ${
                variant === 'default'
                  ? 'px-3 py-2 text-sm text-[#E0E0E0] hover:bg-[#3BAFBB33] hover:text-white'
                  : 'p-2 text-[#3BAFBB] hover:bg-[#3BAFBB33]'
              }`}
              onClick={() => {
                onValueChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
