'use client';

import React, { useState, useCallback } from 'react';
import { Header } from './Header';
import { SearchBar } from '@/app/components/SearchBar';
import { type DateRange } from 'react-day-picker';
import { TicketAdquired } from './TicketAdquired';
import { CardTicket, CardTicketProps } from './CardTicket';

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
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });

  const handleFilterChange = useCallback(
    (newFilters: {
      searchTerm: string;
      dateRange?: DateRange;
      location: string;
    }) => {
      setFilters({ ...newFilters, dateRange: newFilters.dateRange });
    },
    []
  );

  return (
    <div className="w-full h-full min-h-screen px-60 text-white">
      <Header />
      <SearchBar onFilterChange={handleFilterChange} />
      <div className="py-8">
        <TicketAdquired />
      </div>
      <div className="flex justify-center gap-8">
        {tickets.map((ticket, idx) => (
          <CardTicket key={idx} {...ticket} />
        ))}
      </div>
      <div>
        <TotalTickets />
      </div>
    </div>
  );
}
import Image from 'next/image';
import { TotalTickets } from './TotalTickets';
