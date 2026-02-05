import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PollCandidate } from "@/interfaces/poll";

interface CandidatesState {
  items: PollCandidate[];
}

const createCandidate = (): PollCandidate => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  name: "",
  affiliation: "",
});

const initialState: CandidatesState = {
  items: [createCandidate(), createCandidate()],
};

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<PollCandidate[]>) => {
      const incoming = action.payload ?? [];
      const normalized =
        incoming.length >= 2
          ? incoming
          : [
              ...incoming,
              ...Array.from(
                { length: 2 - incoming.length },
                createCandidate,
              ),
            ];
      state.items = normalized;
    },
    initializeCandidates: (state) => {
      if (state.items.length >= 2) return;
      const missing = 2 - state.items.length;
      state.items.push(...Array.from({ length: missing }, createCandidate));
    },
    addCandidate: (state) => {
      state.items.push(createCandidate());
    },
    updateCandidate: (
      state,
      action: PayloadAction<{
        id: string;
        field: "name" | "affiliation";
        value: string;
      }>,
    ) => {
      const candidate = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (!candidate) return;
      candidate[action.payload.field] = action.payload.value;
    },
    removeCandidate: (state, action: PayloadAction<string>) => {
      if (state.items.length <= 2) return;
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    resetCandidates: (state) => {
      state.items = [createCandidate(), createCandidate()];
    },
  },
});

export const {
  setCandidates,
  initializeCandidates,
  addCandidate,
  updateCandidate,
  removeCandidate,
  resetCandidates,
} = candidatesSlice.actions;

export default candidatesSlice.reducer;
