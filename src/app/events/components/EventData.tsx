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
    <div className="flex items-center gap-2 text-md text-gray-300 ">
      <CalendarDots className="text-red-500 w-20 h-20" />
      <Clock className="text-red-500 w-20 h-20" />
      <Ticket className="text-red-500 w-20 h-20 " />
    </div>
  );
};
