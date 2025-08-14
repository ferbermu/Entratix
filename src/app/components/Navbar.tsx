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
import {
  Ticket,
  CalendarPlus,
  ChartBar,
  UserPlus,
  SignIn,
} from '@phosphor-icons/react';
import cn from 'classnames';

export const Navbar = () => {
  const isScrolled = useScroll({ threshold: 700 });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const pathname = usePathname();

  const activeClass =
    'bg-[#3baebb32] !border-[#3BAFBB] rounded-md text-[#3BAFBB]';
  const hoverClass =
    'hover:bg-[#3baebb32]  hover:text-[#3BAFBB] transition-colors';
  const isEvents = pathname?.startsWith('/events');
  const isMyTickets = pathname?.startsWith('/my-tickets');
  const isCreateEvent = pathname?.startsWith('/create-event');
  const isRrpp = pathname?.startsWith('/rrpp-dashbord');
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
          transition-all duration-500 ease-in-out
          max-[870px]:bg-[#1E2122]
          ${
            isScrolled || isMobileNavOpen || isMobileSearchOpen
              ? 'bg-[#1E2122] border-[#3BAFBB]'
              : 'bg-[#3BAFBB0D] border-[#3BAFBB33]'
          }
        `}
      >
        <div className="gap-4 flex items-center">
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
                icon={<CalendarPlus size={20} className="text-[#3BAFBB]" />}
              />
            </Link>
            <Link href="/my-tickets">
              <Navbutton
                text="My Tickets"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isMyTickets })}
                icon={<Ticket size={20} className="text-[#3BAFBB]" />}
              />
            </Link>
            <Link href="/create-event">
              <Navbutton
                text="Create Event"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isCreateEvent })}
                icon={<CalendarPlus size={20} className="text-[#3BAFBB]" />}
              />
            </Link>
            <Link href="/rrpp-dashbord">
              <Navbutton
                text="RRPP Dashbord"
                onClick={() => {}}
                className={cn(hoverClass, { [activeClass]: isRrpp })}
                icon={<ChartBar size={20} className="text-[#3BAFBB] " />}
              />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6 max-[870px]:hidden">
          <Link href="/register">
            <Navbutton
              className={cn('text-white text-lg', hoverClass, {
                [activeClass]: isRegister,
              })}
              text="Sign up"
              onClick={handleSignup}
              icon={<UserPlus size={20} className="text-[#3BAFBB]" />}
            />
          </Link>
          <Link href="/login">
            <Navbutton
              className={cn(
                'bg-[#3baebb32] rounded-md border border-transparent text-[#3BAFBB] text-lg',
                hoverClass,
                { [activeClass]: isLoginPath }
              )}
              text="Login"
              onClick={handleLogin}
              icon={<SignIn size={20} className="text-[#3BAFBB]" />}
            />
          </Link>
        </div>
        <div className="flex gap-2 items-center min-[870px]:hidden">
          <MobileNavButton
            icon={iconChange('/assets/icons/nav_bar/search.svg', true)}
            onClick={toggleMobileSearch}
          />
          <MobileNavButton
            icon={iconChange('/assets/icons/nav_bar/vector.svg')}
            onClick={toggleMobileNav}
          />
        </div>
      </nav>
      {isMobileNavOpen && window.innerWidth < 870 && (
        <MobileNav
          isOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
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
