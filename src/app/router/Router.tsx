import {
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import { RouterContext } from "@/app/providers/routerContext";
import { useRouter } from "@/app/router/useRouter";

interface RouteI {
  exact: boolean;
  path: string;
  element: ReactElement;
}

export function Router({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function Route({ path, element, exact }: RouteI) {
  const { currentPath } = useRouter();

  const isMatch = exact ? currentPath === path : currentPath.startsWith(path);
  return isMatch ? element : null;
}

export function Link({ to, children }: { to: string; children: ReactNode }) {
  const { navigate } = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey) return;

    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
