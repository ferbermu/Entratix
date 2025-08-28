'use client';

import React from 'react';

interface InputFieldIconProps {
  label: string;
  icon: React.ReactNode; // Ícono que se pasa como prop
  type?: 'text' | 'number' | 'email' | 'password';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}

export const InputFieldIcon: React.FC<InputFieldIconProps> = ({
  label,
  icon,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  textarea = false,
  className = '',
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label className="text-gray-300 text-md mb-2">
        {label} {required && '*'}
      </label>

      <div className="border border-[#3BAFBB] focus-within:border-2 flex px-4 rounded-lg gap-2 ">
        <div className="flex gap-2 w-full  py-2 items-center">
          <span className="text-[#3BAFBB] w-4 h-4 flex-shrink-0 flex items-start ">
            {icon}
          </span>

          {textarea ? (
            <textarea
              value={value}
              onChange={e => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="border-none placeholder:text-sm outline-none w-full text-gray-300 bg-transparent placeholder:text-[#3BAFBB] resize-none min-h-[180px] "
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={e => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="border-none placeholder:text-sm outline-none w-full text-gray-300 bg-transparent placeholder:text-[#3BAFBB] "
            />
          )}
        </div>
      </div>
    </div>
  );
};
