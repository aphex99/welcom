import type { ChangeEvent } from "react";

interface SearchUsersTableI {
  value: string;
  onChangeSearch: (value: string) => void;
  resetPageIndex: (pageIndex: number) => void;
}

const SearchUsers = ({
  value,
  onChangeSearch,
  resetPageIndex,
}: SearchUsersTableI) => {
  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(e.target.value);
    resetPageIndex(0);
  };

  return (
    <input
      name="search"
      type="text"
      className={
        "w-full h-10 border border-zinc-400 bg-theme-table-bg-header mb-4 rounded-sm pl-4 outline-none"
      }
      value={value}
      onChange={onChangeSearchValue}
    />
  );
};

export default SearchUsers;
