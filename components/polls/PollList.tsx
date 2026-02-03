// import React from "react";
// import { PollProps } from "@/interfaces/poll";
// import PollCard from "./PollCard";

// // const mockPolls: PollProps[] = [
// //   {
// //     id: "1",
// //     question: "What feature should we build next?",
// //     totalVotes: 120,
// //     status: "active",
// //     createdAt: "2026-01-20",
// //   },
// //   {
// //     id: "2",
// //     question: "Rate today’s workshop",
// //     totalVotes: 95,
// //     status: "closed",
// //     createdAt: "2026-01-18",
// //   },
// //   {
// //     id: "3",
// //     question: "Rate today’s workshop",
// //     totalVotes: 85,
// //     status: "closed",
// //     createdAt: "2026-01-18",
// //   },
// //   {
// //     id: "4",
// //     question: "What feature should we build next?",
// //     totalVotes: 109,
// //     status: "active",
// //     createdAt: "2026-01-20",
// //   },
// // ];

// export default function PollList() {
//   return (
//     <section className="max-w-6xl mx-auto px-6 pb-16">
//       {mockPolls.length === 0 ? (
//         <p className="text-center text-gray-500 py-20">
//           No polls yet. Create your first one 🚀
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {mockPolls.map((poll) => (
//             <PollCard key={poll.id} poll={poll} />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }
import PollCard from "@/components/polls/PollCard";
import PollFilters from "@/components/dashboard/PollFilters";
import { useEffect } from "react";

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
    const isVisibleStatus = poll.status === "Live" || poll.status === "Ended";
    const matchesFilter = filter === "All" || poll.status === filter;

    const matchesSearch = poll.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return isVisibleStatus && matchesFilter && matchesSearch;
  });

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <main className="flex-1 p-8">
        <PollFilters />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolls.map((poll) => {
            // console.log("Rendering poll:", poll);
            return <PollCard key={poll.id} poll={poll} />;
          })}
        </div>
      </main>
    </div>
  );
}
