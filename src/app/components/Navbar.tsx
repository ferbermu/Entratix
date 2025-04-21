'use client';
import Image from 'next/image';
import { Navbutton } from './Navbutton';
import { MobileNavButton } from './MobileNavButton';

export const Navbar = () => {
  const handleMyTickets = () => {
    console.log('My Tickets clicked');
  };

  return (
    <>
      <nav className="border h-22 flex justify-between px-12  max-[870px]:px-5 bg-[#3BAFBB0D] border-[#3BAFBB33] bg-opacity-50 ">
        <div className=" gap-4 flex  items-center">
          <Image
            className=""
            width={200}
            height={28}
            src={'/assets/EntratixFullLogo.png'}
            alt={''}
          ></Image>
          <div className=" pl-8 flex gap-6 max-[870px]:hidden">
            <Navbutton text="Inicio" onClick={() => {}} />
            <Navbutton text="Eventos" onClick={handleMyTickets} />
          </div>
        </div>
        <div className=" flex items-center  gap-6 max-[870px]:hidden ">
          <Navbutton text="Registrarse" onClick={handleMyTickets} />
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
    </>
  );
};
