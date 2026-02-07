export type PollStatus = "Live" | "Draft" | "Ended" | "Archived";

export interface Poll {
  id: string;
  title: string;
  status: PollStatus;

  responses: number;
  ownerId?: string;

  category?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  visibility?: "instant" | "hidden";
  electionMode?: boolean;
  candidates?: PollCandidate[];

  completion?: number;
  avgRating?: number;

  metric?: string;
  metricLabel?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface PollCandidate {
  id: string;
  name: string;
  affiliation?: string;
}
