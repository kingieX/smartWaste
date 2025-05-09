"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { saveAs } from "file-saver";

const initialData = [
  { date: "May 1", fullBins: 20, collected: 18 },
  { date: "May 2", fullBins: 25, collected: 24 },
  { date: "May 3", fullBins: 19, collected: 19 },
  { date: "May 4", fullBins: 22, collected: 20 },
  { date: "May 5", fullBins: 28, collected: 26 },
];

export default function WasteCollectionReportsPage() {
  const [data] = useState(initialData);
  const [filter, setFilter] = useState("");

  const filteredData = filter
    ? data.filter((entry) =>
        entry.date.toLowerCase().includes(filter.toLowerCase())
      )
    : data;

  const downloadCSV = () => {
    const headers = ["Date", "Full Bins", "Collected"];
    const rows = filteredData.map((d) => [d.date, d.fullBins, d.collected]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "waste-collection-report.csv");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Waste Collection Reports</h1>
      <p className="text-gray-600 text-sm">
        Summary of bin collection patterns for recent days.
      </p>

      {/* Filters and Download Button */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Filter by date (e.g. May 2)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded w-full md:max-w-xs"
        />
        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download CSV
        </button>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2">Daily Collection Summary</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="fullBins" fill="#f87171" name="Full Bins" />
            <Bar dataKey="collected" fill="#60a5fa" name="Collected" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
