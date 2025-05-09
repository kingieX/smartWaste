"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { format } from "date-fns";

const roles = ["admin", "collector", "officer"];

const mockUsers = [
  {
    id: "U001",
    name: "John Doe",
    email: "john@example.com",
    role: "collector",
    status: "active",
    createdAt: "2025-04-15T10:30:00Z",
  },
  {
    id: "U002",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
    createdAt: "2025-04-01T09:00:00Z",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers);
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "collector",
    status: "active",
  });

  const handleAddUser = () => {
    const newEntry = {
      ...newUser,
      id: `U${users.length + 1}`.padStart(4, "0"),
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newEntry]);
    setNewUser({ name: "", email: "", role: "collector", status: "active" });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{user.id}</td>
                <td className="px-4 py-2 text-sm">{user.name}</td>
                <td className="px-4 py-2 text-sm">{user.email}</td>
                <td className="px-4 py-2 text-sm capitalize">{user.role}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={
                      user.status === "active"
                        ? "text-green-600"
                        : "text-gray-400"
                    }
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  {format(new Date(user.createdAt), "PPP")}
                </td>
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

      {/* Add User Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add New User
            </Dialog.Title>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddUser();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 border rounded"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add User
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
