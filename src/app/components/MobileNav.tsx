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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden pointer-events-none">
      {/* Overlay - solo cubre desde debajo de la navbar */}
      <div
        className="absolute top-[88px] left-0 right-0 bottom-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="absolute top-[88px] left-0 right-0 bg-black border-b border-pink-500/30 pointer-events-auto">
        {/* Capa base completamente opaca */}
        <div className="absolute inset-0 bg-black"></div>
        {/* Enhanced retrowave background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/30 via-purple-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"></div>

        {/* Retrowave grid background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          ></div>
        </div>

        {/* Enhanced neon glow effects */}
        <div className="absolute top-10 left-1/4 w-48 h-48 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 blur-2xl rounded-full"></div>
        <div className="max-w-[1400px] mx-auto pb-6 relative z-10">
          <div className="flex flex-col gap-8 divide-y divide-pink-500/30">
            <nav className="flex flex-col w-full divide-y divide-cyan-400/30 [&>*]:py-4 text-center">
              <Link
                href="/events"
                className="text-white text-lg hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] font-medium"
                onClick={onClose}
              >
                Events
              </Link>
              <Link
                href="/my-tickets"
                className="text-white text-lg hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,20,147,0.6)] font-medium"
                onClick={onClose}
              >
                My Tickets
              </Link>
              <Link
                href="/create-event"
                className="text-white text-lg hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(128,0,255,0.6)] font-medium"
                onClick={onClose}
              >
                Create Event
              </Link>
              <Link
                href="/rrpp-dashbord"
                className="text-white text-lg hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] font-medium"
                onClick={onClose}
              >
                RRPP Dashbord
              </Link>
              <Link
                href="/profile"
                className="text-white text-lg hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,20,147,0.6)] font-medium"
                onClick={onClose}
              >
                Profile
              </Link>
            </nav>

            <div className="flex flex-col gap-4 w-full px-12">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="w-full px-6 py-3 text-center text-cyan-300 border border-cyan-400/50 rounded-lg bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={onClose}
                    className="w-full px-6 py-3 text-center text-cyan-300 border border-cyan-400/50 rounded-lg bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 hover:from-pink-500/20 hover:via-purple-500/20 hover:to-cyan-400/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all duration-300 font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 py-3 text-white border border-cyan-400/30 rounded-lg bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-400/5">
                    <User
                      size={20}
                      className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full px-6 py-3 text-center text-white bg-gradient-to-r from-red-500/80 via-red-600/80 to-red-700/80 hover:from-red-500 hover:via-red-600 hover:to-red-700 border border-red-400/50 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
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
    </div>
  );
};
