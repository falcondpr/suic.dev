import { create } from "zustand";

interface DateStore {
  date: Date;
  setDate: (value: Date) => void;
}

export const dateStore = create<DateStore>()((set) => ({
  date: new Date(),
  setDate: (value: Date) => set(() => ({ date: value })),
}));
