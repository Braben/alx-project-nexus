import { FaShareAlt } from "react-icons/fa";
import { Poll } from "@/interfaces/poll";

interface PollCardProps {
  poll: Poll;
  onEdit?: (poll: Poll) => void;
  onShare?: (poll: Poll) => void;
  onResults?: (poll: Poll) => void;
  onEnd?: (poll: Poll) => void;
  onDelete?: (poll: Poll) => void;
  onToggleVisibility?: (poll: Poll) => void;
  onExport?: (poll: Poll) => void;
  onView?: (poll: Poll) => void;
}

export default function PollCard({
  poll,
  onEdit,
  onShare,
  onResults,
  onEnd,
  onDelete,
  onToggleVisibility,
  onExport,
  onView,
}: PollCardProps) {
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
    updatedAt,
    createdAt,
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

  const lastEditedAt = updatedAt ?? createdAt;
  const lastEditedLabel = lastEditedAt
    ? new Date(lastEditedAt).toLocaleString()
    : null;
  const endedLabel =
    status === "Ended" && lastEditedAt
      ? new Date(lastEditedAt).toLocaleDateString()
      : null;

  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>

      {endedLabel ? (
        <p className="text-xs text-gray-500 mb-1">Ended on {endedLabel}</p>
      ) : null}

      {lastEditedLabel && status !== "Ended" ? (
        <p className="text-xs text-gray-500 mb-4">
          Last edited {lastEditedLabel}
        </p>
      ) : (
        <div className="mb-4" />
      )}

      <div className="border-y border-gray-100 py-4 flex gap-8 text-sm">
        <div>
          <p className="font-semibold text-lg text-gray-900">{responses}</p>
          <p className="text-gray-400">Responses</p>
        </div>

        <div>
          <p className="font-semibold text-lg text-gray-900">{derivedMetric}</p>
          <p className="text-gray-400">{derivedMetricLabel}</p>
        </div>
      </div>

      {(status === "Live" || status === "Ended") &&
        typeof poll.visibility !== "undefined" && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-600">
          <span>
            Results: {poll.visibility === "hidden" ? "Hidden" : "Visible"}
          </span>
          <button
            type="button"
            className="rounded-md border px-2 py-1 text-xs text-gray-600 hover:bg-white"
            onClick={() => onToggleVisibility?.(poll)}
          >
            {poll.visibility === "hidden" ? "Show" : "Hide"}
          </button>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        {status === "Live" && (
          <>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => onShare?.(poll)}
            >
              <FaShareAlt size={12} />
              Share
            </button>
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
              onClick={() => onEdit?.(poll)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
              onClick={() => onResults?.(poll)}
            >
              Results
            </button>
            <button
              type="button"
              className="text-sm font-medium text-red-500 hover:text-red-600"
              onClick={() => onEnd?.(poll)}
            >
              End Poll
            </button>
          </>
        )}

        {status === "Draft" && (
          <>
            <button
              type="button"
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700 hover:bg-blue-100"
              onClick={() => onEdit?.(poll)}
            >
              Edit Poll
            </button>
            <button
              type="button"
              className="text-sm font-medium text-red-500 hover:text-red-600"
              onClick={() => onDelete?.(poll)}
            >
              Delete
            </button>
          </>
        )}

        {status === "Ended" && (
          <>
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
              onClick={() => onEdit?.(poll)}
            >
              Edit
            </button>
            <button
              type="button"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
              onClick={() => onEnd?.(poll)}
            >
              Reopen
            </button>
            <button
              type="button"
              className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => onExport?.(poll)}
            >
              Export
            </button>
            <button
              type="button"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
              onClick={() => onResults?.(poll)}
            >
              Results
            </button>
            <button
              type="button"
              className="text-sm font-medium text-red-500 hover:text-red-600"
              onClick={() => onDelete?.(poll)}
            >
              Delete
            </button>
          </>
        )}

        {status === "Archived" && (
          <button
            type="button"
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
            onClick={() => onResults?.(poll)}
          >
            Results
          </button>
        )}
      </div>
    </div>
  );
}
