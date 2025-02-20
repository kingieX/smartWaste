"use client";

import { JSX, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <>
      {/* Header */}
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto mt-20">
        <h2
          data-aos="fade-up"
          className="text-4xl font-bold text-primary text-center"
        >
          Contact Us
        </h2>
        <p
          data-aos="fade-up"
          className="text-lg text-gray-600 text-center mt-4"
        >
          Have questions? Reach out to us!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div data-aos="fade-right" className="space-y-6">
            <ContactInfo
              icon={<Mail size={32} />}
              title="Email"
              detail="support@smartwaste.com"
            />
            <ContactInfo
              icon={<Phone size={32} />}
              title="Phone"
              detail="+234 (903) 456-7890"
            />
            <ContactInfo
              icon={<MapPin size={32} />}
              title="Location"
              detail="123 Green St, Abakaliki, Ebonyi State, Nigeria"
            />
          </div>

          <form
            data-aos="fade-left"
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              Send a Message
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full mt-3 p-3 border rounded-lg"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full mt-3 p-3 border rounded-lg"
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full mt-3 p-3 border rounded-lg"
              rows={4}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 mt-4 rounded-lg hover:bg-opacity-80 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// Contact Info Component
function ContactInfo({
  icon,
  title,
  detail,
}: {
  icon: JSX.Element;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-primary">{icon}</div>
      <div>
        <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
        <p className="text-gray-600">{detail}</p>
      </div>
    </div>
  );
}
