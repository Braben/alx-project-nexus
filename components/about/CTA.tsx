import React from "react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 text-center bg-teal-600 text-white px-4">
      <h2 className="text-2xl font-semibold mb-4">
        Ready to collect feedback instantly?
      </h2>

      <p className="mb-8 text-teal-100">
        Create your first poll in less than 60 seconds.
      </p>

      <Link
        href="/signup"
        className="bg-white text-teal-700 px-6 py-3 rounded-xl font-semibold hover:opacity-90"
      >
        Get Started Free
      </Link>
    </section>
  );
}
