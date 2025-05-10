/* eslint-disable react/no-unescaped-entities */
"use client";

import dynamic from "next/dynamic";

// Load map only on client
const CollectorMap = dynamic(() => import("@/components/maps/CollectorMap"), {
  ssr: false,
});

const mockRouteBins = [
  {
    id: "BIN001",
    lat: 6.3227,
    lng: 8.1131,
    status: "Full",
    location: "Main Market",
  },
  {
    id: "BIN002",
    lat: 6.3309,
    lng: 8.1033,
    status: "Half-Full",
    location: "Zone B",
  },
  {
    id: "BIN003",
    lat: 6.319,
    lng: 8.1214,
    status: "Empty",
    location: "Mile 50 Layout",
  },
];

export default function CollectionRoutePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Today's Collection Route</h1>
      <p className="text-sm text-gray-600">
        This map shows the bins assigned to you for today.
      </p>

      <div className="h-[500px] w-full rounded shadow overflow-hidden">
        <CollectorMap bins={mockRouteBins} />
      </div>
    </div>
  );
}
