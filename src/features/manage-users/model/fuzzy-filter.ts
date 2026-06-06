import type { FilterFn } from "@tanstack/react-table";

export const fuzzyFilter: FilterFn<unknown> = (row, columnId, filterValue) => {
  const text = String(row.getValue(columnId)).toLowerCase();

  const search = String(filterValue).toLowerCase();

  let searchIndex = 0;

  for (const char of text) {
    if (char === search[searchIndex]) {
      searchIndex++;
    }

    if (searchIndex === search.length) {
      return true;
    }
  }

  return false;
};
