interface DashboardHeaderProps {
  onCreate: () => void;
  canCreate?: boolean;
  disabledReason?: string;
}

export default function DashboardHeader({
  onCreate,
  canCreate = true,
  disabledReason,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">My Polls</h1>
        <p className="text-gray-500 text-sm">
          Manage your active discussions and archived results.
        </p>
      </div>

      <div className="flex gap-3">
        {/* <input
        type="text"
        placeholder="Search polls by title..."
        className="border rounded-lg px-3 py-2 text-sm w-64"
      /> */}

        <button
          className={`px-4 py-2 rounded-lg text-white ${
            canCreate
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={canCreate ? onCreate : undefined}
          disabled={!canCreate}
          title={!canCreate ? disabledReason : undefined}
        >
          Create Poll
        </button>
      </div>
    </div>
  );
}
