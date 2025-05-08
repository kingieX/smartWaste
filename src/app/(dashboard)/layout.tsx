// app/(dashboard)/layout.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  LayoutDashboard,
  Trash2,
  Route,
  MapPin,
  Radar,
  FileText,
  History,
  Users,
  Ticket,
  Bell,
  BarChart2,
  HelpCircle,
  Menu,
  X,
  Recycle,
  LogOut,
} from "lucide-react";
import { NotificationProvider } from "@/context/NotificationContext";

const roleMenus: Record<
  string,
  { name: string; path: string; icon: React.ReactNode }[]
> = {
  admin: [
    {
      name: "Dashboard Overview",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Smart Bin Management",
      path: "/dashboard/bins",
      icon: <Trash2 className="w-5 h-5" />,
    },
    {
      name: "Waste Collection Routes",
      path: "/dashboard/routes",
      icon: <Route className="w-5 h-5" />,
    },
    {
      name: "Assign Bins to Routes",
      path: "/dashboard/assign-bins",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      name: "Real-time Bin Tracking",
      path: "/dashboard/tracking",
      icon: <Radar className="w-5 h-5" />,
    },
    {
      name: "Waste Collection Reports",
      path: "/dashboard/reports",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      name: "Collection History",
      path: "/dashboard/history",
      icon: <History className="w-5 h-5" />,
    },
    {
      name: "User Management",
      path: "/dashboard/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Ticketing System",
      path: "/dashboard/tickets",
      icon: <Ticket className="w-5 h-5" />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      name: "Support / Help Center",
      path: "/dashboard/support",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ],
  collector: [
    {
      name: "Dashboard Overview",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "My Assigned Bins",
      path: "/dashboard/assigned-bins",
      icon: <Trash2 className="w-5 h-5" />,
    },
    {
      name: "Collection Route",
      path: "/dashboard/route",
      icon: <Route className="w-5 h-5" />,
    },
    {
      name: "Collection History",
      path: "/dashboard/history",
      icon: <History className="w-5 h-5" />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      name: "Support / Help Center",
      path: "/dashboard/support",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ],
  officer: [
    {
      name: "Dashboard Overview",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Bin Fill Reports",
      path: "/dashboard/bin-reports",
      icon: <Trash2 className="w-5 h-5" />,
    },
    {
      name: "Ticketing System",
      path: "/dashboard/tickets",
      icon: <Ticket className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <Bell className="w-5 h-5" />,
    },
    {
      name: "Support / Help Center",
      path: "/dashboard/support",
      icon: <HelpCircle className="w-5 h-5" />,
    },
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (!storedRole) {
      router.push("/auth/login");
    } else {
      setRole(storedRole);
    }
  }, [router]);

  if (!role) return null;

  const menuItems = roleMenus[role] || [];

  return (
    <NotificationProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:hidden flex justify-between items-center bg-secondary text-white px-4 py-3">
          <h2 className="text-lg font-semibold">Welcome, {role}</h2>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        <aside
          className={clsx(
            "bg-secondary text-white w-64 p-4 md:block",
            sidebarOpen ? "block" : "hidden",
            "md:min-h-screen"
          )}
        >
          <div className="flex justify-center">
            <Recycle className="mr-2 text-primary" size={32} />
            <h2 className="text-2xl font-bold mb-6">SmartWaste</h2>
          </div>

          {/* <h2 className="hidden md:block text-xl font-bold mb-6">
          Welcome, {role}
        </h2> */}
          <ul className="space-y-">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={clsx(
                    "flex items-center text-sm gap-3 px-4 py-2 rounded hover:bg-gray-700 transition",
                    pathname === item.path &&
                      // (item.path === "/dashboard" &&
                      // pathname.startsWith("/dashboard/"))
                      "bg-primary text-white"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/logout"
            className="flex items-center gap-2 mt-6 text-red-500 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            <LogOut />
            Logout
          </Link>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
      </div>
      {/* great, let's move to the next page. you wanted to implement a logout mechanism next that clears the localStorage and redirects to the login page? */}
    </NotificationProvider>
  );
}
