/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

const mockTickets = [
  {
    id: "T001",
    subject: "Overflowing Bin at Mile 50",
    user: "Michael Johnson",
    role: "officer",
    status: "Open",
    date: "2025-05-08T08:30:00Z",
  },
  {
    id: "T002",
    subject: "Bin sensor not working - Zone B",
    user: "Jane Smith",
    role: "collector",
    status: "Resolved",
    date: "2025-05-07T16:00:00Z",
  },
];

export default function TicketingSystemPage() {
  const [tickets, setTickets] = useState(mockTickets);
  const [filter, setFilter] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
  const [response, setResponse] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(filter.toLowerCase()) ||
      ticket.user.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ticketing System</h1>
      <p className="text-gray-600 text-sm">
        Monitor and manage user-submitted reports or complaints.
      </p>

      <Input
        type="text"
        placeholder="Search by subject or user"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-md"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Ticket ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Subject
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                User
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{ticket.id}</td>
                <td className="px-4 py-2 text-sm">{ticket.subject}</td>
                <td className="px-4 py-2 text-sm">{ticket.user}</td>
                <td className="px-4 py-2 text-sm capitalize">{ticket.role}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={
                      ticket.status === "Resolved"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  {format(new Date(ticket.date), "PPPpp")}
                </td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setResponse("");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    View & Respond
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ticket Reply Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-full max-w-lg rounded shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">Respond to Ticket</h2>

            <div className="space-y-1 text-sm">
              <p>
                <strong>Subject:</strong> {selectedTicket.subject}
              </p>
              <p>
                <strong>User:</strong> {selectedTicket.user}
              </p>
              <p>
                <strong>Role:</strong> {selectedTicket.role}
              </p>
              <p>
                <strong>Status:</strong> {selectedTicket.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {format(new Date(selectedTicket.date), "PPPpp")}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Change Status
              </label>
              <select
                value={selectedTicket.status}
                onChange={(e) =>
                  setSelectedTicket({
                    ...selectedTicket,
                    status: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Reply</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
                rows={4}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updated = tickets.map((t) =>
                    t.id === selectedTicket.id ? { ...selectedTicket } : t
                  );
                  setTickets(updated);
                  setSelectedTicket(null);
                  setResponse("");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
