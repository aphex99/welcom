import { SyncLoader } from "react-spinners";

import { useThemeStore } from "@/app/providers/theme/store";

import { useGetSingleUser } from "@/entities/user/api/useGetSIngleUser";

interface TableSidebarI {
  userId: number;
  openCloseSidebar: (userInfo: null) => void;
}

const TableSidebar = ({ userId, openCloseSidebar }: TableSidebarI) => {
  const theme = useThemeStore((state) => state.theme);
  const { response, isFetching } = useGetSingleUser({ id: userId });

  function onCloseSidebar() {
    openCloseSidebar(null);
  }

  return (
    <div
      className={
        "h-screen w-1/3 fixed top-0 right-0 bg-theme-bg border border-theme-border flex flex-col items-start gap-10 p-10 rounded-s"
      }
    >
      {isFetching && (
        <SyncLoader
          color={theme === "dark" ? "#ececec" : "#494949"}
          cssOverride={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      <button
        className={"underline text-red-400 cursor-pointer"}
        type={"button"}
        onClick={onCloseSidebar}
      >
        Close
      </button>
      <p>Some additional information bout this user:</p>
      {response ? (
        <ul>
          <li>username: {response.username}</li>
          <li>email: {response.email}</li>
          <li>age: {response.age}</li>
          <li>gender: {response.gender}</li>
        </ul>
      ) : !isFetching ? (
        <div>
          <h1>Data is empty...</h1>
        </div>
      ) : null}
    </div>
  );
};

export default TableSidebar;
