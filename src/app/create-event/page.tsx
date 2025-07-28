'use client';

import { CalendarDropdown } from '@/components/CalendarDropdown';
import { MusicNotesPlus } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';

export default function CreateEventPage() {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div className="flex flex-col  min-h-screen ">
      <div className="flex flex-col items-center justify-center py-30 gap-4">
        <h1 className="text-5xl text-[#3BAFBB] font-bold">Create New Event</h1>
        <p className="text-gray-300 text-xl">
          Bring your vision to life and create unforgettable experiences
        </p>
      </div>
      <div className="flex items-center justify-center gap-6 px-4">
        <form className="bg-[#3BAFBB1A] border border-[#3BAFBB] rounded-xl w-full max-w-[1400px] p-8">
          <div className="flex items-center gap-4">
            <MusicNotesPlus className="text-[#3BAFBB] " size={36} />
            <p className="text-gray-300 text-2xl font-semibold">
              Event Details
            </p>
          </div>
          <div className="mt-8 w-full flex gap-8">
            <div className="flex flex-col w-full">
              <label className="text-gray-300 text-md  mb-2">
                Event Title *
              </label>
              <input
                type="text"
                className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
                placeholder="Enter event title"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-300 text-md  mb-2">Category *</label>
              <input
                type="text"
                className="border border-[#3BAFBB] rounded-lg w-full py-2 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
                placeholder="Enter event category"
              />
            </div>
          </div>
          <div className="flex flex-col w-full mt-6">
            <label className="text-gray-300 text-md  mb-2">Description *</label>
            <textarea
              className="border border-[#3BAFBB] rounded-lg w-full min-h-[180px] p-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB] resize-none"
              placeholder="Describe your event..."
            />
          </div>
          <div className="mt-8 w-full flex gap-8">
            <div className="flex flex-col w-full">
              <label className="text-gray-300 text-md  mb-2">Date *</label>
              <div className="border border-[#3BAFBB] py-2 px-4 rounded-lg">
                <CalendarDropdown
                  width="w-1/2"
                  location="right"
                  date={date}
                  onDateChange={setDate}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-gray-300 text-md  mb-2">Time *</label>
              <input
                type="text"
                className="border border-[#3BAFBB] rounded-lg w-full py-3 px-4 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BAFBB] focus:border-[#3BAFBB]"
                placeholder="Enter event category"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
