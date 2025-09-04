'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardProps } from './components/Card';
import { CarrouselImage } from './components/CarrouselImage';
import { JoinNow } from './components/JoinNow';
import { SearchBar } from './components/SearchBar';
import { CardCarousel } from './components/CardCarousel';
import { type DateRange } from 'react-day-picker';

const CardData: CardProps[] = [
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'Montevideo',
    date: '15/06/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Music',
    time: '21:00',
    location: 'Montevideo',
    description: 'Un show imperdible con Eddy M',
    price: '$50',
    artists: ['Eddy M'],
    attendees: 200,
  },
  {
    title: 'ArtLab presents DJ Luna',
    address: 'Canelones',
    date: '20/07/2025',
    imageUrl: '/assets/show2.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Electronic',
    time: '22:00',
    location: 'Canelones',
    description: 'Una noche llena de beats y energía',
    price: '$45',
    artists: ['DJ Luna'],
    attendees: 150,
  },
  {
    title: 'Rock & Roll Night',
    address: 'Maldonado',
    date: '05/08/2025',
    imageUrl: '/assets/show3.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Rock',
    time: '20:30',
    location: 'Maldonado',
    description: 'Los clásicos del rock en vivo',
    price: '$60',
    artists: ['The Rockers'],
    attendees: 300,
  },
  {
    title: 'Jazz Evening',
    address: 'Rocha',
    date: '12/09/2025',
    imageUrl: '/assets/show4.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Jazz',
    time: '19:00',
    location: 'Rocha',
    description: 'Un ambiente relajado con jazz en vivo',
    price: '$40',
    artists: ['Smooth Jazz Band'],
    attendees: 120,
  },
  {
    title: 'Pop Festival',
    address: 'Paysandú',
    date: '25/10/2025',
    imageUrl: '/assets/show5.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Pop',
    time: '18:00',
    location: 'Paysandú',
    description: 'Los hits del pop internacional',
    price: '$55',
    artists: ['Pop Stars'],
    attendees: 400,
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia ',
    address: 'Colonia',
    date: '12/11/2025',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Music',
    time: '21:00',
    location: 'Colonia',
    description: 'Una gira inolvidable con Key',
    price: '$70',
    artists: ['Key'],
    attendees: 500,
  },
  {
    title: 'Latin Night',
    address: 'Salto',
    date: '15/11/2025',
    imageUrl: '/assets/show2.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Latin',
    time: '22:00',
    location: 'Salto',
    description: 'Salsa, bachata y más',
    price: '$50',
    artists: ['Latin Band'],
    attendees: 250,
  },
  {
    title: 'Electronic Sunrise',
    address: 'Soriano',
    date: '20/12/2025',
    imageUrl: '/assets/show3.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Electronic',
    time: '23:00',
    location: 'Soriano',
    description: 'Música electrónica hasta el amanecer',
    price: '$60',
    artists: ['DJ Aurora'],
    attendees: 350,
  },
  {
    title: 'Winter Beats',
    address: 'Rivera',
    date: '30/01/2026',
    imageUrl: '/assets/show4.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
    category: 'Electronic',
    time: '21:30',
    location: 'Rivera',
    description: 'Electrónica y buen ambiente',
    price: '$55',
    artists: ['DJ Winter'],
    attendees: 300,
  },
];

const HomePage = () => {
  const [filteredCards, setFilteredCards] = useState(CardData);
  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: undefined as DateRange | undefined,
    location: '',
  });

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
    const lowerSearch = searchTerm.toLowerCase();

    setFilteredCards(
      CardData.filter(card => {
        const searchMatch =
          lowerSearch === '' ||
          card.title?.toLowerCase().includes(lowerSearch) ||
          card.address?.toLowerCase().includes(lowerSearch) ||
          card.date?.toLowerCase().includes(lowerSearch);
        const locationMatch = !location || card.address === location;

        let dateMatch = true;
        if (dateRange?.from && card.date) {
          const [d, m, y] = card.date.split('/');
          const cardDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          const toDate = dateRange.to ? new Date(dateRange.to) : fromDate;
          toDate.setHours(23, 59, 59, 999);
          dateMatch = cardDate >= fromDate && cardDate <= toDate;
        }

        return searchMatch && locationMatch && dateMatch;
      })
    );
  }, [filters]);

  return (
    <div className="flex flex-col w-full">
      <CarrouselImage events={CardData} interval={5000} />

      <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 my-10 relative">
        <div className="flex flex-col w-full max-w-[1400px] gap-12">
          <div className="h-[72px]">
            <SearchBar onFilterChange={handleFilterChange} />
          </div>

          <div className="w-full">
            <CardCarousel
              cards={CardData}
              autoPlayInterval={5000}
              cardsToShow={4}
            />
          </div>

          <div className="w-full items-center justify-center flex flex-col">
            <h1 className="w-full text-3xl font-semibold text-white mb-8">
              All Events{' '}
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
