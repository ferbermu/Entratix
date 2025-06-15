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
const CardData: CardProps[] = [
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'Montevideo',
    date: '15/06/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'Canelones',
    date: '17/07/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'Maldonado',
    date: '08/08/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'Rocha',
    date: '10/09/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'Paysandú',
    date: '25/10/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'Colonia',
    date: '12/11/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'Salto',
    date: '15/11/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'Soriano',
    date: '20/12/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'Rivera',
    date: '30/01/2026',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
];

const HomePage = () => {
  const [filteredCards, setFilteredCards] = useState(CardData);
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });

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

    const filtered = CardData.filter(card => {
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
  }, [filters]);

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
              cards={CardData}
              autoPlayInterval={5000}
              cardsToShow={4}
            />
          </div>
          <div className="w-full items-center justify-center flex flex-col">
            <h1 className="w-full text-3xl font-semibold text-white mb-8">
              All Events
              {filteredCards.length > 0 ? `(${filteredCards.length})` : ''}
            </h1>

            <div className="min-h-[900px] grid grid-cols-4 max-[1400px]:grid-cols-3 max-[1075px]:grid-cols-2 max-[700px]:grid-cols-1 w-fit items-start justify-center gap-8">
              {filteredCards.length > 0 ? (
                filteredCards.map((item, key) => (
                  <Card
                    key={key}
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
          </div>
        </div>
      </div>
      <JoinNow />
    </div>
  );
};

export default HomePage;
