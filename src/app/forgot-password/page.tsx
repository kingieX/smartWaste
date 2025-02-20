"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function ForgotPassword() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch("YOUR_BACKEND_API/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    console.log("data: ", data);

    if (res.ok) {
      setMessage("A password reset link has been sent to your email.");
    } else {
      setError("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div
        data-aos="fade-up"
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-primary">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Enter your email to receive a reset link
        </p>

        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 mt-4 rounded-lg hover:bg-opacity-80 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Remember your password?{" "}
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
