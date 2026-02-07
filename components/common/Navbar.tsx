import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Menu, X, BarChart3 } from "lucide-react";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { supabase } from "@/supabase/superbase-client";
import { useToast } from "@/components/common/ToastProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, loading } = useSupabaseUser();
  const { showToast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    await router.push("/");
    showToast("Signed out successfully.", "success");
  };

  const avatarUrl =
    typeof user?.user_metadata?.avatar_url === "string"
      ? user.user_metadata.avatar_url
      : null;
  const displayEmail = user?.email ?? "";
  const displayName =
    typeof user?.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : typeof user?.user_metadata?.name === "string"
        ? user.user_metadata.name
        : "";
  const initialsSource = displayName || displayEmail || "User";
  const initials =
    initialsSource
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "U";
  const initialsBg = useMemo(() => {
    if (!initialsSource) return "bg-gray-200 text-gray-600";
    const colors = [
      "bg-rose-200 text-rose-700",
      "bg-amber-200 text-amber-700",
      "bg-emerald-200 text-emerald-700",
      "bg-sky-200 text-sky-700",
      "bg-indigo-200 text-indigo-700",
      "bg-fuchsia-200 text-fuchsia-700",
    ];
    let hash = 0;
    for (let i = 0; i < initialsSource.length; i += 1) {
      hash = initialsSource.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }, [initialsSource]);

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
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
          {router.pathname === "/dashboard" ? null : (
            <>
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
              <Link
                href="/solutions"
                className="hover:text-blue-600 transition"
              >
                Solutions
              </Link>
            </>
          )}
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? null : user ? (
            <>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-600">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${initialsBg}`}
                  >
                    {initials}
                  </div>
                )}
                <span className="max-w-[160px] truncate">{displayEmail}</span>
              </div>
              {router.pathname === "/dashboard" ? (
                <Link
                  href="/"
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                >
                  Back to Landing
                </Link>
              ) : (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </>
          )}
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
          {router.pathname === "/dashboard" ? null : (
            <>
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
            </>
          )}

          <div className="flex gap-3 mt-3">
            {loading ? null : user ? (
              <>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="User avatar"
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${initialsBg}`}
                    >
                      {initials}
                    </div>
                  )}
                  <span className="max-w-[160px] truncate">{displayEmail}</span>
                </div>
                {router.pathname === "/dashboard" ? (
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-100"
                  >
                    Back to Landing
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  onClick={async () => {
                    await handleLogout();
                    setOpen(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
