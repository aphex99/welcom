import { Link } from "@/app/router/Router";

import Switcher from "@/shared/ui/switcher/Switcher";

const Header = () => {
  return (
    <div className={"flex justify-between w-full px-10"}>
      <div className={"flex justify-center items-center h-16 gap-10 underline"}>
        <Link to={"/home"}>home</Link>
        <Link to={"/users"}>users</Link>
      </div>
      <Switcher />
    </div>
  );
};

export default Header;
