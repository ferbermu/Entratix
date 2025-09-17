'use client';
import React from 'react';
import { MusicNotes, EnvelopeSimple, GoogleLogo } from '@phosphor-icons/react';
import { InputPassword } from '@/register/InputPassword';
import { DateRange } from 'react-day-picker';
import { useLogin } from './hooks/useLogin';
import Link from 'next/link';

interface LoginPageProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const {
    email,
    password,
    error,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  const handleGoogleLogin = () => {
    // TODO: Implementar login con Google
    // Por ahora solo mostramos un mensaje
    console.log('Login con Google no implementado aún');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <div className="rounded-xl shadow-lg w-full max-w-lg p-8 py-12 backdrop-blur-sm border border-pink-500/30 bg-black/20 shadow-pink-500/10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full p-3 mb-4 shadow-lg shadow-pink-500/25">
            <MusicNotes size={32} weight="fill" className="text-white" />
          </div>
          <h1 className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-3xl font-bold mb-2 relative">
            Welcome Back
            {/* Neon glow effect */}
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-40">
              Welcome Back
            </div>
          </h1>
          <p className="text-cyan-300 text-lg text-center">
            Sign in to your Entratix account
          </p>
        </div>

        {/* Mostrar error si existe */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-cyan-300 text-sm font-medium mb-2"
            >
              Email Address *
            </label>
            <div className="relative">
              <EnvelopeSimple
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
              />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => handleEmailChange(e.target.value)}
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border border-pink-500/30 text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 autofill-fix disabled:opacity-50 backdrop-blur-sm focus:shadow-lg focus:shadow-pink-500/10"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <InputPassword
              id="password"
              label="Password *"
              placeholder="Enter your password"
              placeholderClassName="placeholder-cyan-300"
              iconColor="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text"
              value={password}
              onChange={e => handlePasswordChange(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="text-right text-sm mt-2">
              <a
                href="#"
                className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg shadow-pink-500/25"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Sign in'}
          </button>

          <div className="text-center text-cyan-300">or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="cursor-pointer w-full flex items-center justify-center py-3 rounded-lg bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 border border-pink-500/30 text-white font-semibold mb-4 hover:bg-gradient-to-r hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:border-pink-500/50 transition duration-300 ease-in-out disabled:opacity-50 backdrop-blur-sm"
          >
            <GoogleLogo size={24} weight="fill" className="mr-3 " />
            Continue with Google
          </button>
        </form>

        <p className="flex gap-2 justify-center items-center text-cyan-300 mt-8 text-sm">
          <span>Don&apos;t have an account?</span>
          <Link
            href="/register"
            className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};
