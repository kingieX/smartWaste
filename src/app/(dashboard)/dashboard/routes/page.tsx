/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/routes/page.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog } from "@headlessui/react";

const mockRoutes = [
  {
    id: "R001",
    area: "Zone A",
    collector: "John Doe",
    bins: ["BIN001", "BIN003", "BIN005"],
    status: "Active",
  },
  {
    id: "R002",
    area: "Zone B",
    collector: "Jane Smith",
    bins: ["BIN002"],
    status: "Inactive",
  },
];

export default function WasteCollectionRoutesPage() {
  const [routes, setRoutes] = useState(mockRoutes);
  const [isOpen, setIsOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({
    id: "",
    area: "",
    collector: "",
    bins: "",
    status: "Active",
  });

  const handleAddRoute = () => {
    const newEntry = {
      ...newRoute,
      bins: newRoute.bins.split(",").map((b) => b.trim()),
    };
    setRoutes([...routes, newEntry]);
    setNewRoute({
      id: "",
      area: "",
      collector: "",
      bins: "",
      status: "Active",
    });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Waste Collection Routes</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Plus className="w-4 h-4" /> Add Route
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Route ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Area
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Collector
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Bins
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{route.id}</td>
                <td className="px-4 py-2 text-sm">{route.area}</td>
                <td className="px-4 py-2 text-sm">{route.collector}</td>
                <td className="px-4 py-2 text-sm">{route.bins.join(", ")}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={
                      route.status === "Active"
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {route.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Route Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add New Route
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddRoute();
              }}
              className="space-y-4"
            >
              {[
                { label: "Route ID", key: "id" },
                { label: "Area", key: "area" },
                { label: "Assigned Collector", key: "collector" },
                { label: "Bin IDs (comma-separated)", key: "bins" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium">{label}</label>
                  <input
                    type="text"
                    required
                    value={(newRoute as any)[key]}
                    onChange={(e) =>
                      setNewRoute({ ...newRoute, [key]: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={newRoute.status}
                  onChange={(e) =>
                    setNewRoute({ ...newRoute, status: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add Route
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
