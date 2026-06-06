import type { SortingState } from "@tanstack/react-table";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";

export interface UserInfoI {
  age: number;
  email: string;
  gender: string;
  username: string;
}

interface UsersTableStateI {
  pageIndex: number;
  pageSize: number;
  searchValue: string;
  sorting: SortingState;
}

interface UsersTableActionsI {
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchValue: (searchValue: string) => void;
  setSorting: (sortValues: SortingState) => void;
}

export const useUsersTableStore = create<
  UsersTableStateI & UsersTableActionsI
>()(
  persist(
    (set) => ({
      pageIndex: 0,
      pageSize: 7,
      searchValue: "",
      sorting: [],
      setPageIndex: (pageIndex: number) => set({ pageIndex }),
      setPageSize: (pageSize: number) => set({ pageSize }),
      setSearchValue: (searchValue) => set({ searchValue }),
      setSorting: (sorting) => set({ sorting }),
    }),
    {
      name: "users-table",
      partialize: (state) => ({
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        searchValue: state.searchValue,
        sorting: state.sorting,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
