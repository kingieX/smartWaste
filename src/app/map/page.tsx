"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import DashboardLayout from "../dashboard/layout";

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
          className="mt-6 h-60 bg-gray-300 flex items-center justify-center rounded-lg"
        >
          <p className="text-gray-600">[Map Placeholder]</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
