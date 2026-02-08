import Link from "next/link";
import { BarChart3, Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <>
      <div className="w-full border-b bg-white px-4 py-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold">
            <BarChart3 className="text-blue-600" />
            PulsePoll
          </Link>
          <details className="relative">
            <summary className="list-none rounded-lg border px-3 py-2 text-gray-600">
              <Menu size={18} />
            </summary>
            <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white p-2 shadow-lg">
              <Link
                href="/dashboard"
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                My Polls
              </Link>
              <Link
                href="#"
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                Audience
              </Link>
              <Link
                href="#"
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                Analytics
              </Link>
              <div className="my-1 border-t" />
              <Link
                href="#"
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                Preferences
              </Link>
              <Link
                href="#"
                className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={(event) => {
                  event.currentTarget.closest("details")?.removeAttribute("open");
                }}
              >
                Billing
              </Link>
            </div>
          </details>
        </div>
      </div>

      <aside className="hidden min-h-screen w-64 flex-col justify-between border-r bg-white p-6 md:flex">
        <div>
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2 text-lg font-bold">
            <BarChart3 className="text-blue-600" />
            PulsePoll
          </div>

          {/* MAIN */}
          <p className="mb-3 text-xs text-gray-400">MAIN</p>
          <nav className="mb-8 flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-600"
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
          <p className="mb-3 text-xs text-gray-400">SETTINGS</p>
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
    </>
  );
}
