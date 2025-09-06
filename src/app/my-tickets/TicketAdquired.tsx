import React from 'react';

interface TicketAdquiredProps {
  selected: string;
  onSelect: (status: string) => void;
}

export const TicketAdquired: React.FC<TicketAdquiredProps> = ({
  selected,
  onSelect,
}) => {
  const options = [
    { label: 'Active', value: 'Active' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Expired', value: 'Expired' },
    { label: 'All', value: 'All' },
  ];

  return (
    <div className="flex items-center w-full h-full justify-between bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-lg text-lg max-[1075px]:text-md max-[700px]:text-xs overflow-hidden">
      {options.map((opt, index) => (
        <button
          key={opt.value}
          className={`w-full h-full py-4 cursor-pointer text-[#3BAFBB] transition-all
            ${
              selected === opt.value
                ? 'bg-[#3BAFBB]/40 text-white font-bold'
                : 'hover:bg-[#3BAFBB1A]/60'
            }
            ${index === 0 ? 'rounded-l-lg' : ''}
            ${index === options.length - 1 ? 'rounded-r-lg' : ''}`}
          onClick={() => onSelect(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
