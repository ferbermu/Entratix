'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuthRedux } from '../login/hooks/useAuthRedux';
import { hasPermission, getRoleName, type UserRole } from '../../lib/utils/rolePermissions';
import { User, SignOut } from '@phosphor-icons/react';

export const MobileNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, isAuthenticated, logout } = useAuthRedux();
  
  // Obtener el rol del usuario
  const userRole = user?.role as UserRole | undefined;

  // Verificar permisos
  const canAccessEvents = hasPermission(userRole, 'canAccessEvents');
  const canAccessMyTickets = hasPermission(userRole, 'canAccessMyTickets');
  const canCreateEvent = hasPermission(userRole, 'canCreateEvent');
  const canAccessRrppDashboard = hasPermission(userRole, 'canAccessRrppDashboard');

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
              {/* Events - Todos los usuarios autenticados */}
              {isAuthenticated && canAccessEvents && (
                <Link
                  href="/events"
                  className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                  onClick={onClose}
                >
                  Events
                </Link>
              )}

              {/* My Tickets - Todos los usuarios autenticados */}
              {isAuthenticated && canAccessMyTickets && (
                <Link
                  href="/my-tickets"
                  className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                  onClick={onClose}
                >
                  My Tickets
                </Link>
              )}

              {/* Create Event - Solo productor y superuser */}
              {isAuthenticated && canCreateEvent && (
                <Link
                  href="/create-event"
                  className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                  onClick={onClose}
                >
                  Create Event
                </Link>
              )}

              {/* RRPP Dashboard - Solo rrpp y superuser */}
              {isAuthenticated && canAccessRrppDashboard && (
                <Link
                  href="/rrpp-dashbord"
                  className="text-white text-lg hover:text-[#3BAFBB] transition-colors"
                  onClick={onClose}
                >
                  RRPP Dashboard
                </Link>
              )}
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
                  <div className="flex flex-col items-center justify-center gap-1 py-3 text-white">
                    <div className="flex items-center gap-2">
                      <User size={20} className="text-[#3BAFBB]" />
                      <span className="font-medium">
                        {user?.firstName} {user?.lastName}
                      </span>
                    </div>
                    {userRole && (
                      <span className="text-xs text-[#3BAFBB]">
                        {getRoleName(userRole)}
                      </span>
                    )}
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
