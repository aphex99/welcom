import { type ReactNode, useEffect } from "react";

import { useThemeStore } from "@/app/providers/theme/store";

interface ThemeSync {
  children: ReactNode;
}

const ThemeSync = ({ children }: ThemeSync) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeSync;
