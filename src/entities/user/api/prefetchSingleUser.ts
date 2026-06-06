import { fetchSingleUser } from "@/entities/user/api/usersApi";

import { queryClient } from "@/shared/api/client";

export const prefetchSingleUser = (id: number) => {
  queryClient.prefetchQuery({
    queryKey: ["user", id],
    queryFn: () => fetchSingleUser(id),
  });
};
