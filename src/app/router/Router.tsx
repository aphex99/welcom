import {
    type ElementType,
    type MouseEvent,
    type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { RouterContext } from "@/app/providers/routerContext";

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

export function Route({
    path,
    component: Component,
}: {
    path: string;
    component: ElementType;
}) {
    const { currentPath } = useContext(RouterContext);
    return currentPath === path ? <Component /> : null;
}

export function Link({ to, children }: { to: string; children: ReactNode }) {
    const { navigate } = useContext(RouterContext);

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
