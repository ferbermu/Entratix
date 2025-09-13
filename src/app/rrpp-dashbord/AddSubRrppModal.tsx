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

      <div className="relative w-[95%] max-w-[600px] bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 rounded-2xl shadow-2xl border border-pink-500/30 overflow-hidden backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-pink-500/30 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20">
          <div>
            <h3 className="text-2xl font-bold text-white">Add Sub RRPP</h3>
            <p className="text-sm text-cyan-300">
              Assign a new Sub RRPP to events
            </p>
          </div>
          <button
            className="cursor-pointer p-2 rounded-md bg-gradient-to-r from-pink-500/30 to-purple-500/30 hover:from-pink-500/40 hover:to-purple-500/40 text-cyan-300 border border-pink-500/30 backdrop-blur-sm"
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
              <Envelope
                size={20}
                className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />
              <h4 className="text-lg font-semibold text-white">
                Email Address
              </h4>
              <span className="text-red-500">*</span>
            </div>
            <div className="relative">
              <Envelope
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full bg-black/30 border border-pink-500/30 rounded-md text-sm text-cyan-300 placeholder:text-gray-400 px-10 py-3 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
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
              <Calendar
                size={20}
                className="text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />
              <h4 className="text-lg font-semibold text-white">
                Event Assignment
              </h4>
              <span className="text-red-500">*</span>
            </div>

            {/* Search Events */}
            <div className="relative">
              <MagnifyingGlass
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.3)]"
              />
              <input
                placeholder="Search events by name or date..."
                className="w-full bg-black/30 border border-pink-500/30 rounded-md text-sm text-cyan-300 placeholder:text-gray-400 px-9 py-2 backdrop-blur-sm focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Events List */}
            <div className="max-h-[200px] overflow-y-auto border border-pink-500/30 rounded-md bg-black/20 backdrop-blur-sm">
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border-b border-pink-500/20 last:border-b-0 hover:bg-gradient-to-r hover:from-pink-500/10 hover:via-purple-500/10 hover:to-cyan-400/10"
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
                      <p className="text-xs text-cyan-300">{event.date}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    <Check size={12} />
                    {event.status}
                  </span>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <div className="p-4 text-center text-cyan-300 text-sm">
                  No events found
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end gap-3 p-5 border-t border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10">
          <button
            className="px-6 py-2 text-sm font-medium text-cyan-300 bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/30 rounded-md hover:from-pink-500/40 hover:to-purple-500/40 backdrop-blur-sm transition-colors"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 border border-pink-500/20 hover:border-cyan-400 rounded-md backdrop-blur-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            onClick={handleSubmit}
            disabled={!email.trim() || selectedEvents.length === 0}
          >
            <span className="relative z-10">Add Sub RRPP</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
          </button>
        </div>
      </div>
    </div>
  );
};
