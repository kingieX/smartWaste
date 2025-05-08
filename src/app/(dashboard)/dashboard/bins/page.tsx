/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/bins/page.tsx
"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Dialog } from "@headlessui/react";

const mockBins = [
  {
    id: "BIN001",
    location: "Zone A",
    status: "Full",
    model: "X100",
    maintainedBy: "CleanTech Ltd.",
    producer: "SmartBin Co.",
    timeInstalled: "2024-12-01 08:00",
    lastUpdated: "2025-05-08 09:00",
  },
  {
    id: "BIN002",
    location: "Zone B",
    status: "Half-Full",
    model: "X100",
    maintainedBy: "GreenWaste Ltd.",
    producer: "SmartBin Co.",
    timeInstalled: "2024-11-20 14:00",
    lastUpdated: "2025-05-08 08:30",
  },
];

export default function SmartBinManagementPage() {
  const [bins, setBins] = useState(mockBins);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBin, setSelectedBin] = useState<any | null>(null);
  const [newBin, setNewBin] = useState({
    id: "",
    location: "",
    status: "Empty",
    model: "",
    maintainedBy: "",
    producer: "",
    timeInstalled: "",
  });

  const handleAddBin = () => {
    const newEntry = {
      ...newBin,
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setBins([...bins, newEntry]);
    setNewBin({
      id: "",
      location: "",
      status: "Empty",
      model: "",
      maintainedBy: "",
      producer: "",
      timeInstalled: "",
    });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Smart Bin Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add Bin
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                IoT Device ID
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
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bins.map((bin) => (
              <tr
                key={bin.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedBin(bin)}
              >
                <td className="px-4 py-2 text-sm">{bin.id}</td>
                <td className="px-4 py-2 text-sm">{bin.location}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={
                      bin.status === "Full"
                        ? "text-red-500"
                        : bin.status === "Half-Full"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }
                  >
                    {bin.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">{bin.lastUpdated}</td>
                <td className="px-4 py-2 text-sm">
                  <button className="mr-2 text-blue-600 hover:underline">
                    <Pencil className="w-4 h-4 inline" />
                  </button>
                  <button className="text-red-600 hover:underline">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Bin Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-h-[90vh] overflow-y-auto max-w-md rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add New Bin
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddBin();
              }}
              className="space-y-4"
            >
              {[
                { label: "IoT Device ID", key: "id" },
                { label: "Location", key: "location" },
                { label: "Model", key: "model" },
                { label: "Maintained By", key: "maintainedBy" },
                { label: "Producer", key: "producer" },
                {
                  label: "Time Installed",
                  key: "timeInstalled",
                  type: "datetime-local",
                },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium">{label}</label>
                  <input
                    type={type || "text"}
                    required
                    value={(newBin as any)[key]}
                    onChange={(e) =>
                      setNewBin({ ...newBin, [key]: e.target.value })
                    }
                    className="w-full mt-1 px-3 py-2 border rounded"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  value={newBin.status}
                  onChange={(e) =>
                    setNewBin({ ...newBin, status: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                >
                  <option value="Empty">Empty</option>
                  <option value="Half-Full">Half-Full</option>
                  <option value="Full">Full</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Bin
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Bin Details Modal */}
      <Dialog
        open={!!selectedBin}
        onClose={() => setSelectedBin(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Bin Details
            </Dialog.Title>
            {selectedBin && (
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>IoT Device ID:</strong> {selectedBin.id}
                </p>
                <p>
                  <strong>Location:</strong> {selectedBin.location}
                </p>
                <p>
                  <strong>Status:</strong> {selectedBin.status}
                </p>
                <p>
                  <strong>Model:</strong> {selectedBin.model}
                </p>
                <p>
                  <strong>Maintained By:</strong> {selectedBin.maintainedBy}
                </p>
                <p>
                  <strong>Producer:</strong> {selectedBin.producer}
                </p>
                <p>
                  <strong>Time Installed:</strong> {selectedBin.timeInstalled}
                </p>
                <p>
                  <strong>Last Updated:</strong> {selectedBin.lastUpdated}
                </p>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
