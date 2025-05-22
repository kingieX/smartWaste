"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import DashboardLayout from "../dashboards/layout";

// Define the TypeScript type for the bin data
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
            className="mt-6 p-6 bg-gray-100 rounded-lg space-y-4"
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
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-6">Loading bin data...</p>
        )}
      </div>
    </DashboardLayout>
  );
}
