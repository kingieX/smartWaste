"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function SignUp() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    residents: "",
    binId: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1) {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all required fields.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }
    setError("");
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // const res = await fetch("YOUR_BACKEND_API/auth/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });

    router.push("/dashboard"); // Redirect to Dashboard after sign-up

    // const data = await res.json();
    // if (res.ok) {
    //   setMessage("Registration successful! Redirecting to dashboard...");
    //   setTimeout(() => {
    //     router.push("/dashboard"); // Redirect to Dashboard after sign-up
    //   }, 2000);
    // } else {
    //   setError(data.message || "Registration failed. Please try again.");
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
          Create Account
        </h2>
        <p className="text-center text-gray-600 mt-1">
          Join the Smart Waste Management System
        </p>

        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          {step === 1 && (
            <div>
              <div>
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-primary text-white py-3 mt-4 rounded-lg hover:bg-opacity-80 transition"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div>
                <label className="block text-gray-700">Household Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">
                  Number of Residents
                </label>
                <input
                  type="number"
                  name="residents"
                  placeholder="How many people live in the household?"
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
                  value={formData.residents}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Smart Bin ID</label>
                <input
                  type="text"
                  name="binId"
                  placeholder="Enter your unique bin ID"
                  className="w-full mt-2 p-3 border rounded-lg focus:ring-primary focus:border-primary"
                  value={formData.binId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-secondary text-white px-5 py-2 rounded-lg hover:bg-opacity-80 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-opacity-80 transition"
                >
                  Sign Up
                </button>
              </div>
            </div>
          )}
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have account?{" "}
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
