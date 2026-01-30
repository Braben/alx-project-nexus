export type PollStatus = "Live" | "Draft" | "Ended";

export interface Poll {
  id: string;
  title: string;
  status: PollStatus;

  responses: number;

  completion?: number;
  avgRating?: number;

  metric?: string;
  metricLabel?: string;

  createdAt?: string;
}
