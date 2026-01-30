import { useEffect } from "react";

import Sidebar from "@/components/dashboard/SideBar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PollCard from "@/components/dashboard/PollCard";
import PollFilters from "@/components/dashboard/PollFilters";

import { fetchPolls } from "@/store/slices/pollsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  // ✅ SINGLE selector (safe)
  const {
    items = [],
    loading,
    filter,
    search,
  } = useAppSelector((state) => state.polls);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchPolls());
    }
  }, [dispatch, items.length]);

  if (loading) return <p>Loading polls...</p>;

  // ✅ safe because items defaults to []
  const filteredPolls = items.filter((poll) => {
    const matchesFilter = filter === "All" || poll.status === filter;

    const matchesSearch = poll.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <DashboardHeader />
        <PollFilters />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => {
            console.log("Rendering poll:", poll);
            return <PollCard key={poll.id} {...poll} />;
          })}
        </div>
      </main>
    </div>
  );
}
