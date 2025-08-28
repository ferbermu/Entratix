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
      <label className="text-gray-300 text-md mb-2">
        {label} {required && '*'}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="border border-[#3BAFBB] rounded-lg w-full min-h-[180px] p-4 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
        />
      )}
    </div>
  );
};
