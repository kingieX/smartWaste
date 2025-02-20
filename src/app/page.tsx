"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Navbar from "../components/Navbar";
import {
  Leaf,
  Map,
  Trash2,
  CheckCircle,
  Timer,
  RefreshCw,
  Bell,
} from "lucide-react";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <>
      <div className="relative bg-gray-50 overflow-hidden">
        {/* Header */}
        <Navbar />
        <main className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="text-center">
            <div
              data-aos="fade-down"
              className="flex flex-col justify-center items-center mb-10"
            >
              <h2 className="text-4xl font-bold text-gray-900">
                Welcome to the Future of Waste Management
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mt-4">
                Our IoT-powered waste management system helps reduce waste
                overflow, optimize routes, and provide real-time monitoring for
                efficient collection.
              </p>
            </div>

            {/* Hero Image */}
            <div data-aos="zoom-in" className="mx-auto max-w-xl mb-12">
              <Image
                src="/background.svg"
                alt="Smart Waste Bin"
                width={500}
                height={300}
                className="w-full"
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <h3
              data-aos="fade-up"
              className="text-3xl text-center font-semibold text-gray-900 mb-10"
            >
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div
                data-aos="fade-up"
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <Trash2 size={48} className="text-primary mx-auto" />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">
                  Smart Bin Monitoring
                </h4>
                <p className="text-gray-600 mt-2">
                  Monitor waste levels in real-time and prevent overflow.
                </p>
              </div>

              <div
                data-aos="fade-up"
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <Map size={48} className="text-primary mx-auto" />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">
                  GPS Tracking
                </h4>
                <p className="text-gray-600mt-2">
                  Track waste collection vehicles and optimize routes.
                </p>
              </div>

              <div
                data-aos="fade-up"
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <Timer size={48} className="text-primary mx-auto" />
                <h4 className="text-xl font-semibold text-gray-800 mt-4">
                  Scheduled Collection
                </h4>
                <p className="text-gray-600 mt-2">
                  Automate waste pickup scheduling for better efficiency.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gray-100">
            <h3
              data-aos="fade-up"
              className="text-3xl text-center font-semibold text-gray-900 mb-10"
            >
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 sm:px-6 lg:px-8">
              <div
                data-aos="fade-right"
                className="flex space-x-4 items-center"
              >
                <CheckCircle size={40} className="text-primary" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Install Smart Sensors
                  </h4>
                  <p className="text-gray-600">
                    Each bin is equipped with IoT sensors to detect waste
                    levels.
                  </p>
                </div>
              </div>

              <div data-aos="fade-left" className="flex space-x-4 items-center">
                <RefreshCw size={40} className="text-primary" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Optimize Collection Routes
                  </h4>
                  <p className="text-gray-600">
                    AI-powered route planning reduces collection costs.
                  </p>
                </div>
              </div>

              <div
                data-aos="fade-right"
                className="flex space-x-4 items-center"
              >
                <Bell size={40} className="text-primary" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Receive Alerts
                  </h4>
                  <p className="text-gray-600">
                    Get notified when bins are full or need maintenance.
                  </p>
                </div>
              </div>

              <div data-aos="fade-left" className="flex space-x-4 items-center">
                <Leaf size={40} className="text-primary" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">
                    Support Sustainability
                  </h4>
                  <p className="text-gray-600">
                    Encourage recycling and reduce environmental impact.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Call-to-Action Section */}
          <section id="cta" className="bg-primary py-12 text-center text-white">
            <h2 data-aos="flip-up" className="text-3xl font-semibold mb-4">
              Ready to Make a Difference?
            </h2>
            <p data-aos="fade-up" className="text-lg mb-6">
              Join us today and start optimizing waste management in your
              community.
            </p>
            <Link
              href="/signin"
              data-aos="zoom-in"
              className="bg-white border border-white text-red-400 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all"
            >
              Get Started
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 py-6 text-white text-center">
          <p>
            &copy; {new Date().getFullYear()} Smart Waste Management. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
