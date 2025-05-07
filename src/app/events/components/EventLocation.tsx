import React from 'react';
import dynamic from 'next/dynamic';

const center = {
  lat: -34.8878,
  lng: -56.1879,
};

// Cargamos el mapa dinámicamente sin SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => (
    <div className="h-[300px] rounded-lg bg-[#4E4B4B]/40 animate-pulse" />
  ),
  ssr: false,
});

export const EventLocation = () => {
  return (
    <div className="flex flex-col rounded-lg p-6 gap-4">
      <MapComponent center={center} />

      <div className="flex flex-col gap-2">
        <p className="text-gray-300">
          Rambla República de Chile 4321,
          <br />
          Ciudad de la Costa, Canelones,
          <br />
          Uruguay
        </p>
      </div>
    </div>
  );
};
