"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Users, Globe, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <>
      {/* Header */}
      <Navbar />
      <div className="flex flex-col justify-center items-center p-6 max-w-6xl mx-auto mt-20">
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold text-primary text-center"
        >
          About Us
        </h2>
        <p
          data-aos="fade-up"
          className="text-lg text-gray-600 text-center mt-4 max-w-xl"
        >
          SmartWaste is an IoT-powered waste management system designed to
          improve efficiency, reduce pollution, and optimize waste collection.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div
            data-aos="fade-right"
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <Users size={48} className="text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mt-2">
              To create a cleaner and more efficient waste management system for
              communities.
            </p>
          </div>

          <div
            data-aos="zoom-in"
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <Globe size={48} className="text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Global Impact
            </h3>
            <p className="text-gray-600 mt-2">
              Reducing waste overflow and promoting sustainability worldwide.
            </p>
          </div>

          <div
            data-aos="fade-left"
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <ShieldCheck size={48} className="text-primary mx-auto" />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Safe & Secure
            </h3>
            <p className="text-gray-600 mt-2">
              Data security and privacy are our top priorities.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
