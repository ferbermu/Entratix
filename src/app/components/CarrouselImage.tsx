'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
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

  const goToSlide = useCallback(
    (newIndex: number, dir: number) => {
      setDirection(dir);
      setIndex((newIndex + events.length) % events.length);
    },
    [events.length]
  );

  const nextSlide = useCallback(
    () => goToSlide(index + 1, 1),
    [index, goToSlide]
  );
  const prevSlide = useCallback(
    () => goToSlide(index - 1, -1),
    [index, goToSlide]
  );

  useEffect(() => {
    clearExistingTimeout();
    timeoutRef.current = setTimeout(() => nextSlide(), interval);
    return () => clearExistingTimeout();
  }, [nextSlide, interval]);

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
            <div className="max-w-2xl px-24 text-white space-y-6 relative z-10">
              <span className="uppercase text-sm tracking-wider text-cyan-300 flex items-center gap-2 font-semibold drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]">
                <MusicNote
                  size={18}
                  className="drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                />{' '}
                {currentEvent.category || 'Experience'}
              </span>
              <h2 className="text-5xl font-bold leading-tight text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text relative">
                {currentEvent.title}
                {/* Subtle neon glow for better readability */}
                <div className="absolute inset-0 text-pink-400 blur-[1px] opacity-30">
                  {currentEvent.title}
                </div>
                <div className="absolute inset-0 text-cyan-400 blur-[2px] opacity-20">
                  {currentEvent.title}
                </div>
              </h2>
              <div className="flex flex-wrap gap-3 text-sm">
                {currentEvent.date && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-400/20 px-3 py-1 rounded-full border border-pink-500/40 backdrop-blur-sm">
                    <Calendar
                      size={16}
                      className="text-pink-300 drop-shadow-[0_0_6px_rgba(255,20,147,0.6)]"
                    />
                    <span className="text-pink-200 font-medium">
                      {currentEvent.date}
                    </span>
                  </div>
                )}
                {currentEvent.time && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 px-3 py-1 rounded-full border border-purple-500/40 backdrop-blur-sm">
                    <Clock
                      size={16}
                      className="text-purple-300 drop-shadow-[0_0_6px_rgba(128,0,255,0.6)]"
                    />
                    <span className="text-purple-200 font-medium">
                      {currentEvent.time}
                    </span>
                  </div>
                )}
                {currentEvent.location && (
                  <div className="flex items-center gap-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 px-3 py-1 rounded-full border border-cyan-500/40 backdrop-blur-sm">
                    <MapPin
                      size={16}
                      className="text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
                    />
                    <span className="text-cyan-200 font-medium">
                      {currentEvent.location}
                    </span>
                  </div>
                )}
              </div>
              {currentEvent.description && (
                <p className="text-gray-200 font-light leading-relaxed">
                  {currentEvent.description}
                </p>
              )}
              <div className="flex items-center gap-6">
                <button className="cursor-pointer bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,20,147,0.6)] border border-pink-500/50 hover:border-cyan-400">
                  Get Tickets from {currentEvent.price || '$35'}
                </button>
                <div className="flex items-center gap-4 text-sm text-cyan-200">
                  <span className="flex items-center gap-1 font-medium">
                    <MusicNote
                      size={16}
                      className="text-pink-300 drop-shadow-[0_0_6px_rgba(255,20,147,0.6)]"
                    />{' '}
                    {currentEvent.artists?.length || 3} Artists
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users
                      size={16}
                      className="text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]"
                    />{' '}
                    {currentEvent.attendees || '500+'} Going
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="cursor-pointer absolute top-1/2 left-6 -translate-y-1/2 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-black/60 hover:from-pink-500/50 hover:via-purple-500/50 hover:to-cyan-400/50 p-3 rounded-full text-white transition-all duration-300 border border-pink-500/50 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(255,20,147,0.6)] backdrop-blur-sm z-20"
        type="button"
      >
        <CaretLeft
          size={28}
          className="drop-shadow-[0_0_8px_rgba(255,20,147,0.8)]"
        />
      </button>
      <button
        onClick={nextSlide}
        className="cursor-pointer absolute top-1/2 right-6 -translate-y-1/2 bg-gradient-to-r from-black/60 via-purple-500/30 to-cyan-400/30 hover:from-cyan-400/50 hover:via-purple-500/50 hover:to-pink-500/50 p-3 rounded-full text-white transition-all duration-300 border border-cyan-400/50 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] backdrop-blur-sm z-20"
        type="button"
      >
        <CaretRight
          size={28}
          className="drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
        />
      </button>
    </div>
  );
};
