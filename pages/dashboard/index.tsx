import Sidebar from "@/components/dashboard/SideBar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PollCard from "@/components/dashboard/PollCard";

export default function DashboardPage() {
  const polls = [
    {
      id: "1",
      title: "Product Roadmap Q4 Priorities",
      status: "Live",
      responses: 142,
      metric: "85%",
      metricLabel: "Completion",
    },
    {
      id: "2",
      title: "Weekly Team Retro",
      status: "Draft",
      responses: 0,
      metric: "--",
      metricLabel: "Completion",
    },
    {
      id: "3",
      title: "Workshop Feedback Survey",
      status: "Ended",
      responses: 89,
      metric: "4.8",
      metricLabel: "Avg Rating",
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <DashboardHeader />

        {/* Tabs */}
        <div className="flex gap-3 mb-6 text-sm">
          {["All Polls", "Live", "Drafts", "Archived"].map((tab) => (
            <button
              key={tab}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-600"
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Poll Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} {...poll} />
          ))}
        </div>
      </main>
    </div>
  );
}
