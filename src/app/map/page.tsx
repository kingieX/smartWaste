"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import DashboardLayout from "../dashboards/layout";

const MapView = dynamic(() => import("@/components/maps/MapView"), {
  ssr: false,
});

export default function MapPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

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
          <MapView />
        </div>
      </div>
    </DashboardLayout>
  );
}
