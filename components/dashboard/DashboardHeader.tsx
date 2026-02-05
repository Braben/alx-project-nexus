interface DashboardHeaderProps {
  onCreate: () => void;
}

export default function DashboardHeader({ onCreate }: DashboardHeaderProps) {
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={onCreate}
        >
          Create Poll
        </button>
      </div>
    </div>
  );
}
