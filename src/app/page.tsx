'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardProps } from './components/Card';
import { CarrouselImage } from './components/CarrouselImage';
import { JoinNow } from './components/JoinNow';
import { SearchBar } from './components/SearchBar';
import { CardCarousel } from './components/CardCarousel';
import { type DateRange } from 'react-day-picker';

const imageURLsFromDataBase: string[] = [
  '/assets/show1.jpg',
  '/assets/show2.jpg',
  '/assets/show3.jpg',
  '/assets/show4.jpg',
];

interface Event {
  id: number;
  title: string;
  address: string;
  date: string;
  imageUrl: string[];
}

const HomePage = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Event[] = await response.json();
        setAllEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const { searchTerm, dateRange, location } = filters;
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    const filtered = allEvents.filter(event => {
      const formattedDate = formatDate(event.date);
      const searchTermMatch =
        lowercasedSearchTerm === ''
          ? true
          : event.title.toLowerCase().includes(lowercasedSearchTerm) ||
            event.address.toLowerCase().includes(lowercasedSearchTerm) ||
            formattedDate.toLowerCase().includes(lowercasedSearchTerm);

      const locationMatch = location === '' ? true : event.address === location;

      let dateMatch = true;
      if (dateRange?.from) {
        const cardDate = new Date(event.date);

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
            dateMatch =
              cardDate.getFullYear() === fromDate.getFullYear() &&
              cardDate.getMonth() === fromDate.getMonth() &&
              cardDate.getDate() === fromDate.getDate();
          }
        }
      }

      return searchTermMatch && locationMatch && dateMatch;
    });

    setFilteredEvents(filtered);
  }, [filters, allEvents]);

  const cardCarouselProps = allEvents.map(event => ({
    id: event.id,
    title: event.title,
    address: event.address,
    date: formatDate(event.date),
    imageUrl: event.imageUrl[0],
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  }));

  return (
    <div className="flex flex-col w-full bg-[#1C1A1A]">
      <div className="w-full">
        <CarrouselImage imageURLs={imageURLsFromDataBase} />
      </div>

      <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 my-10 relative">
        <div className="flex flex-col w-full max-w-[1400px] gap-12">
          <div className="h-[72px]">
            <SearchBar onFilterChange={handleFilterChange} />
          </div>

          <div className="w-full ">
            <CardCarousel
              cards={cardCarouselProps}
              autoPlayInterval={5000}
              cardsToShow={4}
            />
          </div>
          <div className="w-full items-center justify-center flex flex-col">
            <h1 className="w-full text-3xl font-semibold text-white mb-8">
              All Events
              {filteredEvents.length > 0 ? `(${filteredEvents.length})` : ''}
            </h1>

            <div className="min-h-[900px] grid grid-cols-4 max-[1400px]:grid-cols-3 max-[1075px]:grid-cols-2 max-[700px]:grid-cols-1 w-fit items-start justify-center gap-8">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(item => (
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    addressIcon={'/assets/icons/cards/location.svg'}
                    dateIcon={'/assets/icons/cards/calendar_month.svg'}
                    address={item.address}
                    date={formatDate(item.date)}
                    imageUrl={item.imageUrl[0]}
                  />
                ))
              ) : (
                <div className="text-gray-400 col-span-4 flex items-center justify-center h-full">
                  No se encontraron eventos que coincidan con tu búsqueda
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <JoinNow />
    </div>
  );
};

export default HomePage;
