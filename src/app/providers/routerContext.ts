import { createContext } from "react";

export const RouterContext = createContext<{
    currentPath: string;
    navigate: (path: string) => void;
}>({
    currentPath: "/",
    navigate: () => {},
});
