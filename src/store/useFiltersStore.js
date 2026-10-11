import { create } from "zustand";

export const useFiltersStore = create((set) => ({
  time: "any",
  budget: "any",
  mood: "any",
  category: "any",

  setFilter: (key, value) => set({ [key]: value }),
  resetFilters: () => set({ time: "any", budget: "any", mood: "any", category: "any" }),
}));