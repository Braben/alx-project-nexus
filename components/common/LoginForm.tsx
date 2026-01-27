import { FormEvent, useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setEmail(email);
      setPassword(password);
      setRemember(remember);
      setLoading(true);

      // 👉 Replace with your auth logic (Firebase / API / Redux)
      console.log({ email, password, remember });

      await new Promise((r) => setTimeout(r, 1000));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  return (
    <section
      className="w-full max-w-md bg-white rounded-2xl shadow-sm  p-8"
      aria-label="Login form"
    >
      {/* Logo */}
      {/* <div className="flex justify-center mb-6">
        <div className="w-10 h-10 bg-teal-600 rounded-md" />
      </div> */}

      {/* Heading */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your credentials to access your polls
        </p>
      </header>

      {/* Google */}

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full border rounded-lg py-3 font-medium hover:bg-gray-200 border-gray-300 transition"
        aria-label="Sign up with Google"
      >
        <FcGoogle className="inline-block w-6 h-6 mr-3 align-middle" />
        Continue with Google
      </button>
      {/* Divider */}
      <div className="my-6 flex items-center text-xs text-gray-400">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="px-3">OR CONTINUE WITH EMAIL</span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="olivia@example.com"
            className="w-full border rounded-lg px-3 py-2 focus:ring-1 border-gray-300 focus:ring-gray-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            onChange={() => setPassword("")}
            className="w-full border rounded-lg px-3 py-2 focus:ring-1 border-gray-300 focus:ring-gray-500 focus:outline-none"
          />
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="accent-teal-600"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password"
            className="text-purple-600 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-purple-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
}
