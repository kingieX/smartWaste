"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { Dialog } from "@headlessui/react";

const mockNotifications = [
  {
    id: "N001",
    title: "Emergency Bin Overflow",
    message: "Please attend to the overflowing bin at Main Market immediately.",
    target: "All Collectors",
    date: "2025-05-08T10:15:00Z",
  },
  {
    id: "N002",
    title: "System Maintenance Notice",
    message: "Dashboard will be down for maintenance by 10 PM tonight.",
    target: "All Users",
    date: "2025-05-07T13:45:00Z",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: "",
    message: "",
    target: "All Users",
  });

  const handleSend = () => {
    const newEntry = {
      ...newNote,
      id: `N${notifications.length + 1}`.padStart(4, "0"),
      date: new Date().toISOString(),
    };
    setNotifications([newEntry, ...notifications]);
    setNewNote({ title: "", message: "", target: "All Users" });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Send Notification
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Message
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Target
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((note) => (
              <tr key={note.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm font-semibold">
                  {note.title}
                </td>
                <td className="px-4 py-2 text-sm">{note.message}</td>
                <td className="px-4 py-2 text-sm">{note.target}</td>
                <td className="px-4 py-2 text-sm">
                  {format(new Date(note.date), "PPPpp")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-lg font-semibold">
              Send Notification
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  required
                  value={newNote.title}
                  onChange={(e) =>
                    setNewNote({ ...newNote, title: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  required
                  value={newNote.message}
                  onChange={(e) =>
                    setNewNote({ ...newNote, message: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Target Audience
                </label>
                <select
                  value={newNote.target}
                  onChange={(e) =>
                    setNewNote({ ...newNote, target: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                >
                  <option>All Users</option>
                  <option>All Admins</option>
                  <option>All Collectors</option>
                  <option>All Officers</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
