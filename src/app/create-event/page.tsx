'use client';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { EventDetails } from './EventDetails';
import { CreateTicket } from './CreateTicket';

export default function CreateEventPage() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [location, setLocation] = useState('');
  const [hour, setHour] = useState<number | ''>('');
  const [minute, setMinute] = useState<number | ''>('');

  const getAmPm = (h: number | '') => {
    if (h === '') return '';
    return h >= 12 ? 'PM' : 'AM';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center py-30 gap-4">
        <h1 className="text-5xl text-[#3BAFBB] font-bold">Create New Event</h1>
        <p className="text-gray-300 text-xl">
          Bring your vision to life and create unforgettable experiences
        </p>
      </div>
      <EventDetails
        date={date}
        setDate={setDate}
        location={location}
        setLocation={setLocation}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        getAmPm={getAmPm}
      />
      <div>
        <CreateTicket />
      </div>
    </div>
  );
}
