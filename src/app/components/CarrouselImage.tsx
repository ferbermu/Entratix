'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CardProps } from './Card';
import {
  Calendar,
  Clock,
  MapPin,
  MusicNote,
  Users,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react';

interface CarrouselImageProps {
  events: CardProps[];
  interval?: number;
}

export const CarrouselImage: React.FC<CarrouselImageProps> = ({
  events,
  interval = 5000,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearExistingTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const goToSlide = (newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + events.length) % events.length);
  };

  const nextSlide = () => goToSlide(index + 1, 1);
  const prevSlide = () => goToSlide(index - 1, -1);

  useEffect(() => {
    clearExistingTimeout();
    timeoutRef.current = setTimeout(() => nextSlide(), interval);
    return () => clearExistingTimeout();
  }, [index, interval]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeInOut' as const },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.8, ease: 'easeInOut' as const },
    }),
  };

  const currentEvent = events[index];

  return (
    <div className="relative w-full h-[730px] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <Image
            src={currentEvent.imageUrl}
            alt={currentEvent.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent flex items-center">
            <div className="max-w-2xl px-24 text-white space-y-6">
              <span className="uppercase text-sm tracking-wider text-[#3BAFBB] flex items-center gap-2">
                <MusicNote size={18} /> {currentEvent.category || 'Experience'}
              </span>
              <h2 className="text-5xl font-bold leading-tight">
                {currentEvent.title}
              </h2>
              <div className="flex flex-wrap gap-3 text-sm">
                {currentEvent.date && (
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <Calendar size={16} /> {currentEvent.date}
                  </div>
                )}
                {currentEvent.time && (
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <Clock size={16} /> {currentEvent.time}
                  </div>
                )}
                {currentEvent.location && (
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <MapPin size={16} /> {currentEvent.location}
                  </div>
                )}
              </div>
              {currentEvent.description && (
                <p className="text-gray-200">{currentEvent.description}</p>
              )}
              <div className="flex items-center gap-6">
                <button className="cursor-pointer bg-gradient-to-l from-[#3BAFBB] to-[#3BAFBB]/60 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                  Get Tickets from {currentEvent.price || '$35'}
                </button>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-1">
                    <MusicNote size={16} /> {currentEvent.artists?.length || 3}{' '}
                    Artists
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {currentEvent.attendees || '500+'} Going
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="cursor-pointer absolute top-1/2 left-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white transition"
      >
        <CaretLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="cursor-pointer absolute top-1/2 right-6 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white transition"
      >
        <CaretRight size={28} />
      </button>
    </div>
  );
};
