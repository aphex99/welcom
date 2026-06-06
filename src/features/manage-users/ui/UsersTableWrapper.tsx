import { useState } from "react";
import {
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useShallow } from "zustand/react/shallow";

import { usersColumns } from "@/features/manage-users/model/columns";
import { fuzzyFilter } from "@/features/manage-users/model/fuzzy-filter";
import { useUsersTableStore } from "@/features/manage-users/model/store";
import SearchUsers from "@/features/manage-users/ui/SearchUsers";
import TableSidebar from "@/features/manage-users/ui/TableSidebar";

import { prefetchSingleUser } from "@/entities/user/api/prefetchSingleUser";
import type { UsersViewModelI } from "@/entities/user/user-types";

import ArrowDown from "@/shared/assets/icons/arrow-down.svg?react";
import ArrowUp from "@/shared/assets/icons/arrow-up.svg?react";
import OpenIcon from "@/shared/assets/icons/open.svg?react";

interface UsersTableI {
  users: UsersViewModelI[];
}

const UsersTableWrapper = ({ users }: UsersTableI) => {
  const [selectedUserId, openCloseSidebar] = useState<number | null>(null);

  const {
    pageIndex,
    pageSize,
    searchValue,
    sorting,
    setPageIndex,
    setPageSize,
    setSearchValue,
    setSorting,
  } = useUsersTableStore(useShallow((state) => state));

  const table = useReactTable({
    data: users,
    columns: usersColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updaterOrValue) => {
      const newValues = functionalUpdate(updaterOrValue, {
        pageIndex,
        pageSize,
      });
      setPageIndex(newValues.pageIndex);
      setPageSize(newValues.pageSize);
    },
    onGlobalFilterChange: setSearchValue,
    onSortingChange: (updaterOrValue) => {
      const newValue = functionalUpdate(updaterOrValue, sorting);
      setSorting(newValue);
    },
    state: {
      pagination: { pageIndex, pageSize },
      globalFilter: searchValue,
      sorting,
    },
    enableMultiSort: false,
  });

  const showUserInfo = (id: number) => {
    openCloseSidebar(id);
  };

  return (
    <div className={"max-w-360 flex flex-col justify-between"}>
      {selectedUserId && (
        <TableSidebar
          userId={selectedUserId}
          openCloseSidebar={openCloseSidebar}
        />
      )}
      <SearchUsers
        value={searchValue}
        resetPageIndex={setPageIndex}
        onChangeSearch={table.setGlobalFilter}
      />
      <div className={"min-h-74 mb-5"}>
        <table className={"m-auto w-full table-fixed"}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={"bg-theme-table-bg-header"}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      width: `${header.getSize()}px`,
                    }}
                    className={" py-2 last:pr-5 text-left text-gray-800"}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className={"flex"}>
                      {header.column.getCanSort() ? (
                        header.column.getNextSortingOrder() === "asc" ? (
                          <ArrowDown className={"w-4 mr-1"} />
                        ) : header.column.getNextSortingOrder() === "desc" ? (
                          <ArrowDown className={"w-4 mr-1"} />
                        ) : (
                          <ArrowUp className={"w-4 mr-1"} />
                        )
                      ) : undefined}
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>
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
                  "border border-theme-border even:bg-theme-bg-table-even-row"
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
                    <div className={"flex"}>
                      {cell.column.id === "username" && (
                        <button
                          className={"mr-3 cursor-pointer"}
                          onMouseEnter={() =>
                            prefetchSingleUser(row.original.id)
                          }
                          onClick={() => {
                            showUserInfo(row.original.id);
                          }}
                        >
                          <OpenIcon className={"w-5"} />
                        </button>
                      )}

                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
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
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default UsersTableWrapper;
