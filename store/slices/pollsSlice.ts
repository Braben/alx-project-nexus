import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { pollsApi } from "@/constants/pollsAPI";
import { Poll } from "@/interfaces/poll";

interface PollState {
  items: Poll[];
  loading: boolean;
  error: string | null;
  filter: "All" | "Live" | "Draft" | "Ended";
  search: string;
}

const initialState: PollState = {
  items: [],
  loading: false,

  error: null,
  filter: "All",
  search: "",
};

export const fetchPolls = createAsyncThunk("polls/fetchAll", async () => {
  return await pollsApi.getPolls();
});

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
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPolls.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch polls";
      });
  },
});

export const { setFilter, setSearch, addPoll } = pollsSlice.actions;

export default pollsSlice.reducer;
