import React from 'react';

export const TotalTickets = () => {
  return (
    <div className="bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-[1400px] mx-auto mt-6 mb-24">
      <div className="px-8 py-4 border-b border-[#3BAFBB]">
        <span className="text-lg font-semibold text-[#a259ff]">
          Your Event Stats
        </span>
      </div>
      <div className="flex justify-between items-center px-8 py-8 text-center">
        <div className="flex-1">
          <div className="text-3xl font-bold text-[#a259ff]">4</div>
          <div className="text-gray-300 mt-2">Total Events</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-[#19c37d]">9</div>
          <div className="text-gray-300 mt-2">Total Tickets</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-[#3BAFBB]">$615</div>
          <div className="text-gray-300 mt-2">Total Spent</div>
        </div>
      </div>
    </div>
  );
};
