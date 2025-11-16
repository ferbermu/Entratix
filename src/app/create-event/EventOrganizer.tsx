'use client';
import React from 'react';
import { useEventForm } from './hooks/useEventForm';

export const EventOrganizer = () => {
  const { eventForm, updateField } = useEventForm();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white mb-2">Organizer Name</label>
        <input
          type="text"
          value={eventForm.organizerName}
          onChange={(e) => updateField('organizerName', e.target.value)}
          placeholder="Event Productions Inc."
          className="w-full px-4 py-2 bg-black/50 border border-cyan-400/30 rounded-lg text-white focus:border-pink-500/50 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white mb-2">Organizer Email</label>
        <input
          type="email"
          value={eventForm.organizerEmail}
          onChange={(e) => updateField('organizerEmail', e.target.value)}
          placeholder="contact@eventprod.com"
          className="w-full px-4 py-2 bg-black/50 border border-cyan-400/30 rounded-lg text-white focus:border-pink-500/50 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white mb-2">Organizer Phone</label>
        <input
          type="tel"
          value={eventForm.organizerPhone}
          onChange={(e) => updateField('organizerPhone', e.target.value)}
          placeholder="+34 600 123 456"
          className="w-full px-4 py-2 bg-black/50 border border-cyan-400/30 rounded-lg text-white focus:border-pink-500/50 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-white mb-2">Organizer Logo URL</label>
        <input
          type="text"
          value={eventForm.organizerLogo}
          onChange={(e) => updateField('organizerLogo', e.target.value)}
          placeholder="https://example.com/logo.png"
          className="w-full px-4 py-2 bg-black/50 border border-cyan-400/30 rounded-lg text-white focus:border-pink-500/50 focus:outline-none"
        />
      </div>
    </div>
  );
};

