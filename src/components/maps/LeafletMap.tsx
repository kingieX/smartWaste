// components/maps/LeafletMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Use custom marker icon from public folder
const customIcon = new L.Icon({
  iconUrl: "/icons/marker.png",
  //   shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const binLocations = [
  { id: 1, lat: 6.3245, lng: 8.1137, status: "Full" }, // Near Ebonyi State University (EBSU)
  { id: 2, lat: 6.3312, lng: 8.0996, status: "Half-Full" }, // Close to Abakaliki Rice Mill
  { id: 3, lat: 6.3189, lng: 8.1073, status: "Empty" }, // Around Abakpa Market
  { id: 4, lat: 6.325, lng: 8.115, status: "Full" }, // Near Abakaliki Main Market
  { id: 5, lat: 6.33, lng: 8.12, status: "Half-Full" }, // Close to Ebonyi State University Teaching Hospital
  { id: 6, lat: 6.34, lng: 8.13, status: "Full" }, // Near Abakaliki Central Park
  { id: 7, lat: 6.35, lng: 8.14, status: "Empty" }, // Around Abakaliki Shopping Mall
];

export default function LeafletMap() {
  return (
    <div className="h-[250px] w-full rounded overflow-hidden">
      <MapContainer
        center={[6.3245, 8.1137]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://osm.org/copyright'>OpenStreetMap</a> contributors"
        />
        {binLocations.map((bin) => (
          <Marker key={bin.id} position={[bin.lat, bin.lng]} icon={customIcon}>
            <Popup>
              <strong>Bin #{bin.id}</strong>
              <br />
              Status: {bin.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
