/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function ResetPassword() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get the token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await fetch("YOUR_BACKEND_API/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    console.log("data: ", data);
    if (res.ok) {
      setMessage("Password reset successfully. You can now sign in.");
    } else {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div
        data-aos="fade-up"
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-primary">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Enter a new password to reset your account.
        </p>

        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 mt-4 rounded-lg hover:bg-opacity-80 transition"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Back to{" "}
          <Link
            href="/signin"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
