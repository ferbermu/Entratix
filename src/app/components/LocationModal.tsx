'use client';

import React from 'react';
import Image from 'next/image';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (location: string) => void;
  locations: string[];
  selectedLocation: string;
}

export const LocationModal = ({
  isOpen,
  onClose,
  onLocationSelect,
  locations,
  selectedLocation,
}: LocationModalProps) => {
  if (!isOpen) return null;

  const handleSelect = (location: string) => {
    onLocationSelect(location);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1C1A1A] border border-[#3BAFBB80] rounded-lg shadow-lg w-full max-w-md flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b border-b-[#3BAFBB80]">
          <h2 className="text-[#3BAFBB] text-lg font-semibold">
            Seleccionar Ubicación
          </h2>
          <button
            onClick={onClose}
            className="border border-[#3BAFBB80] rounded-lg p-1 cursor-pointer"
          >
            <Image
              src="/assets/icons/search_bar/close.svg"
              alt="close"
              width={24}
              height={24}
            />
          </button>
        </div>
        <ul className="flex-grow overflow-y-auto p-4 no-scrollbar">
          {locations.map(location => (
            <li
              key={location}
              className="flex justify-between items-center py-3 border-b border-b-[#3BAFBB33] cursor-pointer"
              onClick={() => handleSelect(location)}
            >
              <span className="text-[#3BAFBB]">{location}</span>
              {selectedLocation === location && (
                <div className="w-4 h-4 rounded-full border-2 border-[#3BAFBB] bg-[#3BAFBB]"></div>
              )}
              {selectedLocation !== location && (
                <div className="w-4 h-4 rounded-full border-2 border-[#3BAFBB]"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
