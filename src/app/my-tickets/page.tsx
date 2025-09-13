'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
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
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      type: 'spring',
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Variants para cada tarjeta con animación suave
const item: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
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
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black relative overflow-hidden">
      {/* Enhanced retrowave background effects - Fixed opacity */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-500/20 via-purple-900/40 to-black/80 pointer-events-none opacity-100 z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent pointer-events-none opacity-100 z-0"></div>

      {/* Retrowave grid background - Fixed opacity */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 20, 147, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      {/* Enhanced neon glow effects - Fixed opacity with stacking context isolation */}
      <div
        className="fixed top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 blur-3xl rounded-full z-0"
        style={{ opacity: 1, isolation: 'isolate', willChange: 'auto' }}
      ></div>
      <div
        className="fixed bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/25 via-pink-500/25 to-purple-500/25 blur-3xl rounded-full z-0"
        style={{ opacity: 1, isolation: 'isolate', willChange: 'auto' }}
      ></div>
      <div
        className="fixed top-1/2 right-10 w-60 h-60 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 blur-2xl rounded-full z-0"
        style={{
          opacity: 1,
          isolation: 'isolate',
          willChange: 'auto',
          transform: 'translateZ(0)',
        }}
      ></div>

      <div className="relative z-10 w-full h-full min-h-screen px-60 max-[1400px]:px-4 text-white">
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

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStatus} // Key única para triggear animaciones al cambiar filtro
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-2 max-[1200px]:grid-cols-1 justify-center gap-8 mb-8"
          >
            {filteredTickets.map((ticket, idx) => (
              <motion.div
                key={`${selectedStatus}-${ticket.title}-${idx}`} // Key única por filtro
                variants={item}
                whileHover={{
                  y: -4,
                  scale: 1.01,
                  transition: {
                    duration: 0.2,
                    ease: 'easeOut',
                  },
                }}
                whileTap={{ scale: 0.98 }}
                layout // Animación suave cuando cambia el layout
              >
                <CardTicket {...ticket} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <motion.div
          variants={item}
          whileHover={{
            scale: 1.005,
            y: -2,
            transition: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
          initial="hidden"
          animate="show"
        >
          <TotalTickets />
        </motion.div>
      </div>
    </div>
  );
}
