import React from 'react';
import { CurrencyDollarSimple, Plus, Minus } from '@phosphor-icons/react';
import { useEventForm } from './hooks/useEventForm';

export const CreateTicket = () => {
  const { eventForm, addTicket, updateTicket, removeTicket } = useEventForm();

  const handleAddTicket = () => {
    addTicket({
      type: '',
      price: 0,
      quantity: '',
      maxQuantity: '',
      description: '',
      benefits: [],
    });
  };

  const handleRemoveTicket = (indexToRemove: number) => {
    if (eventForm.tickets.length === 1) return;
    removeTicket(indexToRemove);
  };

  const handleTicketChange = (
    index: number,
    field: keyof typeof eventForm.tickets[0],
    value: string | number
  ) => {
    const ticket = eventForm.tickets[index];
    updateTicket(index, {
      ...ticket,
      [field]: value,
    });
  };

  const preventNegativeAndE = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === 'e') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 max-w-[1400px] rounded-xl p-8 mx-auto mt-8 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-16 max-[500px]:flex-col max-[500px]:items-center max-[500px]:gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <CurrencyDollarSimple
            className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
            size={24}
          />
          <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-xl font-bold relative">
            Ticket Types & Pricing
            {/* Neon glow effect */}
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">
              Ticket Types & Pricing
            </div>
          </span>
        </div>
        <button
          onClick={handleAddTicket}
          className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
        >
          <Plus
            size={18}
            className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
          />
          <span className="relative z-10">Add Ticket Type</span>
          {/* Button glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
        </button>
      </div>

      <div className="flex flex-col gap-14 relative z-10">
        {eventForm.tickets.map((ticket, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-pink-500/5 via-purple-900/10 to-cyan-400/5 relative rounded-xl p-4 flex flex-col gap-4 backdrop-blur-sm border border-pink-500/20"
          >
            {eventForm.tickets.length > 1 && (
              <div className=" right-0 -top-10 absolute">
                <button
                  onClick={() => handleRemoveTicket(index)}
                  className="cursor-pointer mb-2 text-cyan-300 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
                >
                  <Minus
                    size={16}
                    className="drop-shadow-[0_0_4px_rgba(6,182,212,0.2)]"
                  />
                  Remove
                </button>
              </div>
            )}

            <div className=" flex gap-4 max-[800px]:flex-col">
              <div className="flex flex-col w-1/3 max-[800px]:w-full">
                <label className="text-cyan-300 text-sm mb-2">Type</label>
                <input
                  type="text"
                  value={ticket.type}
                  onChange={(e) => handleTicketChange(index, 'type', e.target.value)}
                  className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter ticket type"
                />
              </div>
              <div className="flex flex-col w-1/3 max-[800px]:w-full">
                <label className="text-cyan-300 text-sm mb-2">Price</label>
                <input
                  type="number"
                  min="1"
                  value={ticket.price || ''}
                  onChange={(e) => handleTicketChange(index, 'price', parseFloat(e.target.value) || 0)}
                  onKeyDown={preventNegativeAndE}
                  className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                  placeholder="0"
                />
              </div>
              <div className="flex flex-col w-1/3 max-[800px]:w-full">
                <label className="text-cyan-300 text-sm mb-2">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={ticket.quantity}
                  onChange={(e) => handleTicketChange(index, 'quantity', e.target.value)}
                  onKeyDown={preventNegativeAndE}
                  className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
                  placeholder="0"
                />
              </div>
            </div>
            <label className="text-cyan-300 text-sm">Description</label>
            <textarea
              value={ticket.description}
              onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
              className="bg-black/20 text-cyan-300 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300 resize-none"
              placeholder="Enter ticket description (optional)"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
