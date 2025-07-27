import React from 'react';

export const TicketAdquired = () => {
  return (
    <div className="flex items-center w-full h-full justify-between bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-lg">
      <button className="w-full h-full py-4 hover:bg-[#3BAFBB1A]/60  cursor-pointer  text-[#3BAFBB]">
        Active
      </button>

      <button className="w-full h-full  py-4 hover:bg-[#3BAFBB1A]/60 cursor-pointer  text-[#3BAFBB]">
        Completed
      </button>

      <button className="w-full h-full  py-4 hover:bg-[#3BAFBB1A]/60 cursor-pointer  text-[#3BAFBB]">
        Cancelled
      </button>

      <button className="w-full h-full  py-4 hover:bg-[#3BAFBB1A]/60 cursor-pointer text-[#3BAFBB]">
        All
      </button>
    </div>
  );
};
