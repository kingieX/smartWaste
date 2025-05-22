"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define the custom bin icon
const icon = new L.Icon({
  iconUrl: "/icons/green-marker.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Type for API response
type BinData = {
  latitude: string;
  longitude: string;
  sensor_data_id: string;
};

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export default function MapView() {
  const [position, setPosition] = useState<[number, number]>([6.3245, 8.1133]);
  const [binId, setBinId] = useState<string>("");

  // Fetch bin data and update marker position
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(
          "https://smartwastbin.onrender.com/iot/sensordata/latest"
        );
        const data: BinData = await response.json();
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          setPosition([lat, lng]);
          setBinId(data.sensor_data_id);
        }
      } catch (error) {
        console.error("Failed to fetch bin location:", error);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000); // update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={position} zoom={12} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position} icon={icon}>
        <Popup>Bin ID: {binId}</Popup>
      </Marker>
      <RecenterMap lat={position[0]} lng={position[1]} />
    </MapContainer>
  );
}
