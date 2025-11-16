'use client';
import React from 'react';
import { useEventForm } from './hooks/useEventForm';
import { User } from '@phosphor-icons/react';

export const EventOrganizer = () => {
  const { eventForm, updateField } = useEventForm();

  return (
    <div className="bg-gradient-to-br from-pink-500/10 via-purple-900/20 to-cyan-400/10 border border-pink-500/30 max-w-[1400px] rounded-xl p-8 mx-auto mt-8 backdrop-blur-sm relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-cyan-400/5 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <User className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]" size={24} />
          <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-xl font-bold relative">
            Organizer Information
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-30">Organizer Information</div>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-cyan-300 text-sm mb-2">Organizer Name</label>
            <input
              type="text"
              value={eventForm.organizerName}
              onChange={(e) => updateField('organizerName', e.target.value)}
              placeholder="Event Productions Inc."
              className="w-full bg-black/20 text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-300 text-sm mb-2">Organizer Email</label>
            <input
              type="email"
              value={eventForm.organizerEmail}
              onChange={(e) => updateField('organizerEmail', e.target.value)}
              placeholder="contact@eventprod.com"
              className="w-full bg-black/20 text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-300 text-sm mb-2">Organizer Phone</label>
            <input
              type="tel"
              value={eventForm.organizerPhone}
              onChange={(e) => updateField('organizerPhone', e.target.value)}
              placeholder="+34 600 123 456"
              className="w-full bg-black/20 text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-cyan-300 text-sm mb-2">Organizer Logo URL</label>
            <input
              type="text"
              value={eventForm.organizerLogo}
              onChange={(e) => updateField('organizerLogo', e.target.value)}
              placeholder="https://example.com/logo.png"
              className="w-full bg-black/20 text-cyan-300 placeholder-gray-400 rounded-lg px-4 py-2 border border-pink-500/30 focus:outline-none focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

