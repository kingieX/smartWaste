"use client";

const mockAssignedBins = [
  {
    id: "BIN001",
    location: "Main Market",
    status: "Full",
    timeAssigned: "2025-05-09 08:00",
  },
  {
    id: "BIN002",
    location: "Zone B",
    status: "Half-Full",
    timeAssigned: "2025-05-09 08:30",
  },
  {
    id: "BIN003",
    location: "Mile 50 Layout",
    status: "Empty",
    timeAssigned: "2025-05-09 09:00",
  },
];

export default function MyAssignedBinsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Assigned Bins</h1>
      <p className="text-sm text-gray-600">
        These are the bins assigned to you today for collection.
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
                Time Assigned
              </th>
            </tr>
          </thead>
          <tbody>
            {mockAssignedBins.map((bin) => (
              <tr key={bin.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{bin.id}</td>
                <td className="px-4 py-2 text-sm">{bin.location}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={
                      bin.status === "Full"
                        ? "text-red-600"
                        : bin.status === "Half-Full"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }
                  >
                    {bin.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">{bin.timeAssigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
