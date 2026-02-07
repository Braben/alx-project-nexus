import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/supabase/superbase-client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const schema = z.object({
    email: z.string().email("Enter a valid email."),
    password: z.string().min(6, "Password must be at least 6 characters."),
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

      const { error } = await supabase.auth.signInWithPassword({
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

      await router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    const values = getValues();
    if (!values.remember) {
      localStorage.setItem("pp-session-only", "true");
      sessionStorage.setItem("pp-session-only", "true");
    } else {
      localStorage.removeItem("pp-session-only");
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <section
      className="w-full max-w-md bg-white rounded-2xl shadow-sm  p-8"
      aria-label="Login form"
    >
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your credentials to access your polls
        </p>
      </header>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full border rounded-lg py-3 font-medium hover:bg-gray-200 border-gray-300 transition"
        aria-label="Sign up with Google"
      >
        <FcGoogle className="inline-block w-6 h-6 mr-3 align-middle" />
        Continue with Google
      </button>

      <div className="my-6 flex items-center text-xs text-gray-400">
        <span className="flex-1 h-px bg-gray-200" />
        <span className="px-3">OR CONTINUE WITH EMAIL</span>
        <span className="flex-1 h-px bg-gray-200" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              {...register("remember")}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

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
