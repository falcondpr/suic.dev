import { create } from "zustand";

interface DateStore {
  activeView: string;
  setActiveView: (value: string) => void;
}

const getInitialView = () => {
  const storedData = localStorage.getItem("viewStore");
  if (storedData) {
    const { activeView } = JSON.parse(storedData);
    return activeView;
  }

  return "calendar";
};

export const viewStore = create<DateStore>()((set) => ({
  activeView: getInitialView(),
  setActiveView: (view: string) => {
    const newData = { ...getStoredData(), activeView: view };
    localStorage.setItem("viewStore", JSON.stringify(newData));
    set(() => ({ activeView: view }));
  },
}));

const getStoredData = () => {
  const storedData = localStorage.getItem("viewStore");
  return storedData ? JSON.parse(storedData) : {};
};
