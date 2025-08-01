'use client';
import React, { useState } from 'react';
import { EventDetails } from './EventDetails';
import { CreateTicket } from './CreateTicket';
import { CreateArtist } from './CreateArtist';
import { EventTags } from './EventTags';
import { FloppyDisk } from '@phosphor-icons/react';
import { AddRrpp } from './AddRrpp';

export default function CreateEventPage() {
  const [eventDate, setEventDate] = useState<Date | undefined>(); // Cambiado a Date simple
  const [location, setLocation] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center py-30 gap-4">
        <h1 className="text-5xl text-[#3BAFBB] font-bold">Create New Event</h1>
        <p className="text-gray-300 text-xl">
          Bring your vision to life and create unforgettable experiences
        </p>
      </div>
      <EventDetails
        eventDate={eventDate}
        setEventDate={setEventDate}
        location={location}
        setLocation={setLocation}
      />
      <div>
        <CreateArtist />
      </div>
      <div>
        <CreateTicket />
      </div>
      <div>
        <EventTags />
      </div>
      <div>
        <AddRrpp />
      </div>

      <div className="flex items-center justify-center w-full py-10 ">
        <button className="cursor-pointer flex gap-2 items-center text-xl bg-[#3BAFBB] hover:bg-[#2A8C99] text-white font-semibold px-16 py-5 rounded-2xl transition-all">
          <FloppyDisk size={32} />
          Create Event
        </button>
      </div>
    </div>
  );
}
