import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "funky" | "chic";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "funky",
      setMode: (mode) => {
        set({ mode });
        document.documentElement.setAttribute("data-theme", mode);
      },
      toggle: () => {
        const next = get().mode === "funky" ? "chic" : "funky";
        set({ mode: next });
        document.documentElement.setAttribute("data-theme", next);
      },
    }),
    {
      name: "zola-theme-mode",
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute("data-theme", state.mode);
        }
      },
    },
  ),
);
