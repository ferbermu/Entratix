'use client';

import { CalendarDots, Clock, Ticket } from '@phosphor-icons/react';
import React from 'react';

export interface EventDataProps {
  icon: string;
  title: string;
  text: string;
}

export const EventData = () => {
  return (
    <div className="flex flex-col  items-start bg-[#3BAFBB0D]  text-md text-gray-300  divide-y divide-[#3BAFBB]  border border-[#3BAFBB29] rounded-lg p-6">
      <div className="flex flex-col gap-2  pb-8 w-full">
        <div className="flex items-center gap-2">
          <CalendarDots className="text-[#3BAFBB] w-8 h-8 " />
          <p className="text-[#3BAFBB] text-lg ">Date</p>
        </div>

        <p className="text-3xl">Friday, March 15</p>
      </div>
      <div className="flex flex-col gap-2 py-8  w-full">
        <div className="flex items-center gap-2">
          <Clock className="text-[#3BAFBB] w-8 h-8 " />
          <p className="text-[#3BAFBB] text-lg ">Time</p>
        </div>

        <p className="text-3xl">19:00 - 23:00</p>
      </div>
      <div className="flex flex-col gap-2 pt-8  w-full">
        <div className="flex items-center gap-2">
          <Ticket className="text-[#3BAFBB] w-8 h-8 " />
          <p className="text-[#3BAFBB] text-lg ">Starting Price</p>
        </div>

        <p className="text-3xl">$700</p>
      </div>
    </div>
  );
};
