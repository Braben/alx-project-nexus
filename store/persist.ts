import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["polls"], // only persist polls
};

export const candidatesPersistConfig = {
  key: "candidates",
  storage,
};
