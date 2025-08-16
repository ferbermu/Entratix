'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthRedux } from '../login/hooks/useAuthRedux';
import { User, SignOut } from '@phosphor-icons/react';

export const MobileNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, isAuthenticated, logout } = useAuthRedux();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 z-40
          min-[870px]:hidden
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-[88px] left-0 right-0
          w-full bg-[#1E2122]
          border-b border-[#3BAFBB]
          transform transition-all duration-300 ease-in-out z-50
          min-[870px]:hidden
          ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }
        `}
      >
        <div className="max-w-[1400px]  mx-auto  pb-6 ">
          <div className="flex flex-col gap-8 divide-y divide-[#FFFFFF]/40">
            <nav className="flex flex-col w-full divide-y divide-[#FFFFFF]/40 [&>*]:py-4 text-center">
              <Link
                href="/events"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                Events
              </Link>
              <Link
                href="/my-tickets"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                My Tickets
              </Link>
              <Link
                href="/create-event"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                Create Event
              </Link>
              <Link
                href="/rrpp-dashbord"
                className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                onClick={onClose}
              >
                RRPP Dashbord
              </Link>
            </nav>

            <div className="flex flex-col gap-4 w-full px-12">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="w-full px-6 py-3 text-center text-[#3BAFBB] border border-[#3BAFBB] rounded-lg hover:bg-[#3BAFBB]/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={onClose}
                    className="w-full px-6 py-3 text-center text-[#3BAFBB] border border-[#3BAFBB] rounded-lg hover:bg-[#3BAFBB]/10 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 py-3 text-white">
                    <User size={20} className="text-[#3BAFBB]" />
                    <span>{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full px-6 py-3 text-center text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <SignOut size={20} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
