import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "signal" | "static";

function migrateMode(raw: unknown): ThemeMode {
  if (raw === "funky" || raw === "signal") return "signal";
  if (raw === "chic" || raw === "static") return "static";
  return "signal";
}

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "signal",
      setMode: (mode) => {
        set({ mode });
        document.documentElement.setAttribute("data-theme", mode);
      },
      toggle: () => {
        const next = get().mode === "signal" ? "static" : "signal";
        set({ mode: next });
        document.documentElement.setAttribute("data-theme", next);
      },
    }),
    {
      name: "altinstinct-theme-mode",
      onRehydrateStorage: () => (state) => {
        if (state) {
          const migrated = migrateMode(state.mode);
          state.mode = migrated;
          document.documentElement.setAttribute("data-theme", migrated);
        }
      },
    },
  ),
);
