'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardProps } from './components/Card';
import { CarrouselImage } from './components/CarrouselImage';
import { JoinNow } from './components/JoinNow';
import { SearchBar } from './components/SearchBar';
import { CardCarousel } from './components/CardCarousel';

const imageURLsFromDataBase: string[] = [
  '/assets/show1.jpg',
  '/assets/show2.jpg',
  '/assets/show3.jpg',
  '/assets/show4.jpg',
];
const CardData: CardProps[] = [
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'ArtLab presents Eddy M & more',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
  {
    title: 'Key on Tour - Plaza de Toros Colonia',
    address: 'ADDRESS GOES HERE',
    date: 'DATE HERE',
    imageUrl: '/assets/show1.jpg',
    dateIcon: '/assets/icons/cards/calendar_month.svg',
    addressIcon: '/assets/icons/cards/location.svg',
  },
];

export const HomePage = () => {
  const [filteredCards, setFilteredCards] = useState(CardData);

  useEffect(() => {
    const handleMobileSearch = (event: CustomEvent<string>) => {
      handleSearch(event.detail);
    };

    window.addEventListener('search', handleMobileSearch as EventListener);
    return () => {
      window.removeEventListener('search', handleMobileSearch as EventListener);
    };
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = CardData.filter(
      card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  };
  return (
    <div className="flex flex-col w-full bg-[#1C1A1A]">
      <div className="w-full">
        <CarrouselImage imageURLs={imageURLsFromDataBase} />
      </div>

      <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 my-10 relative">
        <div className="flex flex-col w-full max-w-[1400px] gap-12">
          <div className="h-[72px]">
            <SearchBar onSearch={handleSearch} />
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

            <div className=" min-h-[900px] grid grid-cols-4 max-[1400px]:grid-cols-3 max-[1075px]:grid-cols-2 max-[700px]:grid-cols-1 w-fit items-center justify-center gap-8">
              {filteredCards.map((item, key) => (
                <Card
                  key={key}
                  title={item.title}
                  addressIcon={item.addressIcon}
                  dateIcon={item.dateIcon}
                  address={item.address}
                  date={item.date}
                  imageUrl={item.imageUrl}
                />
              ))}
            </div>
            {filteredCards.length === 0 && (
              <div className="text-gray-400 absolute inset-0 flex items-center justify-center ">
                No se encontraron eventos que coincidan con tu búsqueda
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
