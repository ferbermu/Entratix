'use client';

import Image from 'next/image';
import { Navbutton } from './Navbutton';
import { MobileNavButton } from './MobileNavButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MobileNav } from './MobileNav';
import { useScroll } from '../hooks/useScroll';
import { MobileSearch } from './MobileSearch';
import { useAuthRedux } from '../login/hooks/useAuthRedux';
import {
  Ticket,
  CalendarPlus,
  ChartBar,
  UserPlus,
  SignIn,
  User,
  SignOut,
} from '@phosphor-icons/react';
import cn from 'classnames';

export const Navbar = () => {
  const isScrolled = useScroll({ threshold: 700 });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuthRedux();

  const activeClass =
    'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 !border-cyan-400 rounded-md text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.4)]';
  const hoverClass =
    'hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-cyan-400/10 hover:text-cyan-300 transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,175,187,0.3)]';
  const isEvents = pathname?.startsWith('/events');
  const isMyTickets = pathname?.startsWith('/my-tickets');
  const isCreateEvent = pathname?.startsWith('/create-event');
  const isRrpp = pathname?.startsWith('/rrpp-dashbord');
  const isProfile = pathname?.startsWith('/profile');
  const isRegister = pathname?.startsWith('/register');
  const isLoginPath = pathname?.startsWith('/login');

  const handleLogin = () => {
    console.log('Login clicked');
  };

  const handleSignup = () => {
    console.log('Signup clicked');
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(prev => !prev);
    // Cerrar búsqueda si está abierta
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(prev => !prev);
    // Cerrar nav si está abierto
    if (isMobileNavOpen) setIsMobileNavOpen(false);
  };

  const iconChange = (icon: string, isSearch?: boolean) => {
    if ((isMobileNavOpen && !isSearch) || (isMobileSearchOpen && isSearch)) {
      return '/assets/icons/search_bar/close.svg';
    }
    return icon;
  };
  return (
    <>
      <nav
        className={`
          fixed w-full top-0 z-50 
          border-b h-22 flex justify-between px-12 max-[870px]:px-5 
          transition-all duration-500 ease-in-out  overflow-hidden
          max-[870px]:bg-gradient-to-r max-[870px]:from-black/90 max-[870px]:via-purple-900/20 max-[870px]:to-black/90
          ${
            isScrolled || isMobileNavOpen || isMobileSearchOpen
              ? 'bg-gradient-to-r from-black/90 via-purple-900/20 to-black/90 border-pink-500/50 shadow-[0_0_25px_rgba(255,20,147,0.3)] backdrop-blur-sm'
              : 'bg-gradient-to-r from-black/60 via-purple-900/10 to-black/60 border-pink-500/30'
          }
        `}
      >
        {/* Neon background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-400/5 blur-xl opacity-50"></div>
        <div className="absolute inset-0 border-b border-pink-500/20"></div>

        <div className="gap-4 flex items-center relative z-10">
          <Link href="/">
            <Image
              width={200}
              height={28}
              src="/assets/EntratixFullLogo.png"
              alt="Entratix Logo"
              priority
            />
          </Link>

          <div className="text-white pl-8 flex gap-6 max-[870px]:hidden items-center text-lg ">
            <Link href="/events">
              <Navbutton
                text="Events"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isEvents })}
                icon={
                  <CalendarPlus
                    size={20}
                    className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                  />
                }
              />
            </Link>
            <Link href="/my-tickets">
              <Navbutton
                text="My Tickets"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isMyTickets })}
                icon={
                  <Ticket
                    size={20}
                    className="text-cyan-400 drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]"
                  />
                }
              />
            </Link>
            <Link href="/create-event">
              <Navbutton
                text="Create Event"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isCreateEvent })}
                icon={
                  <CalendarPlus
                    size={20}
                    className="text-cyan-400 drop-shadow-[0_0_8px_rgba(128,0,255,0.6)]"
                  />
                }
              />
            </Link>
            <Link href="/rrpp-dashbord">
              <Navbutton
                text="RRPP Dashbord"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isRrpp })}
                icon={
                  <ChartBar
                    size={20}
                    className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                  />
                }
              />
            </Link>
            <Link href="/profile">
              <Navbutton
                text="Profile"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isProfile })}
                icon={
                  <User
                    size={20}
                    className="text-cyan-400 drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]"
                  />
                }
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 max-[870px]:hidden relative z-10">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-white">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Cargando...</span>
            </div>
          ) : !isAuthenticated ? (
            <>
              <Link href="/register">
                <Navbutton
                  className={cn('text-white text-lg', hoverClass, {
                    [activeClass]: isRegister,
                  })}
                  text="Sign up"
                  onClick={handleSignup}
                  icon={
                    <UserPlus
                      size={20}
                      className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                    />
                  }
                />
              </Link>
              <Link href="/login">
                <Navbutton
                  className={cn(
                    'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 rounded-md border border-cyan-400/50 text-cyan-300 text-lg shadow-[0_0_15px_rgba(0,255,255,0.4)]',
                    hoverClass,
                    { [activeClass]: isLoginPath }
                  )}
                  text="Login"
                  onClick={handleLogin}
                  icon={
                    <SignIn
                      size={20}
                      className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                    />
                  }
                />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2 text-white">
                <User
                  size={20}
                  className="text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                />
                <span className="text-white">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                title="Cerrar sesión"
              >
                <SignOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-2 items-center min-[870px]:hidden">
          {isLoading ? (
            <div className="flex items-center space-x-2 text-white">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              <MobileNavButton
                icon={iconChange('/assets/icons/nav_bar/search.svg', true)}
                onClick={toggleMobileSearch}
              />
              <MobileNavButton
                icon={iconChange('/assets/icons/nav_bar/vector.svg')}
                onClick={toggleMobileNav}
              />
            </>
          )}
        </div>
      </nav>
      {isMobileNavOpen && window.innerWidth < 870 && (
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />
      )}

      <MobileSearch
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
        onSearch={term => {
          window.dispatchEvent(new CustomEvent('search', { detail: term }));
        }}
      />
    </>
  );
};
