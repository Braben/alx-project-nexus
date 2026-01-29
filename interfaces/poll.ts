export type PollStatusProps = "active" | "closed";

export interface PollProps {
  id: string;
  question: string;
  totalVotes: number;
  status: PollStatusProps;
  createdAt: string;
}
