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
    `w-full pl-10 pr-4 py-3 rounded-lg bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border ${
      errors[field] ? 'border-red-500' : 'border-pink-500/30'
    } text-white placeholder-cyan-300 focus:outline-none focus:ring-2 ${
      errors[field] ? 'focus:ring-red-500' : 'focus:ring-pink-500/50'
    } autofill-fix backdrop-blur-sm focus:shadow-lg focus:shadow-pink-500/10`;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 my-30">
      <div className="rounded-xl shadow-lg w-full max-w-2xl p-8 bg-black/20 border border-pink-500/30 backdrop-blur-sm shadow-pink-500/10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full p-3 mb-4 shadow-lg shadow-pink-500/25">
            <MusicNotes size={32} weight="fill" className="text-white" />
          </div>
          <h1 className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-3xl font-bold mb-2 relative">
            Join Entratix
            {/* Neon glow effect */}
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-40">
              Join Entratix
            </div>
          </h1>
          <p className="text-cyan-300 text-lg text-center">
            Create your account and discover amazing events
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-cyan-300 text-sm font-medium mb-2">
                First Name *
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
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
              <label className="text-cyan-300 text-sm font-medium mb-2">
                Last Name *
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
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
            <label className="text-cyan-300 text-sm font-medium mb-2">
              Email Address *
            </label>
            <div className="relative">
              <EnvelopeSimple
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
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
              <label className="text-cyan-300 text-sm font-medium mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
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
              <label className="text-cyan-300 text-sm font-medium mb-2">
                Date of Birth *
              </label>
              <div
                className={`border rounded-lg pr-2 pl-1 py-2 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 backdrop-blur-sm ${
                  errors.birthDate ? 'border-red-500' : 'border-pink-500/30'
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
              className="cursor-pointer h-5 w-5 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text bg-transparent border-pink-500/50 rounded focus:ring-pink-500/50"
            />
            <label className="text-cyan-300 text-sm">
              I agree to the{' '}
              <a
                href="#"
                className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text hover:underline"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text hover:underline"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out ${
              isFormValid
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-pink-500/25'
                : 'opacity-50 cursor-not-allowed bg-gray-600'
            }`}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};
