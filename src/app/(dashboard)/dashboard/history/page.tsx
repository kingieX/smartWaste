"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const mockHistory = [
  {
    id: "LOG001",
    binId: "BIN001",
    collector: "John Doe",
    location: "Main Market",
    date: "2025-05-08T09:00:00Z",
    status: "Collected",
  },
  {
    id: "LOG002",
    binId: "BIN002",
    collector: "Jane Smith",
    location: "Zone B",
    date: "2025-05-08T08:45:00Z",
    status: "Missed",
  },
  {
    id: "LOG003",
    binId: "BIN003",
    collector: "Michael Johnson",
    location: "Mile 50 Layout",
    date: "2025-05-07T17:30:00Z",
    status: "Collected",
  },
];

export default function CollectionHistoryPage() {
  const [filter, setFilter] = useState("");

  const filteredHistory = mockHistory.filter(
    (entry) =>
      entry.binId.toLowerCase().includes(filter.toLowerCase()) ||
      entry.collector.toLowerCase().includes(filter.toLowerCase()) ||
      entry.location.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Collection History</h1>
      <p className="text-gray-600 text-sm">Logs of past waste collections.</p>

      <Input
        type="text"
        placeholder="Search by bin ID, collector, or location"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Log ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Bin ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Collector
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Location
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((entry) => (
              <tr key={entry.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{entry.id}</td>
                <td className="px-4 py-2 text-sm">{entry.binId}</td>
                <td className="px-4 py-2 text-sm">{entry.collector}</td>
                <td className="px-4 py-2 text-sm">{entry.location}</td>
                <td className="px-4 py-2 text-sm">
                  {format(new Date(entry.date), "PPPpp")}
                </td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={
                      entry.status === "Collected"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
