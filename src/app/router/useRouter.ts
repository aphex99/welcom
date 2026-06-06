import { useContext } from "react";

import { RouterContext } from "@/app/providers/routerContext";

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("The router context outside provider");
  }
  return context;
};
