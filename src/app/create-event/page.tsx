'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { EventDetails } from './EventDetails';
import { CreateTicket } from './CreateTicket';
import { CreateArtist } from './CreateArtist';
import { EventTags } from './EventTags';
import { EventImages } from './EventImages';
import { EventOrganizer } from './EventOrganizer';
import { FloppyDisk } from '@phosphor-icons/react';
import { AddRrpp } from './AddRrpp';
import { useEventForm } from './hooks/useEventForm';
import { useRouter } from 'next/navigation';
import { generateRandomEventData } from './utils/randomEventData';

export default function CreateEventPage() {
  const { createEvent, resetForm, eventForm, updateField, addTicket, addArtist, addBannerImage, addTag, addRrppEmail } = useEventForm();
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleFillRandomData = () => {
    const randomData = generateRandomEventData();

    updateField('title', randomData.title);
    updateField('category', randomData.category);
    updateField('description', randomData.description);
    updateField('date', randomData.date);
    updateField('startTime', randomData.startTime);
    updateField('endTime', randomData.endTime);
    updateField('address', randomData.address);
    updateField('location', randomData.location);
    updateField('cardImageUrl', randomData.cardImageUrl);
    updateField('carouselImageUrl', randomData.carouselImageUrl || '');
    updateField('isFeatured', randomData.isFeatured);
    updateField('isCarousel', randomData.isCarousel);
    updateField('organizerName', randomData.organizerName);
    updateField('organizerEmail', randomData.organizerEmail);
    updateField('organizerPhone', randomData.organizerPhone);
    updateField('organizerLogo', randomData.organizerLogo);

    randomData.bannerImageUrls.forEach((url) => {
      addBannerImage(url);
    });

    randomData.tickets.forEach((ticket) => {
      addTicket(ticket);
    });

    randomData.artists.forEach((artist) => {
      addArtist(artist);
    });

    if (randomData.tags) {
      randomData.tags.forEach((tag) => addTag(tag));
    }

    if (randomData.rrppEmails) {
      randomData.rrppEmails.forEach((email) => addRrppEmail(email));
    }

    alert('Random event data generated! Review and click "Create Event"');
  };

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

  const handleCreateEvent = async () => {
    if (!eventForm.title || !eventForm.category || !eventForm.description) {
      alert('Please fill in all required fields: Title, Category, and Description');
      return;
    }

    if (!eventForm.date) {
      alert('Please select an event date');
      return;
    }

    if (!eventForm.startTime || !eventForm.endTime) {
      alert('Please set start and end times');
      return;
    }

    if (!eventForm.address || !eventForm.location) {
      alert('Please provide event address and location');
      return;
    }

    if (eventForm.tickets.length === 0) {
      alert('Please add at least one ticket type');
      return;
    }

    setIsCreating(true);

    try {
      const result = await createEvent();

      if (result.success) {
        alert(`Event created successfully! Event ID: ${result.eventId}`);
        resetForm();
        router.push('/');
      } else {
        alert(`Failed to create event: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert('An error occurred while creating the event');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500/15 via-purple-900/30 to-black relative overflow-hidden">
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

      <motion.div
        className="flex flex-col min-h-screen px-6 max-w-6xl mx-auto relative z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="flex flex-col items-center justify-center py-30 gap-4 relative z-10"
        >
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text relative">
            Create New Event
            {/* Neon glow effect */}
            <div className="absolute inset-0 text-pink-500 blur-sm opacity-40">
              Create New Event
            </div>
          </h1>
          <div className="text-cyan-300 text-xl font-light tracking-wide relative">
            Bring your vision to life and create unforgettable experiences
            {/* Subtle glow effect for description */}
            <div className="absolute inset-0 text-purple-500/30 blur-sm">
              Bring your vision to life and create unforgettable experiences
            </div>
          </div>
        </motion.div>

            <motion.div variants={item}>
              <EventDetails />
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
          <EventImages />
        </motion.div>

        <motion.div variants={item}>
          <EventOrganizer />
        </motion.div>

        <motion.div variants={item}>
          <AddRrpp />
        </motion.div>

        {/* Botón para generar datos aleatorios (testing) */}
        <motion.div
          variants={item}
          className="flex items-center justify-center w-full py-4 relative z-10"
        >
          <button
            onClick={handleFillRandomData}
            type="button"
            className="cursor-pointer flex gap-2 items-center text-sm bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm border border-cyan-500/20 hover:from-cyan-500/50 hover:via-blue-500/50 hover:to-purple-500/50 hover:border-blue-400 relative overflow-hidden"
          >
            <span className="relative z-10">🎲 Generate Random Event Data (Testing)</span>
          </button>
        </motion.div>

        <motion.div
          variants={item}
          className="flex items-center justify-center w-full py-10 relative z-10"
          whileHover={{
            scale: isCreating ? 1 : 1.02,
            y: isCreating ? 0 : -4,
            transition: {
              duration: 0.3,
              type: 'spring',
              stiffness: 200,
            },
          }}
        >
          <button
            onClick={handleCreateEvent}
            disabled={isCreating}
            className={`cursor-pointer flex gap-2 items-center text-xl bg-gradient-to-r from-pink-500/40 via-purple-500/40 to-cyan-400/40 text-white font-bold px-16 py-5 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-pink-500/20 hover:from-pink-500/60 hover:via-purple-500/60 hover:to-cyan-400/60 hover:border-cyan-400 relative overflow-hidden ${
              isCreating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FloppyDisk
              size={32}
              className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
            />
            <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
              {isCreating ? 'Creating Event...' : 'Create Event'}
            </span>
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-400/10 blur-xl opacity-30"></div>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
