import React, { useState } from 'react';
import { CurrencyDollarSimple, Plus, Minus } from '@phosphor-icons/react';

export const CreateTicket = () => {
  const [tickets, setTickets] = useState([
    { type: '', price: '', quantity: '', description: '' },
  ]);

  const handleAddTicket = () => {
    setTickets([
      ...tickets,
      { type: '', price: '', quantity: '', description: '' },
    ]);
  };

  const handleRemoveTicket = (indexToRemove: number) => {
    if (tickets.length === 1) return;
    setTickets(tickets.filter((_, index) => index !== indexToRemove));
  };

  const preventNegativeAndE = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-[#3BAFBB1A] max-w-[1400px] rounded-xl p-8 mx-auto mt-8 border border-[#3BAFBB]">
      <div className="flex items-center justify-between mb-16 ">
        <div className="flex items-center gap-2">
          <CurrencyDollarSimple className="text-[#3BAFBB]" size={24} />
          <span className="text-gray-300 text-xl font-bold">
            Ticket Types & Pricing
          </span>
        </div>
        <button
          onClick={handleAddTicket}
          className="cursor-pointer flex items-center gap-2 bg-[#3BAFBB] hover:bg-[#2A8C99] text-white font-semibold px-5 py-2 rounded-lg transition-all"
        >
          <Plus size={18} />
          Add Ticket Type
        </button>
      </div>

      <div className="flex flex-col gap-14">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-[#3BAFBB]/5 relative rounded-xl p-4 flex flex-col gap-4 "
          >
            {tickets.length > 1 && (
              <div className=" right-0 -top-10 absolute">
                <button
                  onClick={() => handleRemoveTicket(index)}
                  className="cursor-pointer mb-2 text-white bg-[#3baebb32] hover:bg-[#3baebb32]/20 px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                >
                  <Minus size={16} />
                  Remove
                </button>
              </div>
            )}

            <div className=" flex gap-4">
              <div className="flex flex-col w-1/3">
                <label className="text-gray-300 text-sm mb-2">Type</label>
                <input
                  type="text"
                  className="bg-[#3BAFBB1A]  text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
                  placeholder="Enter ticket type"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="text-gray-300 text-sm mb-2">Price</label>
                <input
                  type="number"
                  min="1"
                  onKeyDown={preventNegativeAndE}
                  className="bg-[#3BAFBB1A] text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <label className="text-gray-300 text-sm mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  onKeyDown={preventNegativeAndE}
                  className="bg-[#3BAFBB1A]  text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB]"
                  placeholder="0"
                />
              </div>
            </div>
            <label className="text-gray-300 text-sm">Description</label>
            <textarea
              className="bg-[#3BAFBB1A] text-gray-300 rounded-lg px-4 py-2 border border-[#3BAFBB] focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] resize-none"
              placeholder="Enter ticket description (optional)"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
