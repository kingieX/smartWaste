"use client";

import { useNotification } from "@/context/NotificationContext";
import { X } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function NotificationPopup() {
  useEffect(() => {
    AOS.init({ duration: 500, once: true });
  }, []);

  const { notifications, removeNotification } = useNotification();

  return (
    <div className="fixed top-4 right-4 space-y-4 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          data-aos="fade-left"
          className={`flex items-center justify-between p-4 rounded-lg shadow-md w-80 ${
            notification.type === "warning"
              ? "bg-red-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => removeNotification(notification.id)}>
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
