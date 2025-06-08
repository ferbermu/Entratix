'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardProps } from './Card';
import Image from 'next/image';

interface CardCarouselProps {
  cards: CardProps[];
  autoPlayInterval?: number;
  cardsToShow?: number;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  autoPlayInterval = 3000,
  cardsToShow = 4,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      const maxIndex = cards.length - cardsToShow;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = prevIndex - 1;
      const maxIndex = cards.length - cardsToShow;
      return nextIndex < 0 ? maxIndex : nextIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [cards.length, autoPlayInterval, cardsToShow]);

  return (
    <div className="relative w-full ">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-semibold text-white">Featured Events</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="cursor-pointer p-2 rounded-lg border-2 border-[#4F4F4F] bg-[#1C1A1A] hover:bg-[#3BAFBB] transition-colors"
            aria-label="Previous slide"
          >
            <Image
              src="/assets/icons/featured_events/arrow_back.svg"
              alt="Previous"
              width={24}
              height={24}
            />
          </button>
          <button
            onClick={nextSlide}
            className="cursor-pointer p-2 rounded-lg border-2 border-[#4F4F4F] bg-[#1C1A1A] hover:bg-[#3BAFBB] transition-colors"
            aria-label="Next slide"
          >
            <Image
              src="/assets/icons/featured_events/arrow_forward.svg"
              alt="Next"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden ">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
        >
          {cards.map((item, key) => (
            <div
              key={key}
              className="flex-shrink-0 rounded-2xl border-2 border-[#4E4B4B] hover:border-[#3BAFBB] transition-colors overflow-hidden "
              style={{
                width: '340px',
                marginRight: '16px',
              }}
            >
              <Card {...item} isCarousel={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
