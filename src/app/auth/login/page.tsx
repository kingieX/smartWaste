/* eslint-disable @typescript-eslint/no-explicit-any */
// app/auth/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace with actual auth logic
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userEmail", email);

      // Redirect based on role
      if (data.role === "admin") router.push("/dashboard/admin");
      else if (data.role === "collector") router.push("/dashboard/collector");
      else if (data.role === "officer") router.push("/dashboard/officer");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      {/* Header */}
      <Navbar />
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-4"
        />

        <Button type="submit" className="mt-6 w-full">
          Login
        </Button>

        <p className="text-sm text-center mt-4">
          <a
            href="/auth/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot password?
          </a>
        </p>
      </form>
    </div>
  );
}
