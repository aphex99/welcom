import { createColumnHelper } from "@tanstack/react-table";

import type { UsersViewModelI } from "@/entities/user/user-types";

const columnHelper = createColumnHelper<UsersViewModelI>();

export const usersColumns = [
  columnHelper.accessor("id", {
    header: undefined,
    cell: (info) => parseInt(info.row.id) + 1,
    enableSorting: false,
    size: 50,
  }),
  columnHelper.accessor("username", {
    header: "Username",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
    size: 260,
  }),
  columnHelper.accessor("age", {
    header: "Age",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => info.getValue(),
  }),
];
