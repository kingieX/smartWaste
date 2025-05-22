"use client";

import { useEffect, useState } from "react";

// TypeScript type for the sensor data
type BinData = {
  percent_fill: number;
};

export default function Alerts() {
  const [alertMessage, setAlertMessage] = useState<string>("Loading alert...");
  const [alertColor, setAlertColor] = useState<string>("text-gray-500");

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await fetch(
          "https://smartwastbin.onrender.com/iot/sensordata/latest"
        );
        const data: BinData = await response.json();
        const fill = data.percent_fill;

        // Decide alert message and color based on percent_fill
        if (fill >= 90) {
          setAlertMessage("🔴 Critical: Bin is full! Empty it immediately.");
          setAlertColor("text-red-600");
        } else if (fill >= 80) {
          setAlertMessage(
            "🟠 Warning: Bin is almost full. Schedule pickup soon."
          );
          setAlertColor("text-orange-500");
        } else if (fill >= 50) {
          setAlertMessage("🟡 Moderate: Bin is filling up. Monitor regularly.");
          setAlertColor("text-yellow-500");
        } else {
          setAlertMessage("🟢 All good: Bin is in a safe range.");
          setAlertColor("text-green-600");
        }
      } catch (error) {
        console.error("Failed to fetch bin data:", error);
        setAlertMessage("❌ Failed to load bin status.");
        setAlertColor("text-red-500");
      }
    };

    fetchBinData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold text-secondary">Alerts</h3>
      <p className={`mt-2 font-semibold ${alertColor}`}>{alertMessage}</p>
    </div>
  );
}
