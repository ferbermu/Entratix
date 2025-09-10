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
  const [, setIsFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
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
            tabIndex={0}
            onFocus={() => setIsOpen(true)}
            className="placeholder:text-[#3BAFBB] text-[#3BAFBB] w-full outline-none bg-transparent cursor-pointer min-w-0"
          />
          {customIcon ?? <CaretDown className="text-[#3BAFBB]" size={30} />}
        </div>
      )}

      {/* Options */}
      {isOpen && (
        <div
          className={`absolute z-[99999] mt-2 w-full max-h-60 overflow-y-scroll rounded-lg shadow-2xl border border-[#3BAFBB]/30 backdrop-blur-sm
          ${
            variant === 'default'
              ? 'bg-gradient-to-b from-[#1C1A1A]/70 via-black/70 to-[#1C1A1A]/70'
              : 'bg-gradient-to-b from-[#1C1A1A]/70 via-black/70 to-[#1C1A1A]/70 mt-5'
          }`}
        >
          {options.map(option => (
            <div
              key={option}
              className={`cursor-pointer transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,175,187,0.3)]
              ${
                variant === 'default'
                  ? 'px-3 py-2 text-sm text-cyan-200 hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:text-cyan-100'
                  : 'p-2 text-[#3BAFBB] hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:text-cyan-300'
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
