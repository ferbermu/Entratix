import React from 'react';
import dynamic from 'next/dynamic';

export interface EventLocationProps {
  address: string;
  location: string;
}

// Cargamos el mapa dinámicamente sin SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => (
    <div className="h-[300px] rounded-lg bg-[#4E4B4B]/40 animate-pulse" />
  ),
  ssr: false,
});

export const EventLocation = ({ address, location }: EventLocationProps) => {
  // Puedes usar location para geolocalizar el mapa en el futuro
  const center = {
    lat: -34.8878,
    lng: -56.1879,
  };

  return (
    <div className="flex flex-col rounded-lg w-full h-full gap-4  ">
      <MapComponent center={center} />

      <div className="flex flex-col  h-fit text-gray-300 text-2xl">
        {address}
      </div>
    </div>
  );
};
