import type { ReactNode } from "react";

interface AppLayoutI {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutI) => {
  return (
    <main className={"flex flex-col max-w-360 items-center mx-auto"}>
      {children}
    </main>
  );
};

export default AppLayout;
