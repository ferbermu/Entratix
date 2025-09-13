'use client';

import React from 'react';

interface InputFieldProps {
  label: string;
  type?: 'text' | 'number' | 'email' | 'password';
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
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

      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="border border-pink-500/30 rounded-lg w-full min-h-[180px] p-4 text-cyan-300 placeholder-gray-400 bg-black/20 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="border border-pink-500/30 rounded-lg w-full py-2 px-4 text-cyan-300 placeholder-gray-400 bg-black/20 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
        />
      )}
    </div>
  );
};
