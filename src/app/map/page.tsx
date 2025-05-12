"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import DashboardLayout from "../dashboards/layout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const center: [number, number] = [6.3245, 8.1133]; // Abakaliki sample coordinate

  const icon = new L.Icon({
    iconUrl: "/icons/green-marker.png",
    // shadowUrl: "/icons/marker-shadow.png",
    iconSize: [25, 25],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    // shadowSize: [41, 41],
  });

  return (
    <DashboardLayout>
      <div className="p-6 bg-white shadow-md rounded-2xl">
        <h2 data-aos="fade-up" className="text-3xl font-semibold text-primary">
          Map View
        </h2>
        <p data-aos="fade-up" className="text-gray-600 mt-2">
          Locate your waste bin in real-time.
        </p>

        <div
          data-aos="zoom-in"
          className="mt-6 h-96 rounded-lg overflow-hidden z-0"
        >
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
    </DashboardLayout>
  );
}
