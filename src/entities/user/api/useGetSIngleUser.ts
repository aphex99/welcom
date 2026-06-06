import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useQuery } from "@tanstack/react-query";

import { fetchSingleUser } from "@/entities/user/api/usersApi";
import { mapSingleUserResponse } from "@/entities/user/mappers";
import type { UserResponseViewModelI } from "@/entities/user/user-types";

interface UseGetSingleUser {
  id: number;
}

interface UseGetSingleUserReturnI {
  response: UserResponseViewModelI | undefined;
  isFetching: boolean;
}

export function useGetSingleUser({
  id,
}: UseGetSingleUser): UseGetSingleUserReturnI {
  const query = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchSingleUser(id),
    select: mapSingleUserResponse,
  });
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (query.isError) showBoundary(query.error);
  }, [query.isError]);

  return {
    response: query.data,
    isFetching: query.isFetching,
  };
}
