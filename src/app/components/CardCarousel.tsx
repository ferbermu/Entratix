'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardProps } from './Card';
import Image from 'next/image';
import { useWindowWidth, getCardsToShow } from '../hooks/useWindowWidth';

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
  const windowWidth = useWindowWidth();

  // Calcular el número de cards responsive
  const responsiveCardsToShow = getCardsToShow(windowWidth, cardsToShow);

  // Constantes para el cálculo del layout
  const CARD_WIDTH = 340;
  const CARD_GAP = 16;
  const CONTAINER_WIDTH =
    CARD_WIDTH * responsiveCardsToShow + CARD_GAP * (responsiveCardsToShow - 1);

  // Memoizar las funciones de navegación para evitar recreaciones innecesarias
  const nextSlide = useCallback(() => {
    setCurrentIndex(prevIndex => {
      const maxIndex = cards.length - responsiveCardsToShow;
      const nextIndex = prevIndex + 1;
      return nextIndex > maxIndex ? 0 : nextIndex;
    });
  }, [cards.length, responsiveCardsToShow]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prevIndex => {
      const maxIndex = cards.length - responsiveCardsToShow;
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? maxIndex : nextIndex;
    });
  }, [cards.length, responsiveCardsToShow]);

  // Resetear el índice si cambia el número de cartas para evitar índices inválidos
  useEffect(() => {
    setCurrentIndex(prevIndex => {
      const maxIndex = Math.max(0, cards.length - responsiveCardsToShow);
      return prevIndex > maxIndex ? 0 : prevIndex;
    });
  }, [cards.length, responsiveCardsToShow]);

  // Effect para el autoplay - solo depende del intervalo y la función nextSlide
  useEffect(() => {
    if (autoPlayInterval <= 0) return; // No iniciar autoplay si el intervalo es 0 o negativo

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval]);

  // Calcular el desplazamiento en píxeles
  const translateX = currentIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex justify-between items-center mb-6 w-full max-w-[1400px]">
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

      <div
        className="relative overflow-hidden"
        style={{ width: `${CONTAINER_WIDTH}px` }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${translateX}px)`,
            gap: `${CARD_GAP}px`,
          }}
        >
          {cards.map((item, key) => (
            <div
              key={key}
              className="bg-[#1C1A1A] flex-shrink-0 rounded-2xl border-2 border-[#4E4B4B] hover:border-[#3BAFBB] transition-colors overflow-hidden"
              style={{
                width: `${CARD_WIDTH}px`,
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
