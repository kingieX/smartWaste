"use client";

import { useEffect, useState } from "react";

// Define the type for bin data
type BinData = {
  percent_fill: number;
  created_at: string;
};

export default function RecentActivity() {
  const [activity, setActivity] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const response = await fetch(
          "https://smartwastbin.onrender.com/iot/sensordata/latest"
        );
        const data: BinData = await response.json();
        const fill = data.percent_fill;

        let message = "";
        if (fill >= 80) {
          message = "⚠️ Bin almost full";
        } else if (fill < 20) {
          message = "✅ Waste collected";
        } else {
          message = "ℹ️ Bin checked";
        }

        setActivity(message);
        setTimestamp(
          new Date(data.created_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        );
      } catch (error) {
        console.error("Error fetching recent activity:", error);
        setActivity("❌ Unable to load activity");
        setTimestamp("");
      }
    };

    fetchRecentActivity();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold text-secondary">Recent Activity</h3>
      <ul className="mt-2 text-gray-600">
        {activity ? (
          <li>
            {activity} - <span className="font-semibold">{timestamp}</span>
          </li>
        ) : (
          <li>Loading activity...</li>
        )}
      </ul>
    </div>
  );
}
