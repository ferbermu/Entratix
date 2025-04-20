import React from 'react';
import { Card, CardProps } from './Card';
import Image from 'next/image';

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
  return (
    <div className="container mx-auto">
      <h1 className="text-xl mt-8 ml-[100px]"> All Events </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 px-[100px] py-8 ">
        {CardData.map((item, key) => (
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
    </div>
  );
};
export default HomePage;
