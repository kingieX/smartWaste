"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { FcGoogle } from "react-icons/fc";
import Navbar from "@/components/Navbar";

export default function SignInPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });

    router.push("/dashboards"); // Redirect to dashboard upon success

    // if (result?.error) {
    //   setError("Invalid email or password");
    // } else {
    //   router.push("/dashboards"); // Redirect to dashboard upon success
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      {/* Header */}
      <Navbar />
      <div
        data-aos="fade-up"
        className="w-full max-w-md bg-white px-8 py-4 rounded-2xl shadow-lg mt-16"
      >
        <h2 className="text-3xl font-bold text-center text-primary">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mt-1">Sign in to continue</p>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

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

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 mt-4 rounded-lg hover:bg-opacity-80 transition"
          >
            Sign In
          </button>

          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative text-sm text-gray-500 text-center uppercase">
              <span className="bg-white px-2">Or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 border py-3 mt-4 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} />
            Sign in with Google
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have account?{" "}
          <Link
            href="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
