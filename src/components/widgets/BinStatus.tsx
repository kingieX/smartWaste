"use client";

import { useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";

export default function BinStatus() {
  const { addNotification } = useNotification();

  useEffect(() => {
    const binFillLevel = 0; // Placeholder for real data

    if (binFillLevel >= 80) {
      addNotification(
        "⚠️ Bin is almost full! Schedule a pickup soon.",
        "warning"
      );
    }
  }, [addNotification]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold text-secondary">Waste Bin Status</h3>
      <p className="text-gray-600 mt-2">
        Current Fill Level: <span className="text-primary font-bold">90%</span>
      </p>
      <p className="text-gray-600 mt-1">
        Last Emptied: <span className="font-semibold">2 Days Ago</span>
      </p>
    </div>
  );
}
