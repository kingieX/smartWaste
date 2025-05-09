"use client";

import { useState } from "react";

const mockRoutes = [
  { id: "R001", area: "Downtown" },
  { id: "R002", area: "Zone B" },
];

const mockBins = [
  { id: "BIN001", location: "Area 1", assigned: false },
  { id: "BIN002", location: "Area 2", assigned: false },
  { id: "BIN003", location: "Area 3", assigned: false },
];

export default function AssignBinsToRoutesPage() {
  const [routes] = useState(mockRoutes);
  const [bins, setBins] = useState(mockBins);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedBinIds, setSelectedBinIds] = useState<string[]>([]);
  const [routeAssignments, setRouteAssignments] = useState<
    Record<string, string[]>
  >({});

  const handleAssign = () => {
    if (!selectedRoute || selectedBinIds.length === 0) return;

    // Update assignment state
    const updatedAssignments = {
      ...routeAssignments,
      [selectedRoute]: [
        ...(routeAssignments[selectedRoute] || []),
        ...selectedBinIds,
      ],
    };

    // Mark bins as assigned
    const updatedBins = bins.map((bin) =>
      selectedBinIds.includes(bin.id) ? { ...bin, assigned: true } : bin
    );

    setRouteAssignments(updatedAssignments);
    setBins(updatedBins);
    setSelectedBinIds([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Assign Bins to Routes</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Select Route</label>
          <select
            value={selectedRoute}
            onChange={(e) => setSelectedRoute(e.target.value)}
            className="mt-1 w-full max-w-md border rounded px-3 py-2"
          >
            <option value="">-- Select Route --</option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.id} – {route.area}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Available Bins
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {bins
              .filter((bin) => !bin.assigned)
              .map((bin) => (
                <label
                  key={bin.id}
                  className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    value={bin.id}
                    checked={selectedBinIds.includes(bin.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedBinIds((prev) =>
                        checked
                          ? [...prev, bin.id]
                          : prev.filter((id) => id !== bin.id)
                      );
                    }}
                  />
                  <span>
                    {bin.id} – {bin.location}
                  </span>
                </label>
              ))}
          </div>
        </div>

        <button
          onClick={handleAssign}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!selectedRoute || selectedBinIds.length === 0}
        >
          Assign Selected Bins
        </button>
      </div>

      {selectedRoute && routeAssignments[selectedRoute]?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Bins Assigned to {selectedRoute}
          </h2>
          <ul className="list-disc ml-6 text-sm">
            {routeAssignments[selectedRoute].map((binId) => (
              <li key={binId}>{binId}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
