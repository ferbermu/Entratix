import React, { useState } from 'react';
import { LockSimple, Eye, EyeSlash } from '@phosphor-icons/react';

interface InputPasswordProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  className?: string;
  placeholderClassName?: string;
  iconColor?: string;
  disabled?: boolean;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  showToggle = true,
  className = '',
  placeholderClassName = 'placeholder-[#3BAFBB]',
  iconColor = 'text-[#3BAFBB]',
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={id} className="text-gray-300 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <LockSimple
          size={20}
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconColor}`}
        />
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white ${placeholderClassName} focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] autofill-fix disabled:opacity-50`}
        />
        {showToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconColor} hover:opacity-80 cursor-pointer`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
