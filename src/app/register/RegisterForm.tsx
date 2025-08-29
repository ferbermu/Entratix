'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { MusicNotes, User, EnvelopeSimple, Phone } from '@phosphor-icons/react';
import { InputPassword } from './InputPassword';
import { CalendarDropdownSimple } from '@/components/CalendarDropdownSimple';

interface RegisterFormProps {
  birthDate: Date | undefined;
  setBirthDate: (date: Date | undefined) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  birthDate,
  setBirthDate,
}) => {
  // Estados de campos
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Estados de errores
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // ✅ Validación de email: debe ser gmail, hotmail u outlook
  const validateEmail = (value: string) =>
    /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com)$/i.test(value);

  // ✅ Validación de teléfono: solo números, + o -
  const validatePhone = (value: string) => /^[-+]?[0-9]+$/.test(value);

  // Validaciones individuales envueltas en useCallback
  const validateFields = useCallback(() => {
    const newErrors = {
      firstName: firstName.trim() === '' ? 'First name is required' : '',
      lastName: lastName.trim() === '' ? 'Last name is required' : '',
      email:
        email.trim() === '' || !validateEmail(email)
          ? 'Please enter a valid email (gmail, hotmail or outlook)'
          : '',
      phoneNumber:
        phoneNumber.trim() === '' || !validatePhone(phoneNumber)
          ? 'Please enter a valid phone number'
          : '',
      birthDate: birthDate === undefined ? 'Date of birth is required' : '',
      password:
        password.length < 6 ? 'Password must be at least 6 characters' : '',
      confirmPassword:
        confirmPassword !== password ? 'Passwords do not match' : '',
    };

    setErrors(newErrors);

    // Si no hay errores → form válido
    setIsFormValid(
      Object.values(newErrors).every(err => err === '') && agreeTerms
    );
  }, [
    firstName,
    lastName,
    email,
    phoneNumber,
    birthDate,
    password,
    confirmPassword,
    agreeTerms,
  ]);

  // Ejecutar validaciones en tiempo real
  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateFields();
    if (!isFormValid) return;
    console.log('Formulario válido, enviando...');
  };

  // 🔴 clases dinámicas de border
  const inputClass = (field: keyof typeof errors) =>
    `w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border ${
      errors[field] ? 'border-red-500' : 'border-[#3BAFBB]'
    } text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 ${
      errors[field] ? 'focus:ring-red-500' : 'focus:ring-[#3BAFBB]'
    } autofill-fix`;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 my-30">
      <div className="rounded-xl shadow-lg w-full max-w-2xl p-8 bg-[#3BAFBB1A]/40 border border-[#3BAFBB]">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#3BAFBB] rounded-full p-3 mb-4">
            <MusicNotes size={32} weight="fill" className="text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Join Entratix</h1>
          <p className="text-gray-300 text-lg text-center">
            Create your account and discover amazing events
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2">
                First Name *
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="First name"
                  className={inputClass('firstName')}
                />
              </div>
              {errors.firstName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2">
                Last Name *
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Last name"
                  className={inputClass('lastName')}
                />
              </div>
              {errors.lastName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-300 text-sm font-medium mb-2">
              Email Address *
            </label>
            <div className="relative">
              <EnvelopeSimple
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={inputClass('email')}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>

          {/* Teléfono y fecha */}
          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6 ">
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
                />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  placeholder="+15551234567"
                  className={inputClass('phoneNumber')}
                />
              </div>
              {errors.phoneNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2">
                Date of Birth *
              </label>
              <div
                className={`border rounded-lg pr-2 pl-1 py-2 ${
                  errors.birthDate ? 'border-red-500' : 'border-[#3BAFBB]'
                }`}
              >
                <CalendarDropdownSimple
                  date={birthDate}
                  onDateChange={setBirthDate}
                />
              </div>
              {errors.birthDate && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.birthDate}
                </span>
              )}
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <InputPassword
                id="password"
                label="Password *"
                placeholder="Create password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div className="flex flex-col">
              <InputPassword
                id="confirmPassword"
                label="Confirm Password *"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                matchWith={password}
              />
            </div>
          </div>

          {/* Términos */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              className="cursor-pointer h-5 w-5 text-[#3BAFBB] bg-transparent border-[#3BAFBB] rounded focus:ring-[#3BAFBB]"
            />
            <label className="text-gray-300 text-sm">
              I agree to the{' '}
              <a href="#" className="text-[#3BAFBB] hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#3BAFBB] hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
              isFormValid ? '' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: '#3BAFBB',
              boxShadow: '0 4px 15px rgba(59, 175, 187, 0.4)',
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
