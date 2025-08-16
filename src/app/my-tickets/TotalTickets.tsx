import React from 'react';

export const TotalTickets = () => {
  return (
    <div className="col-span-2 bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full">
      <div className="px-8 py-4 border-b border-[#3BAFBB]">
        <div className="text-lg font-semibold text-[#3BAFBB] text-center">
          Your Event Stats
        </div>
      </div>
      <div className="flex justify-between items-center px-8 py-8 text-center gap-2">
        <div className="flex-1">
          <div className="text-3xl font-bold text-[#a259ff]">4</div>
          <div className="text-gray-300 mt-2 max-[700px]:text-xs">
            Total Events
          </div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-[#19c37d]">9</div>
          <div className="text-gray-300 mt-2 max-[700px]:text-xs">
            Total Tickets
          </div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-[#3BAFBB]">$615</div>
          <div className="text-gray-300 mt-2 max-[700px]:text-xs">
            Total Spent
          </div>
        </div>
      </div>
    </div>
  );
};
