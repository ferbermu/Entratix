'use client';

import { CalendarDots, Clock, Ticket } from '@phosphor-icons/react';
import React from 'react';

export interface EventDataProps {
  date: Date;
  startTime: string;
  endTime: string;
  minPrice: number;
}

export const EventData = ({ date, startTime, endTime, minPrice }: EventDataProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col  items-start bg-[#3BAFBB0D]  text-md text-gray-300  divide-y divide-[#3BAFBB]  border border-[#3BAFBB29] rounded-lg p-6">
      <div className="flex flex-col gap-2  pb-8 w-full">
        <div className="flex items-center gap-2">
          <CalendarDots className="text-[#3BAFBB] w-8 h-8 " />
          <p className="text-[#3BAFBB] text-lg ">Date</p>
        </div>

        <p className="text-3xl">{formattedDate}</p>
      </div>
      <div className="flex flex-col gap-2 py-8  w-full">
        <div className="flex items-center gap-2">
          <Clock className="text-[#3BAFBB] w-8 h-8 " />
          <p className="text-[#3BAFBB] text-lg ">Time</p>
        </div>

        <p className="text-3xl">{startTime} - {endTime}</p>
      </div>
      <div className="flex flex-col gap-2 pt-8  w-full">
        <div className="flex items-center gap-2">
          <Ticket className="text-[#3BAFBB] w-8 h-8 " />
          <p className="text-[#3BAFBB] text-lg ">Starting Price</p>
        </div>

        <p className="text-3xl">${minPrice}</p>
      </div>
    </div>
  );
};
