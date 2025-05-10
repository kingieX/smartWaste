/* eslint-disable react/no-unescaped-entities */
"use client";

const mockAssignedBins = [
  { id: "BIN001", status: "Collected" },
  { id: "BIN002", status: "Pending" },
  { id: "BIN003", status: "Pending" },
];

export default function CollectorDashboard() {
  const totalAssigned = mockAssignedBins.length;
  const collected = mockAssignedBins.filter(
    (b) => b.status === "Collected"
  ).length;
  const pending = totalAssigned - collected;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, Collector</h1>
      <p className="text-sm text-gray-600">
        Here's a quick overview of your assigned tasks.
      </p>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm text-gray-500">Total Assigned Bins</h2>
          <p className="text-2xl font-bold">{totalAssigned}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm text-gray-500">Bins Collected</h2>
          <p className="text-2xl font-bold text-green-600">{collected}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm text-gray-500">Pending Bins</h2>
          <p className="text-2xl font-bold text-yellow-500">{pending}</p>
        </div>
      </div>

      {/* Activity log */}
      <div className="bg-white rounded shadow p-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Today’s Activity</h2>
        <ul className="text-sm text-gray-700 list-disc list-inside">
          {mockAssignedBins.map((bin) => (
            <li key={bin.id}>
              Bin {bin.id} —{" "}
              <span
                className={
                  bin.status === "Collected"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {bin.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
