"use client";

import { useEffect, useState } from "react";
import { useNotification } from "@/context/NotificationContext";

// Define TypeScript type for sensor data
type BinData = {
  percent_fill: number;
  created_at: string;
};

export default function BinStatus() {
  const { addNotification } = useNotification();
  const [fillLevel, setFillLevel] = useState<number | null>(null);
  const [lastEmptied, setLastEmptied] = useState<string>("");

  useEffect(() => {
    const fetchBinData = async () => {
      try {
        const response = await fetch(
          "https://smartwastbin.onrender.com/iot/sensordata/latest"
        );
        const data: BinData = await response.json();

        setFillLevel(data.percent_fill);
        setLastEmptied(new Date(data.created_at).toLocaleString());

        if (data.percent_fill >= 80) {
          addNotification(
            "⚠️ Bin is almost full! Schedule a pickup soon.",
            "warning"
          );
        }
      } catch (error) {
        console.error("Error fetching bin data:", error);
        addNotification("❌ Failed to fetch bin data.", "warning");
      }
    };

    fetchBinData();
  }, [addNotification]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold text-secondary">Waste Bin Status</h3>
      <p className="text-gray-600 mt-2">
        Current Fill Level:{" "}
        <span className="text-primary font-bold">
          {fillLevel !== null ? `${fillLevel}%` : "Loading..."}
        </span>
      </p>
      <p className="text-gray-600 mt-1">
        Last Emptied:{" "}
        <span className="font-semibold">{lastEmptied || "Loading..."}</span>
      </p>
    </div>
  );
}
