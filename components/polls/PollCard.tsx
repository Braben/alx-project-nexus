import React from "react";
import Link from "next/link";
import { PollProps } from "@/interfaces/poll";
import { BarChart3 } from "lucide-react";

interface Props {
  poll: PollProps;
}

export default function PollCard({ poll }: Props) {
  const statusColor =
    poll.status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-200 text-gray-600";

  return (
    <Link
      href={`/polls/${poll.id}`}
      className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition block"
    >
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}
        >
          {poll.status}
        </span>

        <BarChart3 size={18} className="text-gray-400" />
      </div>

      {/* question */}
      <h3 className="font-semibold mb-2 line-clamp-2">{poll.question}</h3>

      {/* meta */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>{poll.totalVotes} votes</p>
        <p>Created {new Date(poll.createdAt).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
