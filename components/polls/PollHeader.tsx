import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function PollHeader() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Your Polls</h1>
        <p className="text-gray-500 text-sm">
          Manage and track your polls in one place
        </p>
      </div>

      <Link
        href="/polls/create"
        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition"
      >
        <Plus size={18} />
        Create Poll
      </Link>
    </section>
  );
}
