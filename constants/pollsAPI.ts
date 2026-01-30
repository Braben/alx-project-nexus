// later you can replace this with fetch/axios without touching redux

// export type PollStatus = "Live" | "Draft" | "Ended";

// export interface Poll {
//   id: string;
//   title: string;
//   status: PollStatus;

//   responses: number;

//   completion?: number;
//   avgRating?: number;

//   metric?: string;
//   metricLabel?: string;

//   createdAt?: string;
// }
import { Poll } from "@/interfaces/poll";

const mockPolls: Poll[] = [
  {
    id: "1",
    title: "Product Roadmap Q4 Priorities",
    responses: 142,
    completion: 85,
    status: "Live",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "Weekly Team Retro - Oct 15",
    responses: 0,
    status: "Draft",
    createdAt: "4 hours ago",
  },
  {
    id: "3",
    title: "Workshop Feedback Survey",
    responses: 89,
    avgRating: 4.8,
    status: "Ended",
    createdAt: "Oct 01, 2023",
  },
  {
    id: "4",
    title: "Product Feedback Survey",
    responses: 120,
    avgRating: 4.5,
    status: "Live",
    createdAt: "Oct 01, 2023",
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
