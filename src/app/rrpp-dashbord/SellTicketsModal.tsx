'use client';
import React from 'react';
import {
  X,
  User,
  Phone,
  EnvelopeSimple,
  Ticket as TicketIcon,
} from '@phosphor-icons/react';
import { CustomDropdown } from './CustomDropdown';

type TicketType = 'VIP' | 'General' | 'Early Bird';

const TICKET_PRICES: Record<TicketType, number> = {
  VIP: 120,
  General: 80,
  'Early Bird': 60,
};

export interface SellTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
  ticketsLeft: number;
  onComplete?: (payload: {
    fullName: string;
    idNumber: string;
    phone: string;
    email: string;
    ticketType: TicketType;
    quantity: number;
    total: number;
  }) => void;
}

export const SellTicketsModal: React.FC<SellTicketsModalProps> = ({
  isOpen,
  onClose,
  eventName,
  ticketsLeft,
  onComplete,
}) => {
  const [fullName, setFullName] = React.useState('');
  const [idNumber, setIdNumber] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [ticketType, setTicketType] = React.useState<TicketType>('VIP');
  const [quantity, setQuantity] = React.useState<number>(1);

  if (!isOpen) return null;

  const unitPrice = TICKET_PRICES[ticketType];
  const total = unitPrice * quantity;

  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        fullName,
        idNumber,
        phone,
        email,
        ticketType,
        quantity,
        total,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative w-[95%] max-w-[880px] bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 rounded-2xl shadow-2xl border border-pink-500/30 overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="p-5 border-b border-pink-500/30 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white">Sell Tickets</h3>
            <p className="text-sm text-gray-300">{eventName}</p>
            <p className="text-xs text-cyan-400 mt-1">
              {ticketsLeft} tickets remaining
            </p>
          </div>
          <button
            className="cursor-pointer p-2 rounded-md bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/40 hover:to-purple-500/40 text-cyan-300 hover:text-white border border-pink-500/30 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                <User size={18} />
              </span>
              <h4 className="text-white font-semibold">Customer Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Enter customer's full name"
                  className="w-full bg-black/30 border border-pink-500/30 rounded-md text-cyan-300 placeholder:text-gray-400 px-4 py-3 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={idNumber}
                  onChange={e => setIdNumber(e.target.value)}
                  placeholder="Enter CI or ID number"
                  className="w-full bg-black/30 border border-pink-500/30 rounded-md text-cyan-300 placeholder:text-gray-400 px-4 py-3 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                />
              </div>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1234567890"
                  className="w-full pl-9 bg-black/20 border border-pink-500/30 rounded-md text-cyan-300 placeholder:text-gray-400 px-4 py-3 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                />
              </div>
              <div className="relative">
                <EnvelopeSimple
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="customer@email.com"
                  className="w-full pl-9 bg-black/20 border border-pink-500/30 rounded-md text-cyan-300 placeholder:text-gray-400 px-4 py-3 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Ticket Selection */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]">
                <TicketIcon size={18} />
              </span>
              <h4 className="text-white font-semibold">Ticket Selection</h4>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <CustomDropdown
                  options={(Object.keys(TICKET_PRICES) as TicketType[]).map(k =>
                    String(k)
                  )}
                  selected={ticketType}
                  onSelect={val => setTicketType(val as TicketType)}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]">
                  ▾
                </span>
              </div>
              <div>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={e =>
                    setQuantity(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-full bg-black/30 border border-pink-500/30 rounded-md text-cyan-300 placeholder:text-gray-400 px-4 py-3 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                  placeholder="Quantity"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 flex gap-4 justify-end">
          <button
            className="cursor-pointer bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/40 hover:to-purple-500/40 text-cyan-300 px-6 py-2 rounded-md border border-pink-500/30 backdrop-blur-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="cursor-pointer bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 text-white px-6 py-2 rounded-md backdrop-blur-sm border border-pink-500/20 hover:border-cyan-400 relative overflow-hidden"
            onClick={handleComplete}
          >
            <span className="relative z-10">Complete Sale - ${total}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellTicketsModal;
