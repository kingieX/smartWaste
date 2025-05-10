"use client";

const mockBinStatusReports = [
  {
    id: "BIN001",
    location: "Main Market",
    status: "Full",
    lastUpdated: "2025-05-09 08:00",
  },
  {
    id: "BIN002",
    location: "Zone B",
    status: "Overflowing",
    lastUpdated: "2025-05-09 07:45",
  },
  {
    id: "BIN003",
    location: "Mile 50 Layout",
    status: "Clean",
    lastUpdated: "2025-05-09 07:15",
  },
  {
    id: "BIN004",
    location: "Zone C",
    status: "Half-Full",
    lastUpdated: "2025-05-09 06:30",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Full":
      return "text-yellow-600";
    case "Overflowing":
      return "text-red-600";
    case "Half-Full":
      return "text-orange-500";
    case "Empty":
      return "text-green-600";
    case "Clean":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};

export default function BinFillReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bin Fill Reports</h1>
      <p className="text-sm text-gray-600">
        Overview of current bin statuses from field updates.
      </p>

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
            </tr>
          </thead>
          <tbody>
            {mockBinStatusReports.map((bin) => (
              <tr key={bin.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{bin.id}</td>
                <td className="px-4 py-2 text-sm">{bin.location}</td>
                <td
                  className={`px-4 py-2 text-sm font-semibold ${getStatusColor(
                    bin.status
                  )}`}
                >
                  {bin.status}
                </td>
                <td className="px-4 py-2 text-sm">{bin.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
