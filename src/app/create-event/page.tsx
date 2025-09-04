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
    <motion.div
      className="flex flex-col min-h-screen px-6 max-w-6xl mx-auto"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={item}
        className="flex flex-col items-center justify-center py-30 gap-4"
      >
        <h1 className="text-5xl text-[#3BAFBB] font-bold">Create New Event</h1>
        <p className="text-gray-300 text-xl">
          Bring your vision to life and create unforgettable experiences
        </p>
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
        className="flex items-center justify-center w-full py-10"
      >
        <button className="cursor-pointer flex gap-2 items-center text-xl bg-[#3BAFBB] hover:bg-[#2A8C99] text-white font-semibold px-16 py-5 rounded-2xl transition-all">
          <FloppyDisk size={32} />
          Create Event
        </button>
      </motion.div>
    </motion.div>
  );
}
