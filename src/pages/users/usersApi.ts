import type { UsersResponseI } from "@/entities/user/userTypes";

import { api } from "@/shared/api/api";

export async function fetchUsers() {
    return await api.get<UsersResponseI>("/users");
}
