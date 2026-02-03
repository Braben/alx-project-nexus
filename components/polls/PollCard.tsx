// import React from "react";
// import Link from "next/link";
// import { PollProps } from "@/interfaces/poll";
// import { BarChart3 } from "lucide-react";

// interface Props {
//   poll: PollProps;
// }

// export default function PollCard({ poll }: Props) {
//   const statusColor =
//     poll.status === "active"
//       ? "bg-green-100 text-green-700"
//       : "bg-gray-200 text-gray-600";

//   return (
//     <Link
//       href={`/polls/${poll.id}`}
//       className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition block"
//     >
//       {/* header */}
//       <div className="flex items-center justify-between mb-4">
//         <span
//           className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor}`}
//         >
//           {poll.status}
//         </span>

//         <BarChart3 size={18} className="text-gray-400" />
//       </div>

//       {/* question */}
//       <h3 className="font-semibold mb-2 line-clamp-2">{poll.question}</h3>

//       {/* meta */}
//       <div className="text-sm text-gray-500 space-y-1">
//         <p>{poll.totalVotes} votes</p>
//         <p>Created {new Date(poll.createdAt).toLocaleDateString()}</p>
//       </div>
//     </Link>
//   );
// }
import Link from "next/link";
import { Poll } from "@/interfaces/poll";

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  if (!poll) return null;
  const {
    id,
    title,
    status,
    responses,
    metric,
    metricLabel,
    completion,
    avgRating,
  } = poll;

  const statusColor =
    {
      Live: "bg-green-100 text-green-600",
      Draft: "bg-blue-100 text-blue-600",
      Ended: "bg-gray-200 text-gray-600",
      Archived: "bg-yellow-100 text-yellow-600",
    }[status] ?? "bg-gray-100 text-gray-600";

  const derivedMetric =
    metric ??
    (typeof completion === "number" ? `${completion}%` : undefined) ??
    (typeof avgRating === "number" ? avgRating.toFixed(1) : undefined) ??
    "-";

  const derivedMetricLabel =
    metricLabel ??
    (typeof completion === "number"
      ? "Completion"
      : typeof avgRating === "number"
        ? "Avg Rating"
        : "Metric");

  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
          {status}
        </span>
      </div>

      <div className="flex gap-8 mb-4 text-sm">
        <div>
          <p className="font-bold text-lg">{responses}</p>
          <p className="text-gray-400">Responses</p>
        </div>

        <div>
          <p className="font-bold text-lg">{derivedMetric}</p>
          <p className="text-gray-400">{derivedMetricLabel}</p>
        </div>
      </div>

      <Link
        href={`/polls/${id}`}
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}
