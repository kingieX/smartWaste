"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const iconColors = {
  Full: "/icons/red-marker.png",
  "Half-Full": "/icons/yellow-marker.png",
  Empty: "/icons/green-marker.png",
};

function getIcon(status: string) {
  return new L.Icon({
    iconUrl: iconColors[status as keyof typeof iconColors] || iconColors.Empty,
    shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

export default function TrackingMap({
  bins,
}: {
  bins: {
    id: string;
    lat: number;
    lng: number;
    status: string;
    location: string;
    lastUpdated: string;
  }[];
}) {
  return (
    <MapContainer center={[6.319, 8.1]} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {bins.map((bin) => (
        <Marker
          key={bin.id}
          position={[bin.lat, bin.lng]}
          icon={getIcon(bin.status)}
        >
          <Popup>
            <strong>{bin.id}</strong>
            <br />
            Location: {bin.location}
            <br />
            Status: {bin.status}
            <br />
            Last Updated: {bin.lastUpdated}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
