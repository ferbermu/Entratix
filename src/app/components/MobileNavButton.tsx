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
      className="p-3 hover:bg-cyan-400/10 rounded-lg transition-colors border border-cyan-400/50 cursor-pointer bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-400/5 hover:from-pink-500/15 hover:via-purple-500/15 hover:to-cyan-400/15 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]"
    >
      <Image src={icon} alt="nav icon" width={24} height={24} priority />
    </button>
  );
};
