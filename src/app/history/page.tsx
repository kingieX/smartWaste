"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import DashboardLayout from "../dashboards/layout";

export default function HistoryPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 bg-white shadow-md rounded-2xl">
        <h2 data-aos="fade-up" className="text-3xl font-semibold text-primary">
          Waste Collection History
        </h2>
        <p data-aos="fade-up" className="text-gray-600 mt-2">
          Track past waste collection activities.
        </p>

        <div data-aos="zoom-in" className="mt-6 bg-gray-100 p-4 rounded-lg">
          <ul className="text-gray-600 space-y-3">
            <li>
              ✅ Waste collected -{" "}
              <span className="font-semibold">Feb 14, 2025</span>
            </li>
            <li>
              ⚠️ Bin almost full -{" "}
              <span className="font-semibold">Feb 13, 2025</span>
            </li>
            <li>
              ✅ Waste collected -{" "}
              <span className="font-semibold">Feb 10, 2025</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
