import React from 'react';

type TicketStatusFilter = 'all' | 'active' | 'used' | 'expired';

interface TicketAdquiredProps {
  activeFilter: TicketStatusFilter;
  onFilterChange: (filter: TicketStatusFilter) => void;
}

export const TicketAdquired: React.FC<TicketAdquiredProps> = ({
  activeFilter,
  onFilterChange,
}) => {
  const getButtonClass = (filter: TicketStatusFilter) => {
    return `w-full h-full py-4 cursor-pointer transition-colors ${
      activeFilter === filter
        ? 'bg-[#3BAFBB] text-white'
        : 'hover:bg-[#3BAFBB1A]/60 text-[#3BAFBB]'
    }`;
  };

  return (
    <div className="flex items-center w-full h-full justify-between bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-lg text-lg max-[1075px]:text-md max-[700px]:text-xs overflow-hidden">
      <button
        onClick={() => onFilterChange('all')}
        className={getButtonClass('all')}
      >
        All
      </button>

      <button
        onClick={() => onFilterChange('active')}
        className={getButtonClass('active')}
      >
        Active
      </button>

      <button
        onClick={() => onFilterChange('used')}
        className={getButtonClass('used')}
      >
        Used
      </button>

      <button
        onClick={() => onFilterChange('expired')}
        className={getButtonClass('expired')}
      >
        Expired
      </button>
    </div>
  );
};
