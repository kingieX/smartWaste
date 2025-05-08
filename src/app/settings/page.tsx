"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardLayout from "../dashboards/layout";
// import { useTheme } from "@/context/ThemeContext";
// import { Sun, Moon } from "lucide-react";

export default function SettingsPage() {
  //   const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  // Change Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password changed successfully!");
  };

  // Notification Preferences State
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
  });

  const toggleNotifications = (type: "emailAlerts" | "smsAlerts") => {
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Bin Management State
  const [binId, setBinId] = useState("BIN-12345");
  const [householdAddress, setHouseholdAddress] = useState("123 Green St, NY");

  const handleBinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Bin ID updated to: ${binId}, Address updated to: ${householdAddress}`
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl">
        <h2
          data-aos="fade-in"
          className="text-3xl font-semibold text-primary text-center"
        >
          Settings
        </h2>

        {/* Change Password Section */}
        <div data-aos="zoom-in" className="mt-6">
          <h3 className="text-xl font-semibold text-secondary">
            Change Password
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4 mt-2">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="w-full p-3 border rounded-lg"
              onChange={handlePasswordChange}
              required
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full p-3 border rounded-lg"
              onChange={handlePasswordChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="w-full p-3 border rounded-lg"
              onChange={handlePasswordChange}
              required
            />
            <button
              type="submit"
              className="bg-primary text-white w-full py-3 rounded-lg hover:bg-opacity-80"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Dark Mode Toggle */}
        {/* <div data-aos="fade-left" className="mt-8">
          <h3 className="text-xl font-semibold text-secondary dark:text-darkText">
            Appearance
          </h3>
          <button
            onClick={toggleDarkMode}
            className="mt-3 flex items-center justify-between w-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-4 py-3 rounded-lg"
          >
            <span>{darkMode ? "Dark Mode Enabled" : "Light Mode Enabled"}</span>
            {darkMode ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div> */}

        {/* Notification Preferences */}
        <div data-aos="zoom-in" className="mt-8">
          <h3 className="text-xl font-semibold text-secondary">
            Notification Preferences
          </h3>
          <div className="mt-3 space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={() => toggleNotifications("emailAlerts")}
                className="w-5 h-5"
              />
              <span>Email Alerts</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={notifications.smsAlerts}
                onChange={() => toggleNotifications("smsAlerts")}
                className="w-5 h-5"
              />
              <span>SMS Alerts</span>
            </label>
          </div>
        </div>

        {/* Bin Management */}
        <div data-aos="zoom-in" className="mt-8">
          <h3 className="text-xl font-semibold text-secondary">
            Manage Bin ID & Address
          </h3>
          <form onSubmit={handleBinUpdate} className="space-y-4 mt-2">
            <input
              type="text"
              value={binId}
              onChange={(e) => setBinId(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
            <input
              type="text"
              value={householdAddress}
              onChange={(e) => setHouseholdAddress(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-primary text-white w-full py-3 rounded-lg hover:bg-opacity-80"
            >
              Update Bin Details
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
