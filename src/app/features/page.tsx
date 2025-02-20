"use client";

import { JSX, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Trash2, Map, Bell, Timer, BarChart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function FeaturesPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <>
      {/* Header */}
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto mt-20">
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold text-primary text-center"
        >
          Features
        </h2>
        <p
          data-aos="fade-up"
          className="text-lg text-gray-600 text-center mt-4"
        >
          Our system provides advanced features to make waste management more
          efficient and cost-effective.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <FeatureCard
            icon={<Trash2 size={48} />}
            title="Smart Bin Monitoring"
            description="Real-time waste level detection."
          />
          <FeatureCard
            icon={<Map size={48} />}
            title="GPS Tracking"
            description="Track and optimize waste collection routes."
          />
          <FeatureCard
            icon={<Bell size={48} />}
            title="Instant Alerts"
            description="Receive notifications when bins are full."
          />
          <FeatureCard
            icon={<Timer size={48} />}
            title="Automated Scheduling"
            description="Optimized pickup scheduling."
          />
          <FeatureCard
            icon={<BarChart size={48} />}
            title="Analytics & Reports"
            description="Get detailed insights on waste management trends."
          />
        </div>
      </div>
    </>
  );
}

// Reusable FeatureCard Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
}) {
  return (
    <div
      data-aos="fade-up"
      className="flex flex-col justify-center items-center  bg-white p-6 rounded-lg shadow-md text-center"
    >
      <div className="text-primary mx-auto">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mt-4">{title}</h3>
      <p className="text-gray-600 mt-2 max-w-xl">{description}</p>
    </div>
  );
}
