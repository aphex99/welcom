import { Route } from "@/app/router/Router";

import HomePage from "@/pages/home/HomePage";
import UsersTablePage from "@/pages/users/UsersTablePage";

export function AppRouter() {
  return (
    <>
      <Route path={"/"} exact={true} element={<HomePage />} />
      <Route path={"/home"} exact={true} element={<HomePage />} />
      <Route path={"/users"} exact={true} element={<UsersTablePage />} />
    </>
  );
}
