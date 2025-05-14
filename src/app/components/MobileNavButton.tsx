'use client';

import Image from 'next/image';

interface MobileNavButtonProps {
  icon: string;
  onClick: () => void;
}

export const MobileNavButton = ({ icon, onClick }: MobileNavButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-[#3BAFBB]/10 rounded-lg transition-colors"
    >
      <Image src={icon} alt="nav icon" width={24} height={24} priority />
    </button>
  );
};
