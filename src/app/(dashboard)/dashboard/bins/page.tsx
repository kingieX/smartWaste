// app/dashboard/bins/page.tsx
"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";

const mockBins = [
  {
    id: 1,
    location: "Zone A",
    status: "Full",
    lastUpdated: "2025-05-08 09:00",
  },
  {
    id: 2,
    location: "Zone B",
    status: "Half-Full",
    lastUpdated: "2025-05-08 08:30",
  },
  {
    id: 3,
    location: "Zone C",
    status: "Empty",
    lastUpdated: "2025-05-07 17:45",
  },
];

export default function SmartBinManagementPage() {
  const [bins, setBins] = useState(mockBins);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Bin Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Bin
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Bin ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Last Updated
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bins.map((bin) => (
              <tr key={bin.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">#{bin.id}</td>
                <td className="px-4 py-2 text-sm">{bin.location}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={
                      bin.status === "Full"
                        ? "text-red-500"
                        : bin.status === "Half-Full"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {bin.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">{bin.lastUpdated}</td>
                <td className="px-4 py-2 text-sm">
                  <button className="mr-2 text-blue-600 hover:underline">
                    <Pencil className="w-4 h-4 inline" />
                  </button>
                  <button className="text-red-600 hover:underline">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
