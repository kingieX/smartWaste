"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate mock check
    const isKnownEmail = [
      "admin@example.com",
      "collector@example.com",
      "officer@example.com",
    ].includes(email);

    if (isKnownEmail) {
      setStatus("success");
      setMessage("Password reset link sent to your email.");
    } else {
      setStatus("error");
      setMessage("Email not found. Please check and try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Forgot Password
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Enter your email and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
        {status !== "idle" && (
          <div
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/auth/login")}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
