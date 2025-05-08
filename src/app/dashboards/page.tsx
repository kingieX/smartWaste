"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import BinStatus from "@/components/widgets/BinStatus";
import MapWidget from "@/components/widgets/MapWidget";
import RecentActivity from "@/components/widgets/RecentActivity";
import Alerts from "@/components/widgets/Alerts";

export default function DashboardPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="p-6 bg-gray-100">
      <h2 data-aos="fade-up" className="text-3xl font-semibold text-primary">
        Welcome to Your Dashboard
      </h2>
      <p data-aos="fade-up" className="text-gray-600 mt-2">
        Monitor your waste bin status, track locations, and manage settings.
      </p>

      {/* Other Widgets (3-Column Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div data-aos="fade-right">
          <BinStatus />
        </div>
        <div data-aos="zoom-in">
          <RecentActivity />
        </div>
        <div data-aos="flip-up">
          <Alerts />
        </div>
      </div>

      {/* Map Widget (Full Width) */}
      <div data-aos="fade-left" className="mt-6">
        <MapWidget />
      </div>
    </main>
  );
}
