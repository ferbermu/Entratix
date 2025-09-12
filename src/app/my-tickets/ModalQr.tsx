'use client';

import React from 'react';
import { X } from '@phosphor-icons/react';

interface ModalQrProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalQrProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Enhanced retrowave backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-900/40 to-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Grid background for modal backdrop */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 20, 147, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          ></div>
        </div>
      </div>

      {/* Contenido con efectos retrowave */}
      <div className="relative bg-gradient-to-br from-pink-500/10 via-purple-900/30 to-cyan-400/10 p-14 rounded-2xl shadow-2xl z-10 border border-pink-500/30 backdrop-blur-md overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

        {/* Glow effects around modal */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-3xl rounded-full opacity-50"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 blur-3xl rounded-full opacity-50"></div>

        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-cyan-300 hover:text-transparent hover:bg-gradient-to-r hover:from-pink-500 hover:to-cyan-400 hover:bg-clip-text transition-all duration-300 z-10 p-1 rounded-full hover:backdrop-blur-sm"
        >
          <X size={20} className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
        </button>

        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
