"use client";

import dynamic from "next/dynamic";

// Lazy load map to avoid SSR issues
const TrackingMap = dynamic(() => import("@/components/maps/TrackingMap"), {
  ssr: false,
});

const mockBins = [
  {
    id: "BIN001",
    lat: 6.3227, // Near Abakaliki Main Market
    lng: 8.1131,
    status: "Full",
    location: "Main Market",
    lastUpdated: "2025-05-08 09:00",
  },
  {
    id: "BIN002",
    lat: 6.3309, // Near Ebonyi State University
    lng: 8.1033,
    status: "Half-Full",
    location: "Ebonyi State University",
    lastUpdated: "2025-05-08 08:45",
  },
  {
    id: "BIN003",
    lat: 6.319, // Near Mile 50 Layout
    lng: 8.1214,
    status: "Empty",
    location: "Mile 50 Layout",
    lastUpdated: "2025-05-07 17:30",
  },
];

export default function RealTimeTrackingPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Real-time Bin Tracking</h1>
      <p className="text-sm text-gray-600">
        Below is a live map showing all smart bins and their current status.
      </p>
      <div className="h-[500px] w-full rounded shadow overflow-hidden">
        <TrackingMap bins={mockBins} />
      </div>
    </div>
  );
}
