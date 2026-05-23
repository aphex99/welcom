import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { usersColumns } from "@/features/users-management/columns";

import type { UserFilteredI } from "@/entities/user/userTypes";

interface UsersTableI {
    users: UserFilteredI[];
    pageSize: number;
}

const UsersTable = ({ users, pageSize }: UsersTableI) => {
    const table = useReactTable({
        data: users,
        columns: usersColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

    return (
        <div className={"max-w-360 flex flex-col justify-between"}>
            <div className={"min-h-74"}>
                <table className={"m-auto w-full table-fixed"}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className={"bg-gray-300"}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        style={{
                                            width: `${header.getSize()}px`,
                                        }}
                                        className={
                                            "py-2 last:pr-5 text-left text-gray-800"
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className={
                                    "border border-stone-300 even:bg-gray-100"
                                }
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={
                                            "py-1 pr-6 first:pl-3 first:text-gray-400" +
                                            " text-left truncate overflow-hidden whitespace-nowrap"
                                        }
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={"flex justify-center gap-10"}>
                <button
                    className={"disabled:text-gray-400"}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    prev
                </button>
                <button
                    className={"disabled:text-gray-400"}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    next
                </button>
            </div>
        </div>
    );
};

export default UsersTable;
