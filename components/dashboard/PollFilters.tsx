import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setFilter, setSearch } from "@/store/slices/pollsSlice";

export default function PollFilters() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.polls.filter);
  const search = useSelector((state: RootState) => state.polls.search);

  const tabs = [
    { label: "All Polls", value: "All" },
    { label: "Live", value: "Live" },
    { label: "Drafts", value: "Draft" },
    { label: "Archived", value: "Archived" },
    { label: "Ended", value: "Ended" },
  ];

  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => dispatch(setFilter(tab.value as any))}
            className={`px-3 py-1 rounded-lg text-sm ${
              filter === tab.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        placeholder="Search polls by title..."
        className="w-full rounded-lg border px-3 py-2 text-sm md:w-64"
      />
    </div>
  );
}
