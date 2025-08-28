import React, { useState, useEffect } from 'react';
import {
  MusicNotes,
  User,
  EnvelopeSimple,
  Phone,
  GoogleLogo,
} from '@phosphor-icons/react';
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
  // Estados para cada campo obligatorio
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);

  // Validación de email simple
  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Validar todo el formulario cada vez que cambien los estados
  useEffect(() => {
    const valid =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      validateEmail(email) &&
      phoneNumber.trim() !== '' &&
      birthDate !== undefined &&
      password.length >= 6 &&
      confirmPassword === password &&
      agreeTerms;

    setIsFormValid(valid);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // enviar datos
    console.log('Formulario válido, enviando...');
  };

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
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] autofill-fix"
                />
              </div>
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
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] autofill-fix"
                />
              </div>
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
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] autofill-fix"
              />
            </div>
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
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] autofill-fix"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-300 text-sm font-medium mb-2">
                Date of Birth *
              </label>
              <div className="border border-[#3BAFBB] rounded-lg pr-2 pl-1 py-2">
                <CalendarDropdownSimple
                  date={birthDate}
                  onDateChange={setBirthDate}
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6">
            <InputPassword
              id="password"
              label="Password *"
              placeholder="Create password"
              placeholderClassName="placeholder-[#3BAFBB]"
              iconColor="text-[#3BAFBB]"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <InputPassword
              id="confirmPassword"
              label="Confirm Password *"
              placeholder="Confirm password"
              placeholderClassName="placeholder-[#3BAFBB]"
              iconColor="text-[#3BAFBB]"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
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

          {/* Opcional */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="receiveUpdates"
              className="cursor-pointer h-5 w-5 text-[#3BAFBB] bg-transparent border-[#3BAFBB] rounded focus:ring-[#3BAFBB]"
            />
            <label
              htmlFor="receiveUpdates"
              className="text-gray-300 text-sm cursor-pointer"
            >
              I want to receive updates about new events and special offers
            </label>
          </div>

          {/* Botón principal */}
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

          <div className="text-center text-gray-400 ">or</div>

          <button
            type="button"
            className="cursor-pointer w-full flex items-center justify-center py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white font-semibold mb-4 hover:bg-[#3BAFBB] hover:text-white transition duration-300 ease-in-out"
          >
            <GoogleLogo size={24} weight="fill" className="mr-3 " />
            Sign up with Google
          </button>
        </form>

        <p className="text-center text-gray-300 mt-8 text-sm">
          Already have an account?{' '}
          <a href="#" className="text-[#3BAFBB] hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
};
