import type { UserI, UsersResponseI } from "@/entities/user/user-types";

import { api } from "@/shared/api/api";

export async function fetchUsers() {
  const response = await api.get<UsersResponseI>("/users");
  return response.data;
}

export async function fetchSingleUser(userId: number) {
  const response = await api.get<UserI>(`users/${userId}`);
  return response.data;
}
