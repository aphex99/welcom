import { useEffect } from "react";
import { SyncLoader } from "react-spinners";

import { PAGE_SIZE } from "@/pages/users/consts";
import { useGetUsers } from "@/pages/users/useGetUsers";

import UsersTable from "@/features/users-management/UsersTable";

import SkeletonTable from "@/shared/ui//skeletons/SkeletonTable";

const UsersTablePage = () => {
    const { users, getUsers, isLoading, isDataEmpty, isInitialLoading } =
        useGetUsers();

    useEffect(() => {
        getUsers().finally();
    }, []);

    if (isInitialLoading)
        return (
            <SkeletonTable
                count={PAGE_SIZE}
                gap={5}
                lineHeight={30}
                lineWidth={1440}
            />
        );

    if (isDataEmpty) {
        return (
            <div className={"flex justify-center items-center h-screen"}>
                <h1 className={"text-4xl"}>Data is empty...</h1>
            </div>
        );
    }
    return (
        <div className={"mt-20 px-10 flex justify-center relative"}>
            {isLoading && (
                <SyncLoader
                    color={"#494949"}
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
                    disabled={isLoading}
                    onClick={() => {
                        getUsers().finally();
                    }}
                >
                    refresh
                </button>
                <UsersTable users={users} pageSize={PAGE_SIZE} />
            </div>
        </div>
    );
};

export default UsersTablePage;
