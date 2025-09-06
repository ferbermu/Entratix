'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Header } from './Header';
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
  {
    status: 'Completed',
    imageUrl: '/assets/show3.jpg',
    title: 'Pop Party',
    artists: 'Pop Stars',
    date: 'Thu, Jul 10',
    time: '19:00',
    location: 'Staples Center, LA',
    ticketType: '1× VIP',
    ticketPrice: '$120',
    totalPaid: '$120',
  },
  {
    status: 'Active',
    imageUrl: '/assets/show4.jpg',
    title: 'EDM Night',
    artists: 'DJ Energy',
    date: 'Sat, Oct 5',
    time: '23:00',
    location: 'Ibiza Club, Spain',
    ticketType: '3× VIP',
    ticketPrice: '$360',
    totalPaid: '$360',
  },
  {
    status: 'Expired',
    imageUrl: '/assets/show5.jpg',
    title: 'Jazz Evening',
    artists: 'Smooth Jazz Band',
    date: 'Sun, Jul 20',
    time: '18:00',
    location: 'Blue Note, NY',
    ticketType: '2× General Admission',
    ticketPrice: '$100',
    totalPaid: '$100',
  },
  {
    status: 'Completed',
    imageUrl: '/assets/show1.jpg',
    title: 'Indie Fest',
    artists: 'Indie Stars',
    date: 'Mon, Aug 11',
    time: '21:00',
    location: 'Open Air, Berlin',
    ticketType: '1× VIP',
    ticketPrice: '$150',
    totalPaid: '$150',
  },
];

// Variants para stagger en la grilla
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

// Variants para cada tarjeta
const item: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function MyTicketsPage() {
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Filtrar tickets según el estado seleccionado
  const filteredTickets =
    selectedStatus === 'All'
      ? tickets
      : tickets.filter(
          ticket => ticket.status.toLowerCase() === selectedStatus.toLowerCase()
        );

  return (
    <div className="w-full h-full min-h-screen px-60 max-[1400px]:px-4 text-white">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-8"
      >
        <TicketAdquired
          selected={selectedStatus}
          onSelect={setSelectedStatus}
        />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 max-[1200px]:grid-cols-1 justify-center gap-8 mb-8"
      >
        {filteredTickets.map((ticket, idx) => (
          <motion.div key={idx} variants={item}>
            <CardTicket {...ticket} />
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={item}>
        <TotalTickets />
      </motion.div>
    </div>
  );
}
