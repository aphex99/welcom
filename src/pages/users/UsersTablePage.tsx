import { SyncLoader } from "react-spinners";

import { useThemeStore } from "@/app/providers/theme/store";

import UsersTableWrapper from "@/features/manage-users/ui/UsersTableWrapper";

import { useGetUsers } from "@/entities/user/api/useGetUsers";

import SkeletonTable from "@/shared/ui//skeletons/SkeletonTable";

const UsersTablePage = () => {
  const { response, isPending, isFetching, refetch } = useGetUsers();
  const isEmpty = !response?.users.length;

  const theme = useThemeStore((state) => state.theme);

  if (isPending) return <SkeletonTable count={7} gap={5} lineHeight={30} />;

  if (isEmpty) {
    return (
      <div className={"flex justify-center items-center h-full"}>
        <h1 className={"text-4xl"}>Data is empty...</h1>
      </div>
    );
  }

  return (
    <div className={"px-10 flex justify-center relative"}>
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
      <div className={"flex flex-col items-end"}>
        <button
          className={
            "border border-zinc-500 px-6 py-2 rounded-sm mb-4 disabled:text-gray-400" +
            " disabled:border-zinc-200"
          }
          type={"button"}
          disabled={isFetching}
          onClick={() => refetch()}
        >
          refresh
        </button>
        <UsersTableWrapper users={response.users} />
      </div>
    </div>
  );
};

export default UsersTablePage;
