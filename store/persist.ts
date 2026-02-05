import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export const persistConfig = {
  key: "root",
  storage,
  whitelist: ["polls"], // only persist polls
};

export const candidatesPersistConfig = {
  key: "candidates",
  storage,
};
