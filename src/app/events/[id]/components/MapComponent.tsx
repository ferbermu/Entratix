'use client';
import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

interface MapComponentProps {
  center: { lat: number; lng: number };
}

const MapComponent = ({ center }: MapComponentProps) => (
  <MapContainer
    center={[center.lat, center.lng]}
    zoom={15}
    style={{
      padding: '0px',
      height: '350px',
      borderRadius: '8px',
      zIndex: 10,
    }}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={[center.lat, center.lng]}>
      <Popup>Ubicación del evento</Popup>
    </Marker>
  </MapContainer>
);

export default MapComponent;
