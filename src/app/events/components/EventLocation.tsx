import React from 'react';
import dynamic from 'next/dynamic';

const center = {
  lat: -34.8878,
  lng: -56.1879,
};

// Cargamos el mapa dinámicamente sin SSR
const MapComponent = dynamic(() => import('./MapComponent'), {
  loading: () => (
    <div className="h-[300px] rounded-lg bg-gradient-to-br from-gray-900/40 via-black/30 to-gray-800/40 backdrop-blur-sm animate-pulse border border-gray-600/30 shadow-xl" />
  ),
  ssr: false,
});

export const EventLocation = () => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-900/60 via-black/50 to-gray-800/60 backdrop-blur-md border border-gray-600/40 rounded-lg w-full h-full gap-4 p-4 shadow-2xl hover:shadow-[0_0_20px_rgba(255,20,147,0.15)] transition-all duration-300">
      <MapComponent center={center} />

      <div className="flex flex-col h-fit text-cyan-300 text-lg font-condensed drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">
        Rambla República de Chile 4321, Ciudad de la Costa, Canelones, Uruguay
      </div>
    </div>
  );
};
