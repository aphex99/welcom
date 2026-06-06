import { createContext } from "react";

interface RouterContextI {
  currentPath: string;
  navigate: (path: string) => void;
}

export const RouterContext = createContext<RouterContextI | null>(null);
