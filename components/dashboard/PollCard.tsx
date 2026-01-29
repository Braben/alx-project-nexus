import Link from "next/link";

interface PollCardProps {
  id: string;
  title: string;
  status: "Live" | "Draft" | "Ended";
  responses: number;
  metric: string;
  metricLabel: string;
}

export default function PollCard({
  id,
  title,
  status,
  responses,
  metric,
  metricLabel,
}: PollCardProps) {
  const statusColor = {
    Live: "bg-green-100 text-green-600",
    Draft: "bg-blue-100 text-blue-600",
    Ended: "bg-gray-200 text-gray-600",
  }[status];

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
          <p className="font-bold text-lg">{metric}</p>
          <p className="text-gray-400">{metricLabel}</p>
        </div>
      </div>

      <Link
        href={`/polls/${id}`}
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        View →
      </Link>
    </div>
  );
}
