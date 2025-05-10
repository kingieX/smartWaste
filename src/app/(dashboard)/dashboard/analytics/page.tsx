"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const barData = [
  { date: "May 1", collected: 18 },
  { date: "May 2", collected: 24 },
  { date: "May 3", collected: 19 },
  { date: "May 4", collected: 20 },
  { date: "May 5", collected: 26 },
];

const pieData = [
  { name: "Full", value: 14 },
  { name: "Half-Full", value: 10 },
  { name: "Empty", value: 6 },
];

const COLORS = ["#f87171", "#facc15", "#4ade80"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Section 1: Pie chart for bin status distribution */}
      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Bin Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Section 2: Bar chart for collection trend */}
      <div className="bg-white p-6 rounded shadow max-w-4xl">
        <h2 className="text-lg font-semibold mb-4">Daily Collection Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="collected" fill="#60a5fa" name="Bins Collected" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
