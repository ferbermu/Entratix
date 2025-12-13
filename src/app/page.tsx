'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardProps } from './components/Card';
import { CarrouselImage } from './components/CarrouselImage';
import { JoinNow } from './components/JoinNow';
import { SearchBar } from './components/SearchBar';
import { CardCarousel } from './components/CardCarousel';
import { type DateRange } from 'react-day-picker';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingSpinner } from './components/LoadingSpinner';

const formatDateDDMMYYYY = (d: Date | string | null | undefined): string => {
  if (!d) return '';
  const date = typeof d === 'string' ? new Date(d) : d;
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const defaultCarouselSlides: CardProps[] = [
  {
    title: 'Discover Underground Nights',
    address: 'Montevideo',
    date: '',
    time: '',
    imageUrl: '/assets/show1.jpg',
  },
  {
    title: 'Live Electronic Experience',
    address: 'Canelones',
    date: '',
    time: '',
    imageUrl: '/assets/show2.jpg',
  },
  {
    title: 'Warehouse Vibes',
    address: 'Maldonado',
    date: '',
    time: '',
    imageUrl: '/assets/show3.jpg',
  },
];

const HomePage = () => {
  const [cardsBase, setCardsBase] = useState<CardProps[]>([]);
  const [carouselCards, setCarouselCards] = useState<CardProps[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardProps[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const [nonFeaturedRes, carouselRes] = await Promise.all([
          fetch('/api/events?type=nonfeatured', { cache: 'no-store' }),
          fetch('/api/events?type=carousel', { cache: 'no-store' }),
        ]);
        const nonFeaturedJson = await nonFeaturedRes.json();
        const carouselJson = await carouselRes.json();
        let nonFeatured = nonFeaturedJson?.events || [];
        const carousel = carouselJson?.events || [];

        const mapToBaseCard = (e: any): CardProps => ({
          id: e.id,
          title: e.title,
          address: e.location || e.address || '',
          date: formatDateDDMMYYYY(e.date),
          time: e.startTime || '',
          imageUrl: e.cardImageUrl || '/assets/party.png',
        });

        const mapToCarouselCard = (e: any): CardProps => {
          const bannerFirst =
            Array.isArray(e.bannerImageUrls) && e.bannerImageUrls.length > 0
              ? e.bannerImageUrls[0]
              : undefined;
          const imageUrl =
            e.carouselImageUrl || bannerFirst || e.cardImageUrl || '/assets/party.png';
          return {
            id: e.id,
            title: e.title,
            address: e.location || e.address || '',
            date: formatDateDDMMYYYY(e.date),
            time: e.startTime || '',
            imageUrl,
          };
        };

        // Fallback: si no hay non-featured, traer todos los activos
        if (!Array.isArray(nonFeatured) || nonFeatured.length === 0) {
          const allRes = await fetch('/api/events', { cache: 'no-store' });
          const allJson = await allRes.json();
          nonFeatured = allJson?.events || [];
        }

        const base = Array.isArray(nonFeatured) ? nonFeatured.map(mapToBaseCard) : [];
        const carouselMapped = Array.isArray(carousel) ? carousel.map(mapToCarouselCard) : [];

        setCardsBase(base);
        setFilteredCards(base);
        setCarouselCards(carouselMapped.length > 0 ? carouselMapped : defaultCarouselSlides);
      } catch (err) {
        console.error('Error fetching events for homepage:', err);
        setCardsBase([]);
        setFilteredCards([]);
        setCarouselCards(defaultCarouselSlides);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: {
      searchTerm: string;
      dateRange?: DateRange;
      location: string;
    }) => {
      setFilters({ ...newFilters, dateRange: newFilters.dateRange });

      // Verificar si hay filtros activos
      const hasFilters =
        newFilters.searchTerm.trim() !== '' ||
        !!newFilters.dateRange?.from ||
        newFilters.location.trim() !== '';

      setHasActiveFilters(hasFilters);

      // Mostrar loading si hay filtros activos
      if (hasFilters) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const { searchTerm, dateRange, location } = filters;
    const lowerSearch = searchTerm.toLowerCase();

    // Verificar si hay filtros activos
    const hasFilters =
      searchTerm.trim() !== '' || !!dateRange?.from || location.trim() !== '';

    setHasActiveFilters(hasFilters);

    // Simular delay de búsqueda para mostrar el loading
    const searchDelay = setTimeout(() => {
      setFilteredCards(
        cardsBase.filter(card => {
          const searchMatch =
            lowerSearch === '' ||
            card.title?.toLowerCase().includes(lowerSearch) ||
            card.address?.toLowerCase().includes(lowerSearch) ||
            card.date?.toLowerCase().includes(lowerSearch);
          const locationMatch = !location || card.address === location;

          let dateMatch = true;
          if (dateRange?.from && card.date) {
            const [d, m, y] = card.date.split('/');
            const cardDate = new Date(
              parseInt(y),
              parseInt(m) - 1,
              parseInt(d)
            );
            const fromDate = new Date(dateRange.from);
            fromDate.setHours(0, 0, 0, 0);
            const toDate = dateRange.to ? new Date(dateRange.to) : fromDate;
            toDate.setHours(23, 59, 59, 999);
            dateMatch = cardDate >= fromDate && cardDate <= toDate;
          }

          return searchMatch && locationMatch && dateMatch;
        })
      );
      setIsLoading(false);
    }, 2000); // 2 segundos de delay para mostrar el loading

    return () => clearTimeout(searchDelay);
  }, [filters, cardsBase]);

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

      <div className="relative z-10">
        {carouselCards.length > 0 && (
          <CarrouselImage events={carouselCards} interval={5000} />
        )}

        <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 my-10 relative">
          <div className="flex flex-col w-full max-w-[1400px] gap-12">
            <div className="h-[72px]">
              <SearchBar onFilterChange={handleFilterChange} />
            </div>

            <AnimatePresence mode="wait">
              {!hasActiveFilters && (
                <motion.div
                  key="cardcarousel"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{
                    duration: 0.25,
                    ease: 'easeInOut',
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                  }}
                  className="w-full"
                  style={{ isolation: 'isolate' }}
                >
                  <CardCarousel
                    cards={cardsBase}
                    autoPlayInterval={5000}
                    cardsToShow={4}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="w-full items-center justify-center flex flex-col relative z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: hasActiveFilters ? 0.2 : 0 }}
              style={{ isolation: 'isolate' }}
            >
              <h1 className="w-full text-3xl font-condensed font-bold text-white mb-8 relative">
                All Events{' '}
                {filteredCards.length > 0 ? `(${filteredCards.length})` : ''}
                {/* Neon glow effect */}
                <div className="absolute inset-0 text-pink-500 blur-sm opacity-40">
                  All Events{' '}
                  {filteredCards.length > 0 ? `(${filteredCards.length})` : ''}
                </div>
              </h1>

              <div className="min-h-[900px] grid grid-cols-4 max-[1400px]:grid-cols-3 max-[1075px]:grid-cols-2 max-[700px]:grid-cols-1 w-fit items-start justify-center gap-8 relative z-20">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      className="col-span-4 flex items-center justify-center relative z-30"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      style={{ isolation: 'isolate' }}
                    >
                      <LoadingSpinner />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`filtered-${filters.searchTerm}-${
                        filters.location
                      }-${filters.dateRange?.from?.getTime() || 'no-date'}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeOut',
                        type: 'spring',
                        stiffness: 150,
                        damping: 20,
                      }}
                      className="contents"
                      style={{ isolation: 'isolate' }}
                    >
                      {filteredCards.length > 0 ? (
                        filteredCards.map((item, key) => (
                          <motion.div
                            key={`${item.title}-${key}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                              duration: 0.4,
                              ease: 'easeOut',
                              delay: key * 0.05,
                              type: 'spring',
                              stiffness: 150,
                              damping: 20,
                            }}
                          >
                            <Card
                              title={item.title}
                              address={item.address}
                              date={item.date}
                              time={item.time}
                              imageUrl={item.imageUrl}
                            />
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          key="no-results"
                          className="text-cyan-300 col-span-4 flex items-center justify-center h-full relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          style={{ isolation: 'isolate' }}
                        >
                          <span className="relative z-10 text-lg font-medium">
                            No se encontraron eventos que coincidan con tu
                            búsqueda
                          </span>
                          <div className="absolute inset-0 text-pink-500/30 blur-sm">
                            No se encontraron eventos que coincidan con tu
                            búsqueda
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        <JoinNow />
      </div>
    </div>
  );
};

export default HomePage;
