import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { LockSimple, Eye, EyeSlash } from '@phosphor-icons/react';

interface InputPasswordProps {
  id: string;
  label: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean;
  className?: string; // wrapper
  placeholderClassName?: string;
  iconColor?: string;
  disabled?: boolean;

  /** --- Nueva API de validación interna --- */
  required?: boolean; // default: true
  minLength?: number; // default: 6
  matchWith?: string; // para confirm password
  customValidate?: (value: string) => string | null; // devuelve mensaje o null
  requiredMessage?: string; // override mensajes
  minLengthMessage?: string;
  matchMessage?: string;
  onValidityChange?: (isValid: boolean) => void; // avisa al padre si cambia
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  id,
  label,
  placeholder,
  value = '',
  onChange,
  showToggle = true,
  className = '',
  placeholderClassName = 'placeholder-[#3BAFBB]',
  iconColor = 'text-[#3BAFBB]',
  disabled = false,

  required = true,
  minLength = 6,
  matchWith,
  customValidate,
  requiredMessage = 'This field is required',
  minLengthMessage,
  matchMessage = 'Passwords do not match',
  onValidityChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string>('');

  const minMsg =
    minLengthMessage ?? `Password must be at least ${minLength} characters`;

  const errorId = useMemo(() => `${id}-error`, [id]);

  const validate = useCallback(
    (val: string): string => {
      if (required && val.trim() === '') return requiredMessage;
      if (minLength && val.length < minLength) return minMsg;
      if (typeof matchWith === 'string' && val !== matchWith)
        return matchMessage;
      if (customValidate) {
        const custom = customValidate(val);
        if (custom) return custom;
      }
      return '';
    },
    [
      required,
      requiredMessage,
      minLength,
      minMsg,
      matchWith,
      matchMessage,
      customValidate,
    ]
  );

  // Validación en tiempo real cuando cambia el valor o la referencia a la coincidencia
  useEffect(() => {
    const nextError = validate(value);
    setError(nextError);
  }, [value, matchWith, validate]);

  // Notificar cambios de validez al padre si lo necesita
  useEffect(() => {
    if (onValidityChange) onValidityChange(error === '');
  }, [error, onValidityChange]);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!touched) setTouched(true);
    onChange?.(e);
  };

  const showError = touched && error !== '';

  const inputClasses = `w-full pl-10 pr-10 py-3 rounded-lg bg-transparent border
    ${
      showError
        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
        : 'border-[#3BAFBB] focus:ring-[#3BAFBB] focus:border-[#3BAFBB]'
    }
    text-white ${placeholderClassName} focus:outline-none autofill-fix disabled:opacity-50`;

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
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
        />
        {showToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconColor} hover:opacity-80 cursor-pointer`}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      {showError && (
        <span id={errorId} className="text-red-500 text-sm mt-1">
          {error}
        </span>
      )}
    </div>
  );
};
