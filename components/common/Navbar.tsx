import Link from "next/link";
import { useState } from "react";
import { Menu, X, BarChart3 } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-gray-900"
        >
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Pulse
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link href="/polls" className="hover:text-blue-600 transition">
            Polls
          </Link>
          <Link href="/features" className="hover:text-blue-600 transition">
            Features
          </Link>
          <Link href="/solutions" className="hover:text-blue-600 transition">
            Solutions
          </Link>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col gap-4 pb-4 text-gray-700 font-medium border-t pt-4">
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/polls" onClick={() => setOpen(false)}>
            Polls
          </Link>
          <Link href="/features" onClick={() => setOpen(false)}>
            Features
          </Link>
          <Link href="/solutions" onClick={() => setOpen(false)}>
            Solutions
          </Link>

          <div className="flex gap-3 mt-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-gray-100"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
