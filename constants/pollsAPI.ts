import { Poll } from "@/interfaces/poll";
import { supabase } from "@/supabase/superbase-client";

type PollRow = {
  id: string;
  owner_id: string | null;
  title: string;
  status: Poll["status"];
  category: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  visibility: "instant" | "hidden" | null;
  election_mode: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  poll_options?: {
    id: string;
    label: string;
    affiliation: string | null;
    sort_order: number | null;
  }[];
};

type PollCountRow = {
  poll_id: string;
  option_id: string;
  votes: number;
};

const mapPoll = (row: PollRow): Poll => {
  const candidates =
    row.poll_options
      ?.slice()
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((option) => ({
        id: option.id,
        name: option.label,
        affiliation: option.affiliation ?? undefined,
      })) ?? [];

  return {
    id: row.id,
    ownerId: row.owner_id ?? undefined,
    title: row.title,
    status: row.status,
    responses: 0,
    category: row.category ?? undefined,
    description: row.description ?? undefined,
    startDate: row.start_date ?? undefined,
    endDate: row.end_date ?? undefined,
    visibility: row.visibility ?? "instant",
    electionMode: row.election_mode ?? true,
    candidates,
    createdAt: row.created_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
  };
};

export const pollsApi = {
  async getPolls(): Promise<Poll[]> {
    const { data, error } = await supabase
      .from("polls")
      .select(
        "id, owner_id, title, status, category, description, start_date, end_date, visibility, election_mode, created_at, updated_at, poll_options(id, label, affiliation, sort_order)",
      )
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data as PollRow[]).map(mapPoll);
  },

  async getUserPolls(ownerId: string): Promise<Poll[]> {
    const { data, error } = await supabase
      .from("polls")
      .select(
        "id, owner_id, title, status, category, description, start_date, end_date, visibility, election_mode, created_at, updated_at, poll_options(id, label, affiliation, sort_order)",
      )
      .eq("owner_id", ownerId)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data as PollRow[]).map(mapPoll);
  },

  async getPoll(id: string): Promise<Poll | null> {
    const { data, error } = await supabase
      .from("polls")
      .select(
        "id, owner_id, title, status, category, description, start_date, end_date, visibility, election_mode, created_at, updated_at, poll_options(id, label, affiliation, sort_order)",
      )
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) return null;
    return mapPoll(data as PollRow);
  },

  async getPollCounts(pollIds: string[]): Promise<PollCountRow[]> {
    if (!pollIds.length) return [];
    const { data, error } = await supabase.rpc("get_poll_counts", {
      poll_ids: pollIds,
    });

    if (error) {
      throw new Error(error.message);
    }

    return (data as PollCountRow[]) ?? [];
  },
};
