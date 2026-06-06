import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useQuery } from "@tanstack/react-query";

import { fetchUsers } from "@/entities/user/api/usersApi";
import { mapUsersResponse } from "@/entities/user/mappers";
import type { UsersResponseViewModelI } from "@/entities/user/user-types";

interface UseGetUsersReturnI {
  response: UsersResponseViewModelI | undefined;
  isPending: boolean;
  isFetching: boolean;
  refetch: () => void;
}

export function useGetUsers(): UseGetUsersReturnI {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    select: mapUsersResponse,
  });
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (query.isError) showBoundary(query.error);
  }, [query.isError]);

  return {
    response: query.data,
    isFetching: query.isFetching,
    isPending: query.isPending,
    refetch: query.refetch,
  };
}
