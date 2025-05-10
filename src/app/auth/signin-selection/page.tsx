/* eslint-disable react/no-unescaped-entities */
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function SignInSelectionPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Header */}
      <Navbar />
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full text-center space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold">
          Welcome to SmartWaste System
        </h1>
        <p className="text-gray-600">
          Please choose how you'd like to sign in:
        </p>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full border border-yellow-400 text-yellow-400 hover:text-white"
            onClick={() => router.push("/signin")}
          >
            Sign In as Customer
          </Button>

          <Button
            className="w-full text-white"
            onClick={() => router.push("/auth/login")}
          >
            Sign In as Worker (Admin / Collector / Officer)
          </Button>
        </div>
      </div>
    </div>
  );
}
