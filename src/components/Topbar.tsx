"use client";

import { usePathname } from "next/navigation";
import { Bell, UserCircle } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();

  // Define titles for each page
  const pageTitles: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/bin-status": "Waste Bin Status",
    "/map": "Map View",
    "/history": "History & Reports",
    "/settings": "Settings",
  };

  // Get the current page title, default to "Dashboard" if not found
  const currentTitle = pageTitles[pathname] || "Dashboard";

  return (
    <div className="bg-white flex justify-between items-center px-6 py-4 shadow-md">
      <h2 className="text-2xl font-bold text-secondary">{currentTitle}</h2>

      <div className="flex items-center space-x-4">
        <button className="relative">
          <Bell size={24} className="text-secondary hover:text-primary" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            3
          </span>
        </button>
        <UserCircle size={32} className="text-secondary" />
      </div>
    </div>
  );
}
