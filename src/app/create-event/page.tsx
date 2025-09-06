'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { EventDetails } from './EventDetails';
import { CreateTicket } from './CreateTicket';
import { CreateArtist } from './CreateArtist';
import { EventTags } from './EventTags';
import { FloppyDisk } from '@phosphor-icons/react';
import { AddRrpp } from './AddRrpp';

export default function CreateEventPage() {
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const [location, setLocation] = useState('');

  // Variants para stagger
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <motion.div
        className="flex flex-col min-h-screen px-6 max-w-6xl mx-auto relative"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Retrowave grid background effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 20, 147, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center py-30 gap-4 relative z-10"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl relative">
            Create New Event
            {/* Multiple neon glow layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent blur-sm opacity-70">
              Create New Event
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent blur-md opacity-40">
              Create New Event
            </div>
          </h1>
          <p className="text-cyan-300 text-xl font-light tracking-wide relative">
            Bring your vision to life and create unforgettable experiences
            {/* Text glow effect */}
            <div className="absolute inset-0 text-cyan-300 blur-sm opacity-60">
              Bring your vision to life and create unforgettable experiences
            </div>
          </p>
          {/* Enhanced neon glow effects */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-cyan-400/30 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-80 h-24 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-cyan-300/20 blur-2xl rounded-full"></div>
        </motion.div>

        <motion.div variants={item}>
          <EventDetails
            eventDate={eventDate}
            setEventDate={setEventDate}
            location={location}
            setLocation={setLocation}
          />
        </motion.div>

        <motion.div variants={item}>
          <CreateArtist />
        </motion.div>

        <motion.div variants={item}>
          <CreateTicket />
        </motion.div>

        <motion.div variants={item}>
          <EventTags />
        </motion.div>

        <motion.div variants={item}>
          <AddRrpp />
        </motion.div>

        <motion.div
          variants={item}
          className="flex items-center justify-center w-full py-10 relative z-10"
        >
          <button className="cursor-pointer flex gap-2 items-center text-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 text-white font-bold px-16 py-5 rounded-2xl transition-all duration-300 transform hover:scale-110 relative overflow-hidden group border border-pink-500/50 hover:border-cyan-400/80">
            {/* Multiple glow layers */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-cyan-500/30 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 blur-2xl group-hover:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/10 via-purple-400/10 to-cyan-300/10 blur-3xl group-hover:blur-[40px] opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300"></div>

            <FloppyDisk size={32} className="relative z-10 drop-shadow-lg" />
            <span className="relative z-10 drop-shadow-lg">Create Event</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
