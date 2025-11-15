'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardProps } from './components/Card';
import { CarrouselImage } from './components/CarrouselImage';
import { JoinNow } from './components/JoinNow';
import { SearchBar } from './components/SearchBar';
import { CardCarousel } from './components/CardCarousel';
import { type DateRange } from 'react-day-picker';
import { getEventsAction, getFeaturedEventsAction, getCarouselEventsAction, getNonFeaturedEventsAction } from './actions/events';

const imageURLsFromDataBase: string[] = [
  '/assets/show1.jpg',
  '/assets/show2.jpg',
  '/assets/show3.jpg',
  '/assets/show4.jpg',
];

const HomePage = () => {
  const [cardData, setCardData] = useState<CardProps[]>([]); // All events for "All Events" section
  const [nonFeaturedCards, setNonFeaturedCards] = useState<CardProps[]>([]); // Non-featured for carousel
  const [featuredCards, setFeaturedCards] = useState<CardProps[]>([]);
  const [carouselImages, setCarouselImages] = useState<string[]>([]); // Inicializar vacío, se llenará con datos de la DB
  const [filteredCards, setFilteredCards] = useState<CardProps[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch events from database on mount
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Fetch all events for "All Events" section
        const events = await getEventsAction();
        const formattedEvents: CardProps[] = events.map(event => ({
          id: event.id,
          title: event.title,
          address: event.location,
          date: new Date(event.date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          imageUrl: event.cardImageUrl || '/assets/show1.jpg',
          dateIcon: '/assets/icons/cards/calendar_month.svg',
          addressIcon: '/assets/icons/cards/location.svg',
        }));
        setCardData(formattedEvents);
        setFilteredCards(formattedEvents);

        // Fetch non-featured events for carousel
        const nonFeatured = await getNonFeaturedEventsAction();
        const formattedNonFeatured: CardProps[] = nonFeatured.map(event => ({
          id: event.id,
          title: event.title,
          address: event.location,
          date: new Date(event.date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          imageUrl: event.cardImageUrl || '/assets/show1.jpg',
          dateIcon: '/assets/icons/cards/calendar_month.svg',
          addressIcon: '/assets/icons/cards/location.svg',
        }));
        setNonFeaturedCards(formattedNonFeatured);

        // Fetch featured events
        const featured = await getFeaturedEventsAction();
        const formattedFeatured: CardProps[] = featured.map(event => ({
          id: event.id,
          title: event.title,
          address: event.location,
          date: new Date(event.date).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          imageUrl: event.cardImageUrl || '/assets/show1.jpg',
          dateIcon: '/assets/icons/cards/calendar_month.svg',
          addressIcon: '/assets/icons/cards/location.svg',
        }));
        setFeaturedCards(formattedFeatured);

        // Fetch carousel events
        const carousel = await getCarouselEventsAction();
        
        if (carousel.length > 0) {
          const carouselUrls = carousel
            .filter(event => event.carouselImageUrl)
            .map(event => event.carouselImageUrl!);
          
          if (carouselUrls.length > 0) {
            setCarouselImages(carouselUrls);
          } else {
            // Fallback a imágenes estáticas si no hay URLs de carrusel
            setCarouselImages(imageURLsFromDataBase);
          }
        } else {
          // Fallback a imágenes estáticas si no hay eventos de carrusel
          setCarouselImages(imageURLsFromDataBase);
        }
      } catch (error) {
        console.error('Error loading events:', error);
        setCardData([]);
        setFilteredCards([]);
        setFeaturedCards([]);
        setNonFeaturedCards([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleMobileSearch = (event: CustomEvent<string>) => {
      setFilters(prevFilters => ({ ...prevFilters, searchTerm: event.detail }));
    };

    window.addEventListener('search', handleMobileSearch as EventListener);
    return () => {
      window.removeEventListener('search', handleMobileSearch as EventListener);
    };
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: {
      searchTerm: string;
      dateRange?: DateRange;
      location: string;
    }) => {
      setFilters({ ...newFilters, dateRange: newFilters.dateRange });
    },
    []
  );

  useEffect(() => {
    const { searchTerm, dateRange, location } = filters;
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const filtered = cardData.filter(card => {
      const searchTermMatch =
        lowercasedSearchTerm === ''
          ? true
          : card.title.toLowerCase().includes(lowercasedSearchTerm) ||
            card.address.toLowerCase().includes(lowercasedSearchTerm) ||
            card.date.toLowerCase().includes(lowercasedSearchTerm);

      const locationMatch = location === '' ? true : card.address === location;

      let dateMatch = true;
      if (dateRange?.from) {
        const dateParts = card.date.trim().split('/');
        const cardDate = new Date(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0])
        );

        if (isNaN(cardDate.getTime())) {
          dateMatch = false;
        } else {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);

          if (dateRange.to) {
            const toDate = new Date(dateRange.to);
            toDate.setHours(23, 59, 59, 999);
            dateMatch = cardDate >= fromDate && cardDate <= toDate;
          } else {
            dateMatch = cardDate.getTime() === fromDate.getTime();
          }
        }
      }

      return searchTermMatch && locationMatch && dateMatch;
    });

    setFilteredCards(filtered);
  }, [filters, cardData]);

  return (
    <div className="flex flex-col w-full bg-[#1C1A1A]">
      <div className="w-full">
        <CarrouselImage imageURLs={carouselImages} />
      </div>

      <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 my-10 relative">
        <div className="flex flex-col w-full max-w-[1400px] gap-12">
          <div className="h-[72px]">
            <SearchBar onFilterChange={handleFilterChange} />
          </div>

          {/* Featured Events Section */}
          {featuredCards.length > 0 && (
            <div className="w-full">
              <h2 className="text-3xl font-semibold text-white mb-6">Featured Events</h2>
              <CardCarousel
                cards={featuredCards}
                autoPlayInterval={5000}
                cardsToShow={4}
              />
            </div>
          )}
          
          <div className="w-full items-center justify-center flex flex-col">
            <h1 className="w-full text-3xl font-semibold text-white mb-8">
              All Events
              {filteredCards.length > 0 ? ` (${filteredCards.length})` : ''}
            </h1>

            {isLoading ? (
              <div className="min-h-[900px] flex items-center justify-center w-full">
                <div className="text-gray-400 text-lg">Cargando eventos...</div>
              </div>
            ) : (
              <div className="min-h-[900px] grid grid-cols-4 max-[1400px]:grid-cols-3 max-[1075px]:grid-cols-2 max-[700px]:grid-cols-1 w-fit items-start justify-center gap-8">
                {filteredCards.length > 0 ? (
                     filteredCards.map((item, key) => (
                       <Card
                         key={key}
                         id={item.id}
                         title={item.title}
                         addressIcon={item.addressIcon}
                         dateIcon={item.dateIcon}
                         address={item.address}
                         date={item.date}
                         imageUrl={item.imageUrl}
                       />
                     ))
                ) : (
                  <div className="text-gray-400 col-span-4 flex items-center justify-center h-full">
                    No se encontraron eventos que coincidan con tu búsqueda
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <JoinNow />
    </div>
  );
};

export default HomePage;
