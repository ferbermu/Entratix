'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { type DateRange } from 'react-day-picker';
import { TicketAdquired } from './TicketAdquired';
import { CardTicket, CardTicketProps } from './CardTicket';
import { TotalTickets } from './TotalTickets';

const tickets: CardTicketProps[] = [
  {
    status: 'Active',
    imageUrl: '/assets/show1.jpg',
    title: 'Latin Beats Festival',
    artists: 'Various Artists',
    date: 'Sat, Sep 21',
    time: '20:00',
    location: 'Hollywood Bowl, Los Angeles, CA',
    ticketType: '2× VIP Experience',
    ticketPrice: '$240',
    totalPaid: '$240',
  },
  {
    status: 'Expired',
    imageUrl: '/assets/show2.jpg',
    title: 'Rock Night',
    artists: 'The Rockers',
    date: 'Fri, Aug 15',
    time: '22:00',
    location: 'Madison Square Garden, NY',
    ticketType: '1× General Admission',
    ticketPrice: '$80',
    totalPaid: '$80',
  },
];

export default function MyTicketsPage() {
  const [,] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });

  return (
    <div className="w-full h-full min-h-screen px-60 max-[1400px]:px-4  text-white">
      <Header />
      <div className="py-8">
        <TicketAdquired />
      </div>
      <div className="grid grid-cols-2 max-[1200px]:grid-cols-1 justify-center gap-8">
        {tickets.map((ticket, idx) => (
          <CardTicket key={idx} {...ticket} />
        ))}
        <TotalTickets />
      </div>
    </div>
  );
}
