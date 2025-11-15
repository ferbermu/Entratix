'use client';

import React from 'react';
import {
  MusicNotes,
  User,
  EnvelopeSimple,
  Phone,
  GoogleLogo,
} from '@phosphor-icons/react';
import { InputPassword } from './InputPassword';
import { CalendarDropdownSimple } from '@/components/CalendarDropdownSimple';
import { useRegister } from './hooks/useRegister';

export const RegisterForm: React.FC = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    birthDate,
    setBirthDate,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    agreeTerms,
    setAgreeTerms,
    receiveUpdates,
    setReceiveUpdates,
    error,
    isSubmitting,
    handleSubmit,
  } = useRegister();

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

        {/* Mostrar error si existe */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="text-gray-300 text-sm font-medium mb-2"
              >
                First Name *
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
                />
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] autofill-fix disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-gray-300 text-sm font-medium mb-2"
              >
                Last Name *
              </label>
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
                />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] autofill-fix disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-300 text-sm font-medium mb-2"
            >
              Email Address *
            </label>
            <div className="relative">
              <EnvelopeSimple
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
              />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] autofill-fix disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6 ">
            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="text-gray-300 text-sm font-medium mb-2"
              >
                Phone Number *
              </label>
              <div className="relative">
                <Phone
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3BAFBB]"
                />
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] autofill-fix disabled:opacity-50"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="dateOfBirth"
                className="text-gray-300 text-sm font-medium mb-2"
              >
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

          <div className="grid grid-cols-1 min-[971px]:grid-cols-2 gap-6">
            <InputPassword
              id="password"
              label="Password *"
              placeholder="Create password"
              placeholderClassName="placeholder-[#3BAFBB]"
              iconColor="text-[#3BAFBB]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
            <InputPassword
              id="confirmPassword"
              label="Confirm Password *"
              placeholder="Confirm password"
              placeholderClassName="placeholder-[#3BAFBB]"
              iconColor="text-[#3BAFBB]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              disabled={isSubmitting}
              className="cursor-pointer h-5 w-5 text-[#3BAFBB] bg-transparent border-[#3BAFBB] rounded focus:ring-[#3BAFBB] custom-checkbox disabled:opacity-50"
            />
            <label htmlFor="agreeTerms" className="text-gray-300 text-sm">
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

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="receiveUpdates"
              checked={receiveUpdates}
              onChange={(e) => setReceiveUpdates(e.target.checked)}
              disabled={isSubmitting}
              className="cursor-pointer h-5 w-5 text-[#3BAFBB] bg-transparent border-[#3BAFBB] rounded focus:ring-[#3BAFBB] custom-checkbox disabled:opacity-50"
            />
            <label
              htmlFor="receiveUpdates"
              className="text-gray-300 text-sm cursor-pointer"
            >
              I want to receive updates about new events and special offers
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#3BAFBB',
              boxShadow: '0 4px 15px rgba(59, 175, 187, 0.4)',
            }}
          >
            {isSubmitting ? 'Creando cuenta...' : 'Create Account'}
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
