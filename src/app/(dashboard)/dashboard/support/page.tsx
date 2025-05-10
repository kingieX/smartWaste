"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I report a full or damaged bin?",
    answer:
      'Go to the Ticketing System page and click "Create Ticket" to report an issue.',
  },
  {
    question: "How can I update my route as a collector?",
    answer:
      "Collectors are assigned routes by admins. Please contact an admin if your route has changed.",
  },
  {
    question: "What should I do if I cannot access my dashboard?",
    answer:
      "Ensure you are logged in with the correct credentials. If the issue persists, contact support.",
  },
];

export default function SupportHelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Support & Help Center</h1>
      <p className="text-sm text-gray-600 max-w-2xl">
        Find answers to common questions or reach out to support for help.
      </p>

      {/* FAQ Section */}
      <div className="bg-white shadow rounded p-6 max-w-2xl space-y-4">
        <h2 className="text-lg font-semibold mb-2">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div key={index} className="border-b py-2">
            <button
              className="w-full text-left font-medium text-blue-700"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <p className="mt-2 text-sm text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-white shadow rounded p-6 max-w-2xl space-y-4">
        <h2 className="text-lg font-semibold mb-2">Still need help?</h2>
        <p className="text-sm text-gray-600">Reach out to our support team:</p>
        <ul className="text-sm text-gray-700 list-disc list-inside">
          <li>
            Email:{" "}
            <a href="mailto:support@smartbin.com" className="text-blue-600">
              support@smartbin.com
            </a>
          </li>
          <li>Phone: +234 801 234 5678</li>
          <li>Live chat: Coming soon</li>
        </ul>
      </div>
    </div>
  );
}
