import React from 'react';
import { Card, CardProps } from './components/Card';

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
    <div className="flex flex-col justify-center items-center my-15 ">
      <div className=" flex flex-col w-fit gap-10  ">
        <h1 className="text-3xl font-semibold flex items-center ">
          All Events
        </h1>
        <div className=" grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-[36px] justify-items-center  ">
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
    </div>
  );
};
export default HomePage;
