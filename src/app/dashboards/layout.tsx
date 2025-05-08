import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import NotificationPopup from "@/components/NotificationPopup";
import { NotificationProvider } from "@/context/NotificationContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen bg-gray-100 ml-64 md:ml-64">
          <Topbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
      <NotificationPopup />
    </NotificationProvider>
  );
}
