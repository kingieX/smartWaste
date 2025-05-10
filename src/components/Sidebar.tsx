"use client";

import { JSX, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Map,
  Bell,
  Settings,
  Trash2,
  Recycle,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-secondary text-white w-64 min-h-screen py-6 px-4 fixed transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0`}
      >
        <div className="flex justify-center">
          <Recycle className="mr-2 text-primary" size={32} />
          <h2 className="text-2xl font-bold mb-6">SmartWaste</h2>
        </div>

        <ul className="space-y-4">
          <SidebarLink
            href="/dashboards"
            icon={<Home size={20} />}
            label="Dashboard"
            pathname={pathname}
          />
          <SidebarLink
            href="/bin-status"
            icon={<Trash2 size={20} />}
            label="Waste Bin Status"
            pathname={pathname}
          />
          <SidebarLink
            href="/map"
            icon={<Map size={20} />}
            label="Map View"
            pathname={pathname}
          />
          <SidebarLink
            href="/history"
            icon={<Bell size={20} />}
            label="History & Reports"
            pathname={pathname}
          />
          <SidebarLink
            href="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            pathname={pathname}
          />
        </ul>
        <Link
          href="/logout"
          className="flex items-center gap-2 mt-6 text-red-500 px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          <LogOut />
          Logout
        </Link>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="md:hidden fixed top-4 left-4 bg-primary text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}

// SidebarLink Component for Reusability
function SidebarLink({
  href,
  icon,
  label,
  pathname,
}: {
  href: string;
  icon: JSX.Element;
  label: string;
  pathname: string;
}) {
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center space-x-2 px-4 py-2 text-s rounded-lg transition ${
          isActive ? "bg-primary text-white" : "hover:text-primary"
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </li>
  );
}
