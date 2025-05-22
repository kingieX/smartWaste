"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import DashboardLayout from "../dashboards/layout";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Load Leaflet dynamically (since it relies on window object)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
import L from "leaflet";

// Fix default icon issue with Leaflet in Next.js
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";
const DefaultIcon = L.icon({
  iconUrl:
    (iconUrl as unknown as { src: string }).src ||
    (iconUrl as unknown as string),
  shadowUrl:
    (iconShadowUrl as unknown as { src: string }).src ||
    (iconShadowUrl as unknown as string),
});
L.Marker.prototype.options.icon = DefaultIcon;

// Type for sensor data
type BinData = {
  sensor_data_id: string;
  distance: string;
  latitude: string;
  longitude: string;
  created_at: string;
  percent_fill: number;
};

export default function BinStatusPage() {
  const [binData, setBinData] = useState<BinData | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fetchBinData = async () => {
      try {
        const response = await fetch(
          "https://smartwastbin.onrender.com/iot/sensordata/latest"
        );
        const data: BinData = await response.json();
        setBinData(data);
      } catch (error) {
        console.error("Error fetching bin data:", error);
      }
    };

    fetchBinData();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 bg-white shadow-md rounded-2xl">
        <h2 data-aos="fade-up" className="text-3xl font-semibold text-primary">
          Waste Bin Status
        </h2>
        <p data-aos="fade-up" className="text-gray-600 mt-2">
          Monitor the current status of your waste bin.
        </p>

        {binData ? (
          <div
            data-aos="zoom-in"
            className="mt-6 p-6 bg-gray-100 rounded-lg space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold">Bin ID</h3>
              <p className="text-gray-800">{binData.sensor_data_id}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Current Fill Level</h3>
              <p className="text-primary font-bold text-2xl">
                {binData.percent_fill}%
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Distance</h3>
              <p className="text-gray-800">{binData.distance} cm</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Created At</h3>
              <p className="text-gray-800">
                {new Date(binData.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Location</h3>
              <p className="text-gray-800">
                Latitude: {binData.latitude}, Longitude: {binData.longitude}
              </p>

              {/* Map */}
              <div className="h-64 mt-4 rounded-lg overflow-hidden">
                <MapContainer
                  center={[
                    parseFloat(binData.latitude),
                    parseFloat(binData.longitude),
                  ]}
                  zoom={12}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[
                      parseFloat(binData.latitude),
                      parseFloat(binData.longitude),
                    ]}
                  />
                </MapContainer>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">Loading bin data...</p>
        )}
      </div>
    </DashboardLayout>
  );
}
