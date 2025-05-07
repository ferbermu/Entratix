import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  center: {
    lat: number;
    lng: number;
  };
}

const MapComponent = ({ center }: MapComponentProps) => {
  return (
    <div>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={15}
        style={{ height: '300px', borderRadius: '8px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[center.lat, center.lng]}>
          <Popup>Ubicación del evento</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
