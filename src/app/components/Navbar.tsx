'use client';
import Image from 'next/image';
import { Navbutton } from './Navbutton';

export const Navbar = () => {
  const handleMyTickets = () => {
    console.log('My Tickets clicked');
  };

  return (
    <>
      <nav className="border h-22 flex justify-between pl-25  bg-[#3BAFBB0D] border-[#3BAFBB33] bg-opacity-50 ">
        <div className=" gap-4 flex  items-center">
          <Image
            width={200}
            height={28}
            src={'/assets/EntratixFullLogo.png'}
            alt={''}
          ></Image>
          <div className=" pl-8 flex gap-6">
            <Navbutton text="Inicio" onClick={() => {}} />
            <Navbutton text="Eventos" onClick={handleMyTickets} />
          </div>
        </div>
        <div className=" flex items-center pr-12 gap-6">
          <Navbutton text="Registrarse" onClick={handleMyTickets} />
          <Navbutton
            className="bg-[#3baebb32] rounded-md border border-[#3BAFBB] text-[#3BAFBB] text-md "
            text="Login"
            onClick={handleMyTickets}
          />
        </div>
      </nav>
    </>
  );
};
