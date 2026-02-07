import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { pollsApi } from "@/constants/pollsAPI";
import { Poll } from "@/interfaces/poll";

interface PollState {
  items: Poll[];
  loading: boolean;
  error: string | null;
  filter: "All" | "Live" | "Draft" | "Archived" | "Ended";
  search: string;
  votesByPoll: Record<string, number[]>;
}

const initialState: PollState = {
  items: [],
  loading: false,

  error: null,
  filter: "All",
  search: "",
  votesByPoll: {},
};

type FetchPollsArgs = { ownerId?: string } | undefined;

export const fetchPolls = createAsyncThunk(
  "polls/fetchAll",
  async (args: FetchPollsArgs, { dispatch }) => {
    const polls = args?.ownerId
      ? await pollsApi.getUserPolls(args.ownerId)
      : await pollsApi.getPolls();
    const counts = await pollsApi.getPollCounts(polls.map((poll) => poll.id));

    const countsByPoll = counts.reduce<Record<string, Record<string, number>>>(
      (acc, row) => {
        acc[row.poll_id] = acc[row.poll_id] ?? {};
        acc[row.poll_id][row.option_id] = row.votes;
        return acc;
      },
      {},
    );

    polls.forEach((poll) => {
      const optionCounts = poll.candidates?.map(
        (candidate) => countsByPoll[poll.id]?.[candidate.id] ?? 0,
      );
      dispatch(
        setVoteCounts({
          pollId: poll.id,
          counts: optionCounts ?? [],
        }),
      );
    });

    return polls;
  },
);

const pollsSlice = createSlice({
  name: "polls",
  initialState,

  reducers: {
    // ADD THESE
    setFilter: (state, action: PayloadAction<PollState["filter"]>) => {
      state.filter = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    addPoll: (state, action: PayloadAction<Poll>) => {
      state.items.push(action.payload);
    },
    removePoll: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((poll) => poll.id !== action.payload);
      delete state.votesByPoll[action.payload];
    },
    updatePoll: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Poll> }>,
    ) => {
      const poll = state.items.find((item) => item.id === action.payload.id);
      if (!poll) return;
      Object.assign(poll, action.payload.changes);
    },

    setVoteCounts: (
      state,
      action: PayloadAction<{ pollId: string; counts: number[] }>,
    ) => {
      state.votesByPoll[action.payload.pollId] = action.payload.counts;
      const poll = state.items.find((item) => item.id === action.payload.pollId);
      if (poll) {
        poll.responses = action.payload.counts.reduce(
          (sum, count) => sum + count,
          0,
        );
      }
    },

    incrementVote: (
      state,
      action: PayloadAction<{ pollId: string; index: number }>,
    ) => {
      const existing = state.votesByPoll[action.payload.pollId] ?? [];
      const next = Array.from(
        { length: Math.max(existing.length, action.payload.index + 1) },
        (_, idx) => existing[idx] ?? 0,
      ).map((count, idx) =>
        idx === action.payload.index ? count + 1 : count,
      );
      state.votesByPoll[action.payload.pollId] = next;
      const poll = state.items.find((item) => item.id === action.payload.pollId);
      if (poll) {
        poll.responses = next.reduce((sum, count) => sum + count, 0);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.items.forEach((poll) => {
          const counts = state.votesByPoll[poll.id];
          if (counts && counts.length > 0) {
            poll.responses = counts.reduce((sum, count) => sum + count, 0);
          }
        });
      })
      .addCase(fetchPolls.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch polls";
      });
  },
});

export const {
  setFilter,
  setSearch,
  addPoll,
  removePoll,
  updatePoll,
  setVoteCounts,
  incrementVote,
} = pollsSlice.actions;

export default pollsSlice.reducer;
