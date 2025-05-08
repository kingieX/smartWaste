"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Recycle, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current active route

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Recycle className="mr-2 text-primary" size={32} />
            <span className="text-xl font-bold text-primary">SmartWaste</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavItem href="/" pathname={pathname} label="Home" />
            <NavItem href="/about" pathname={pathname} label="About" />
            <NavItem href="/features" pathname={pathname} label="Features" />
            <NavItem href="/contact" pathname={pathname} label="Contact" />
          </div>

          {/* Right-side Button */}
          <div className="hidden md:flex">
            <Link
              href="/auth/login"
              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-opacity-80 transition"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 left-0 w-full py-4 space-y-4">
          <NavItem href="/" pathname={pathname} label="Home" mobile />
          <NavItem href="/about" pathname={pathname} label="About" mobile />
          <NavItem
            href="/features"
            pathname={pathname}
            label="Features"
            mobile
          />
          <NavItem href="/contact" pathname={pathname} label="Contact" mobile />
          <Link
            href="/auth/login"
            className="block text-center bg-primary text-white py-2 mx-4 rounded-lg hover:bg-opacity-80 transition"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}

// Reusable NavItem Component
function NavItem({
  href,
  pathname,
  label,
  mobile = false,
}: {
  href: string;
  pathname: string;
  label: string;
  mobile?: boolean;
}) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? "text-primary font-semibold border-b-2 border-primary"
          : "text-gray-700 hover:text-primary"
      } ${mobile ? "block text-center py-2" : ""}`}
    >
      {label}
    </Link>
  );
}
