import { persist } from "zustand/middleware";
import { create } from "zustand/react";

interface ThemeState {
  theme: "light" | "dark";
}

interface ThemeStoreAction {
  switchTheme: () => void;
}

export const useThemeStore = create<ThemeState & ThemeStoreAction>()(
  persist(
    (set, get) => ({
      theme: "light",
      switchTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    { name: "theme" },
  ),
);
