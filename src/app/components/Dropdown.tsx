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
                     text-cyan-300 
                     rounded-md px-4 py-2 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate text-md">
            {selectedValue || placeholder}
          </span>
          {customIcon ?? (
            <CaretDown
              className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              size={20}
            />
          )}
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
            className="placeholder:text-gray-400 text-cyan-300 w-full outline-none bg-transparent cursor-pointer min-w-0"
          />
          {customIcon ?? (
            <CaretDown
              className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              size={30}
            />
          )}
        </div>
      )}

      {/* Options */}
      {isOpen && (
        <div
          className={`absolute z-[99999] mt-2 w-full max-h-60 overflow-y-scroll rounded-lg shadow-2xl border border-pink-500/30 backdrop-blur-sm
          ${
            variant === 'default'
              ? 'bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10'
              : 'bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 mt-5'
          }`}
        >
          {options.map(option => (
            <div
              key={option}
              className={`cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]
              ${
                variant === 'default'
                  ? 'px-3 py-2 text-sm text-cyan-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:text-cyan-100'
                  : 'p-2 text-cyan-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:text-cyan-100'
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
