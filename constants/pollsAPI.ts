import { Poll } from "@/interfaces/poll";

const mockPolls: Poll[] = [
  {
    id: "1",
    title: "Product Roadmap Q4 Priorities",
    responses: 142,
    completion: 85,
    status: "Live",
    createdAt: "2 days ago",
    candidates: [
      { id: "1-1", name: "Performance Improvements" },
      { id: "1-2", name: "New Integrations" },
      { id: "1-3", name: "Mobile Experience" },
    ],
  },
  {
    id: "2",
    title: "Weekly Team Retro - Oct 15",
    responses: 0,
    status: "Draft",
    createdAt: "4 hours ago",
    candidates: [
      { id: "2-1", name: "Team Morale" },
      { id: "2-2", name: "Process Improvements" },
    ],
  },
  {
    id: "3",
    title: "Workshop Feedback Survey",
    responses: 89,
    avgRating: 4.8,
    status: "Ended",
    createdAt: "Oct 01, 2023",
    candidates: [
      { id: "3-1", name: "Excellent" },
      { id: "3-2", name: "Good" },
      { id: "3-3", name: "Needs Work" },
    ],
  },
  {
    id: "4",
    title: "Product Feedback Survey",
    responses: 120,
    avgRating: 4.5,
    status: "Archived",
    createdAt: "Oct 01, 2023",
    candidates: [
      { id: "4-1", name: "Ease of Use" },
      { id: "4-2", name: "Feature Set" },
      { id: "4-3", name: "Support" },
    ],
  },
];

// simulate server delay
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const pollsApi = {
  async getPolls(): Promise<Poll[]> {
    await sleep(600);
    return mockPolls;
  },

  async getPoll(id: string) {
    await sleep(300);
    return mockPolls.find((p) => p.id === id);
  },
};
