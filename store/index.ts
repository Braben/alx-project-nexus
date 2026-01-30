// import { configureStore } from "@reduxjs/toolkit";
// import pollsReducer from "./slices/pollsSlice";

// import { persistReducer, persistStore } from "redux-persist";

// import { persistConfig } from "./persist";

// const persistedReducer = persistReducer(persistConfig, pollsReducer);

// export const store = configureStore({
//   reducer: {
//     polls: persistedReducer,
//   },
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import pollsReducer from "./slices/pollsSlice";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { persistConfig } from "./persist";

const persistedReducer = persistReducer(persistConfig, pollsReducer);

export const store = configureStore({
  reducer: {
    polls: persistedReducer,
  },

  // THIS FIXES YOUR ERROR
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
