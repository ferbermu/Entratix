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
      <label className="text-cyan-300 text-md mb-2 font-medium drop-shadow-sm">
        {label} {required && '*'}
      </label>

      <div className="border border-pink-500/30 focus-within:border-cyan-400/60 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-black/20 backdrop-blur-sm transition-all duration-300 flex px-4 rounded-lg gap-2">
        <div className="flex gap-2 w-full py-2 items-center">
          <span className="text-cyan-400 w-4 h-4 flex-shrink-0 flex items-start drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
            {icon}
          </span>

          {textarea ? (
            <textarea
              value={value}
              onChange={e => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="border-none placeholder:text-sm outline-none w-full text-cyan-300 bg-transparent placeholder:text-gray-400 resize-none min-h-[180px]"
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={e => onChange?.(e.target.value)}
              placeholder={placeholder}
              className="border-none placeholder:text-sm outline-none w-full text-cyan-300 bg-transparent placeholder:text-gray-400"
            />
          )}
        </div>
      </div>
    </div>
  );
};
