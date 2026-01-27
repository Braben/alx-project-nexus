import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { AiFillProduct } from "react-icons/ai";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 font-bold text-gray-900 mb-3">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Pulse
          </div>
          <p className="text-gray-600 pb-2">
            Real-time insights for everyone. We build tools that make audience
            engagement simple, secure and fast.
          </p>
          <p className="text-gray-600">
            Lightweight polling platform for collecting opinions and making
            quick decisions.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <AiFillProduct />
            <h4 className="font-semibold text-gray-900">Product</h4>
          </div>

          <Link href="/features" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>
          <Link
            href="/api-documentation"
            className="text-gray-600 hover:text-blue-600"
          >
            API Documentation
          </Link>
          <Link href="/solutions" className="text-gray-600 hover:text-blue-600">
            Solutions
          </Link>
          <Link href="/security" className="text-gray-600 hover:text-blue-600">
            Security
          </Link>
          <Link href="/pricing" className="text-gray-600 hover:text-blue-600">
            Pricing
          </Link>
        </div>

        {/*Company */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-900">Company</h4>
          <Link href="/about" className="text-gray-600 hover:text-blue-600">
            About Us
          </Link>
          <Link href="/carrers" className="text-gray-600 hover:text-blue-600">
            Careers
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600">
            Contact Us
          </Link>
          <Link href="/Blog" className="text-gray-600 hover:text-blue-600">
            Careers
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-gray-900">LEGAL</h4>
          <Link href="/Privacy" className="text-gray-600 hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link href="/Terms" className="text-gray-600 hover:text-blue-600">
            Terms of Service
          </Link>
          <Link href="/cookie" className="text-gray-600 hover:text-blue-600">
            Cookie Policy
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} PulsePoll. All rights reserved.
      </div>
    </footer>
  );
}
