"use client";
import { MapPin, Trash2, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const LeafletMap = dynamic(() => import("@/components/maps/LeafletMap"), {
  ssr: false,
});

const stats = [
  {
    label: "Total Bins",
    value: 128,
    icon: <Trash2 className="w-6 h-6 text-green-600" />,
  },
  {
    label: "Full Bins",
    value: 24,
    icon: <Trash2 className="w-6 h-6 text-red-500" />,
  },
  {
    label: "Collectors",
    value: 12,
    icon: <Users className="w-6 h-6 text-blue-500" />,
  },
  {
    label: "Routes Today",
    value: 9,
    icon: <MapPin className="w-6 h-6 text-yellow-500" />,
  },
];

const binData = [
  { name: "Empty", value: 40 },
  { name: "Half-Full", value: 64 },
  { name: "Full", value: 24 },
];

const COLORS = ["#00C49F", "#FFBB28", "#FF4C4C"];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard Overview</h1>
      <p>
        Welcome Admin! View system KPIs like total bins, collectors, reports,
        and route statuses.
      </p>

      <div className="space-y-6 py-4">
        {/* Top Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-4 rounded shadow flex items-center gap-4"
            >
              <div className="p-2 bg-gray-100 rounded-full">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow min-h-[300px]">
            <h2 className="text-lg font-semibold mb-2">
              Bin Status Distribution
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={binData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {binData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow min-h-[300px]">
            <h2 className="text-lg font-semibold mb-2">Smart Bin Locations</h2>
            <LeafletMap />
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>📍 Bin #23 in Zone A is full.</li>
            <li>⚠️ Collector John missed pickup at Location B.</li>
            <li>✅ Bin #12 was successfully emptied at 9:30 AM.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
