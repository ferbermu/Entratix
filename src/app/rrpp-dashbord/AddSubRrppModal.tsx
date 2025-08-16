'use client';
import React, { useState, useMemo } from 'react';
import {
  X,
  Envelope,
  Calendar,
  MagnifyingGlass,
  Check,
} from '@phosphor-icons/react';

export interface Event {
  id: string;
  name: string;
  date: string;
  status: 'Active' | 'Inactive';
}

export interface AddSubRrppModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onAddSubRrpp: (
    email: string,
    selectedEvents: string[],
    enableCashSales: boolean
  ) => void;
}

export const AddSubRrppModal: React.FC<AddSubRrppModalProps> = ({
  isOpen,
  onClose,
  events,
  onAddSubRrpp,
}) => {
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [enableCashSales, setEnableCashSales] = useState(false);

  // Filtrar eventos basado en la búsqueda
  const filteredEvents = useMemo(() => {
    return events.filter(
      event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [events, searchTerm]);

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventId)
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSubmit = () => {
    if (email.trim() && selectedEvents.length > 0) {
      onAddSubRrpp(email, selectedEvents, enableCashSales);
      // Reset form
      setEmail('');
      setSearchTerm('');
      setSelectedEvents([]);
      setEnableCashSales(false);
      onClose();
    }
  };

  const handleCancel = () => {
    // Reset form
    setEmail('');
    setSearchTerm('');
    setSelectedEvents([]);
    setEnableCashSales(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={handleCancel} />

      <div className="relative w-[95%] max-w-[600px] bg-[#1C1A1A] rounded-2xl shadow-2xl border border-[#3BAFBB40] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#3BAFBB40] bg-[#3BAFBB1A]">
          <div>
            <h3 className="text-2xl font-bold text-white">Add Sub RRPP</h3>
            <p className="text-sm text-[#A3A3A3]">
              Assign a new Sub RRPP to events
            </p>
          </div>
          <button
            className="cursor-pointer p-2 rounded-md bg-[#3BAFBB1A] hover:bg-[#3BAFBB33] text-[#3BAFBB] border border-[#3BAFBB40]"
            onClick={handleCancel}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Email Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Envelope size={20} className="text-[#3BAFBB]" />
              <h4 className="text-lg font-semibold text-white">
                Email Address
              </h4>
              <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <Envelope
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
              />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-[#1C1C2E]/10 border border-[#3BAFBB40] rounded-md text-sm text-white placeholder:text-[#A3A3A3] px-10 py-3"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Permissions Section */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white">Permissions</h4>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="custom-checkbox"
                checked={enableCashSales}
                onChange={e => setEnableCashSales(e.target.checked)}
              />
              <span className="text-sm text-gray-300">
                Enable cash sales for this Sub RRPP
              </span>
            </label>
          </div>

          {/* Event Assignment Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-[#3BAFBB]" />
              <h4 className="text-lg font-semibold text-white">
                Event Assignment
              </h4>
              <span className="text-red-500">*</span>
            </div>

            {/* Search Events */}
            <div className="relative">
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
              />
              <input
                placeholder="Search events by name or date..."
                className="w-full bg-[#1C1C2E]/10 border border-[#3BAFBB40] rounded-md text-sm text-white placeholder:text-[#A3A3A3] px-9 py-2"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Events List */}
            <div className="max-h-[200px] overflow-y-auto border border-[#3BAFBB40] rounded-md">
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border-b border-[#3BAFBB20] last:border-b-0 hover:bg-[#3BAFBB0A]"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedEvents.includes(event.id)}
                      onChange={() => handleEventToggle(event.id)}
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {event.name}
                      </p>
                      <p className="text-xs text-[#A3A3A3]">{event.date}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    <Check size={12} />
                    {event.status}
                  </span>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <div className="p-4 text-center text-[#A3A3A3] text-sm">
                  No events found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-[#3BAFBB40] bg-[#3BAFBB1A]">
          <button
            className="px-6 py-2 text-sm font-medium text-gray-300 bg-[#1C1A1A] border border-[#3BAFBB40] rounded-md hover:bg-[#3BAFBB1A] transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-[#3BAFBB] border border-[#3BAFBB] rounded-md hover:bg-[#2B9FA9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!email.trim() || selectedEvents.length === 0}
          >
            Add Sub RRPP
          </button>
        </div>
      </div>
    </div>
  );
};
