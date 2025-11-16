'use client';

import { CalendarDots, Clock, Ticket } from '@phosphor-icons/react';
import React from 'react';

interface EventDataProps {
  date: string;
  time: string;
  startingPrice: number;
}

export const EventData: React.FC<EventDataProps> = ({ date, time, startingPrice }) => {
  return (
    <div className="flex flex-col items-start bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md text-md text-gray-300 divide-y divide-gray-600/40 border border-gray-600/40 rounded-lg p-6 shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.2)] transition-all duration-300">
      <div className="flex flex-col gap-2  pb-8 w-full">
        <div className="flex items-center gap-2">
          <CalendarDots className="text-pink-500 w-8 h-8 drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]" />
          <p className="text-pink-500 text-lg font-condensed drop-shadow-[0_0_8px_rgba(255,20,147,0.6)]">
            Date
          </p>
        </div>

        <p className="text-3xl font-condensed text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text drop-shadow-[0_0_10px_rgba(255,20,147,0.5)]">
          {date}
        </p>
      </div>
      <div className="flex flex-col gap-2 py-8  w-full">
        <div className="flex items-center gap-2">
          <Clock className="text-purple-500 w-8 h-8 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          <p className="text-purple-500 text-lg font-condensed drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
            Time
          </p>
        </div>

        <p className="text-3xl font-condensed text-transparent bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 bg-clip-text drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          {time}
        </p>
      </div>
      <div className="flex flex-col gap-2 pt-8  w-full">
        <div className="flex items-center gap-2">
          <Ticket className="text-cyan-400 w-8 h-8 drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
          <p className="text-cyan-400 text-lg font-condensed drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
            Starting Price
          </p>
        </div>

        <p className="text-3xl font-condensed text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">
          ${startingPrice}
        </p>
      </div>
    </div>
  );
};

