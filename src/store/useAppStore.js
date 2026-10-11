import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      streak: 0,
      lastDoneDate: null,
      history: [],
      favorites: [],

      completeIdea: (ideaId) => {
        const today = new Date().toISOString().slice(0, 10);
        const { lastDoneDate, streak } = get();
        let newStreak = streak;

        if (lastDoneDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          newStreak = lastDoneDate === yesterday ? streak + 1 : 1;
        }

        set({
          streak: newStreak,
          lastDoneDate: today,
          history: [
            { ideaId, date: new Date().toISOString() },
            ...get().history,
          ].slice(0, 200),
        });
      },

      toggleFavorite: (ideaId) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(ideaId)
            ? favorites.filter((id) => id !== ideaId)
            : [...favorites, ideaId],
        });
      },

      resetAll: () =>
        set({ streak: 0, lastDoneDate: null, history: [], favorites: [] }),
    }),
    { name: "vdvoem-app" }
  )
);