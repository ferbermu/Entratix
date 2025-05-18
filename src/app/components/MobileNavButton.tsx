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
      className="p-3 hover:bg-[#3BAFBB]/10 rounded-lg transition-colors border border-[#3BAFBB]"
    >
      <Image src={icon} alt="nav icon" width={24} height={24} priority />
    </button>
  );
};
