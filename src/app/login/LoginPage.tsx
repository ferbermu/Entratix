import React, { useState } from 'react';
import { MusicNotes, EnvelopeSimple, GoogleLogo } from '@phosphor-icons/react';
import { InputPassword } from '@/register/InputPassword';
import { DateRange } from 'react-day-picker';

interface LoginPageProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen p-4 ">
      <div className="rounded-xl shadow-lg w-full max-w-lg p-8 py-12  backdrop-blur-sm border border-[#3BAFBB] bg-[#3BAFBB1A]/40">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#3BAFBB] rounded-full p-3 mb-4">
            <MusicNotes size={32} weight="fill" className="text-white" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-300 text-lg text-center">
            Sign in to your Entratix account
          </p>
        </div>

        <form className="space-y-6">
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
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white placeholder-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] autofill-fix"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <InputPassword
              id="password"
              label="Password *"
              placeholder="Enter your password"
              placeholderClassName="placeholder-[#3BAFBB]"
              iconColor="text-[#3BAFBB]"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="text-right text-sm mt-2">
              <a href="#" className="text-[#3BAFBB] hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full py-3 rounded-lg text-white font-semibold transition duration-300 ease-in-out"
            style={{
              backgroundColor: '#3BAFBB',
              boxShadow: '0 4px 15px rgba(59, 175, 187, 0.4)',
            }}
          >
            Sign in
          </button>

          <div className="text-center text-gray-400">or</div>

          <button
            type="button"
            className="cursor-pointer w-full flex items-center justify-center py-3 rounded-lg bg-transparent border border-[#3BAFBB] text-white font-semibold mb-4 hover:bg-[#3BAFBB] hover:text-white transition duration-300 ease-in-out"
          >
            <GoogleLogo size={24} weight="fill" className="mr-3 " />
            Continue with Google
          </button>
        </form>

        <p className="text-center text-gray-300 mt-8 text-sm">
          Dont have an account?
          <a href="#" className="text-[#3BAFBB] hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};
