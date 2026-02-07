import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/supabase/superbase-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const schema = z.object({
    email: z.string().email("Enter a valid email."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters."),
    remember: z.boolean().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (!values.remember) {
        localStorage.setItem("pp-session-only", "true");
        sessionStorage.setItem("pp-session-only", "true");
      } else {
        localStorage.removeItem("pp-session-only");
      }

      setMessage("Check your email to confirm your account.");
      await router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    const values = getValues();
    if (!values.remember) {
      localStorage.setItem("pp-session-only", "true");
      sessionStorage.setItem("pp-session-only", "true");
    } else {
      localStorage.removeItem("pp-session-only");
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/dashboard`
            : undefined,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center px-6 py-12 bg-white">
      <div className="w-full max-w-sm">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an account
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Enter your email below to create your account
          </p>
        </header>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border rounded-lg py-3 font-medium hover:bg-gray-200 border-gray-300 transition"
          aria-label="Sign up with Google"
        >
          <FcGoogle className="inline-block w-6 h-6 mr-3 align-middle" />
          Sign up with Google
        </button>

        <div className="my-6 flex items-center text-xs text-gray-400">
          <span className="flex-1 h-px bg-gray-200" />
          <span className="px-3">OR CONTINUE WITH</span>
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <form
          className="space-y-5"
          aria-label="Signup form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
              {...register("email")}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 border-gray-300 focus:ring-gray-500 focus:outline-none"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

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
              placeholder="********"
              {...register("password")}
              className="w-full border rounded-lg px-3 py-2 focus:ring-1 border-gray-300 focus:ring-gray-500 focus:outline-none"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" className="accent-teal-600" {...register("remember")} />
            Remember me for 30 days
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}

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
