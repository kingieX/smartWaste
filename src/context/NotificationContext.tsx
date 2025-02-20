"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  id: number;
  message: string;
  type: "warning" | "success";
}

interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (message: string, type: "warning" | "success") => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: "warning" | "success") => {
    const newNotification = { id: Date.now(), message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after 5 seconds
    setTimeout(() => removeNotification(newNotification.id), 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
