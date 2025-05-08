"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import DashboardLayout from "../dashboards/layout";

export default function BinStatusPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
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

        <div data-aos="zoom-in" className="mt-6 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">Current Fill Level</h3>
          <p className="text-primary font-bold text-2xl mt-2">70%</p>
          <p className="text-gray-600 mt-1">Last emptied: 2 days ago</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
