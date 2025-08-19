import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface DropdownProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  customIcon?: ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select',
  className = '',
  customIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Trigger */}
      <div
        className="flex items-center justify-between cursor-pointer 
                   text-[#3BAFBB] bg-[#1C1A1A] border border-[#3BAFBB66] 
                   rounded-lg px-3 py-2 hover:border-[#3BAFBB] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate text-sm">{selectedValue || placeholder}</span>
        {customIcon ? (
          customIcon
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-[#3BAFBB]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>

      {/* Options */}
      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full bg-[#1E1E1E] border border-[#3BAFBB66] 
                        rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {options.map(option => (
            <div
              key={option}
              className="px-3 py-2 text-sm text-[#E0E0E0] cursor-pointer 
                         hover:bg-[#3BAFBB33] hover:text-white transition-colors"
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
