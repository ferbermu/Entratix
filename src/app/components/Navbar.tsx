'use client';
import Image from 'next/image';
import { Navbutton } from './Navbutton';
import { MobileNavButton } from './MobileNavButton';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMyTickets = () => {
    console.log('My Tickets clicked');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed w-full top-0 z-50 
        border-b h-22 flex justify-between px-12 max-[870px]:px-5 
        transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? 'bg-black border-[#3BAFBB]'
            : 'bg-transparent border-transparent'
        }
      `}
    >
      <div className=" gap-4 flex  items-center">
        <Link href="/">
          <Image
            className=""
            width={200}
            height={28}
            src={'/assets/EntratixFullLogo.png'}
            alt={''}
          ></Image>
        </Link>

        <div className=" text-white pl-8 flex gap-6 max-[870px]:hidden ">
          <Navbutton text="Inicio" onClick={() => {}} />
          <Navbutton text="Eventos" onClick={handleMyTickets} />
        </div>
      </div>
      <div className=" flex items-center  gap-6 max-[870px]:hidden ">
        <Navbutton
          className="text-white "
          text="Registrarse"
          onClick={handleMyTickets}
        />
        <Navbutton
          className="bg-[#3baebb32] rounded-md border border-[#3BAFBB] text-[#3BAFBB] text-md "
          text="Login"
          onClick={handleMyTickets}
        />
      </div>
      <div className="flex gap-2 items-center min-[870px]:hidden ">
        <MobileNavButton
          className=""
          icon="./assets/icons/nav_bar/search.svg"
          onClick={() => {
            console.log('Mobile Nav clicked');
          }}
        />
        <MobileNavButton
          className=""
          icon="./assets/icons/nav_bar/vector.svg"
          onClick={() => {
            console.log('Mobile Nav clicked');
          }}
        />
      </div>
    </nav>
  );
};
