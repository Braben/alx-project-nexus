import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FormEvent, useState } from "react";

export default function SignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 👉 Replace with your auth logic (Firebase / API / Redux)
      console.log({ email, password, remember });
      console.log("Signup form submitted");

      await new Promise((r) => setTimeout(r, 1000));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
  };
  return (
    <section className="flex items-center justify-center px-6 py-12  bg-white">
      <div className="w-full max-w-sm">
        {/* Heading */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Enter your email below to create your account
          </p>
        </header>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border rounded-lg py-3 font-medium hover:bg-gray-200 border-gray-300 transition"
          aria-label="Sign up with Google"
        >
          <FcGoogle className="inline-block w-6 h-6 mr-3 align-middle" />
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center text-xs text-gray-400">
          <span className="flex-1 h-px bg-gray-200" />
          <span className="px-3">OR CONTINUE WITH</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form
          className="space-y-5"
          aria-label="Signup form"
          onSubmit={handleSubmit}
        >
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
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 border-gray-300 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="accent-teal-600" />
            Remember me for 30 days
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Create account
          </button>
        </form>

        {/* Terms */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="text-teal-600 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-teal-600 underline">
            Privacy Policy
          </Link>
          .
        </p>

        {/* Sign in */}
        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
