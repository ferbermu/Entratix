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
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1C1A1A]/70" onClick={onClose} />
      {/* Contenido */}
      <div className="relative bg-[#1C1A1A] p-14 rounded-2xl shadow-xl z-10">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-white hover:text-[#3BAFBB]"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};
