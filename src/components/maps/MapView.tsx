// components/MapView.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const center: [number, number] = [6.3245, 8.1133];

const icon = new L.Icon({
  iconUrl: "/icons/green-marker.png",
  shadowUrl: "/icons/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapView() {
  return (
    <MapContainer center={center} zoom={14} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={center} icon={icon}>
        <Popup>Example Bin Location</Popup>
      </Marker>
    </MapContainer>
  );
}
