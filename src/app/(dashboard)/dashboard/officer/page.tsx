/* eslint-disable react/no-unescaped-entities */
"use client";

const mockBinReports = [
  { id: "BIN001", status: "Full" },
  { id: "BIN002", status: "Overflowing" },
  { id: "BIN003", status: "Full" },
  { id: "BIN004", status: "Clean" },
];

const mockTickets = [
  { id: "T001", subject: "Illegal dumping near Mile 50", status: "Open" },
  {
    id: "T002",
    subject: "Overflowing bin at Market Square",
    status: "Resolved",
  },
];

export default function OfficerDashboardPage() {
  const totalReports = mockBinReports.length;
  const fullBins = mockBinReports.filter((r) => r.status === "Full").length;
  const overflowingBins = mockBinReports.filter(
    (r) => r.status === "Overflowing"
  ).length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, Officer</h1>
      <p className="text-sm text-gray-600">
        Here's a quick overview of bin status and compliance issues.
      </p>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm text-gray-500">Total Bin Reports</h2>
          <p className="text-2xl font-bold">{totalReports}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm text-gray-500">Full Bins</h2>
          <p className="text-2xl font-bold text-yellow-600">{fullBins}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-sm text-gray-500">Overflowing Bins</h2>
          <p className="text-2xl font-bold text-red-600">{overflowingBins}</p>
        </div>
      </div>

      {/* Ticket Summary */}
      <div className="bg-white rounded shadow p-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Recent Environmental Reports
        </h2>
        <ul className="text-sm text-gray-700 list-disc list-inside">
          {mockTickets.map((ticket) => (
            <li key={ticket.id}>
              {ticket.subject} —{" "}
              <span
                className={
                  ticket.status === "Resolved"
                    ? "text-green-600"
                    : "text-yellow-600"
                }
              >
                {ticket.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
