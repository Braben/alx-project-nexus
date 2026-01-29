import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6 hidden md:flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg mb-8">
          <BarChart3 className="text-blue-600" />
          PulsePoll
        </div>

        {/* MAIN */}
        <p className="text-xs text-gray-400 mb-3">MAIN</p>
        <nav className="flex flex-col gap-2 mb-8">
          <Link
            href="/dashboard"
            className="bg-blue-50 text-blue-600 px-3 py-2 rounded-lg font-medium"
          >
            My Polls
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            Audience
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            Analytics
          </Link>
        </nav>

        {/* SETTINGS */}
        <p className="text-xs text-gray-400 mb-3">SETTINGS</p>
        <nav className="flex flex-col gap-2">
          <Link
            href="#"
            className="px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            Preferences
          </Link>
          <Link
            href="#"
            className="px-3 py-2 text-gray-600 hover:text-blue-600"
          >
            Billing
          </Link>
        </nav>
      </div>

      {/* Profile */}
      <div className="border-t pt-4 text-sm">
        <p className="font-medium">Olivia Organizer</p>
        <p className="text-gray-400">Free Plan</p>
      </div>
    </aside>
  );
}
