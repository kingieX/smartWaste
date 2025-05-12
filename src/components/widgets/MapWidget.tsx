"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapWidget() {
  const center: [number, number] = [6.3245, 8.1133]; // Example: Abakaliki coordinates

  const icon = new L.Icon({
    iconUrl: "/icons/green-marker.png",
    // shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // shadowSize: [41, 41],
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold text-secondary">Bin Location</h3>
      <div className="mt-4 h-96 rounded-lg overflow-hidden z-0">
        <MapContainer center={center} zoom={14} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={center} icon={icon}>
            <Popup>Example Bin Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
