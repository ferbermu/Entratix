'use client';

import React from 'react';
import Link from 'next/link';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

export const MobileNav = ({
  isOpen,
  onClose,
  onLogin,
  onSignup,
}: MobileNavProps) => {
  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-[88px] left-0 right-0
          w-full bg-black
          border-b border-[#3BAFBB]
          transform transition-all duration-300 ease-in-out z-50
          ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-12 py-6">
          <div className="flex flex-col gap-8  divide-y divide-[#FFFFFF]/40">
            <nav className="flex flex-col divide-y divide-[#FFFFFF]/40 [&>*]:py-4 text-center">
              <Link
                href="/"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                Home
              </Link>
              <Link
                href="/how-it-works"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                How it Works
              </Link>
              <Link
                href="/about"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                About Us
              </Link>
              <Link
                href="/support"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                Customer Support
              </Link>
              <Link
                href="/faqs"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                FAQs
              </Link>
              <Link
                href="/terms"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                Terms and Conditions
              </Link>
            </nav>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  onLogin();
                  onClose();
                }}
                className="w-full px-6 py-3 text-center text-[#3BAFBB] border border-[#3BAFBB] rounded-lg hover:bg-[#3BAFBB]/10 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  onSignup();
                  onClose();
                }}
                className="w-full px-6 py-3 text-center text-[#3BAFBB]  border  border-[#3BAFBB]  rounded-lg hover:bg-[#3BAFBB]/10 transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
