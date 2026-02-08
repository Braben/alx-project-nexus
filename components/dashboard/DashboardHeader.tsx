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
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold">My Polls</h1>
        <p className="text-sm text-gray-500">
          Manage your active discussions and archived results.
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {/* <input
        type="text"
        placeholder="Search polls by title..."
        className="border rounded-lg px-3 py-2 text-sm w-64"
      /> */}

        <button
          className={`w-full rounded-lg px-4 py-2 text-white sm:w-auto ${
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
