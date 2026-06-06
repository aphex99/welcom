import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { fetchUsers } from "@/pages/users/usersApi";

import type { UserFilteredI } from "@/entities/user/userTypes";

interface UseGetUsersReturnI {
    users: UserFilteredI[];
    getUsers: () => Promise<void>;
    isLoading: boolean;
    isDataEmpty: boolean;
    isInitialLoading: boolean;
}

export function useGetUsers(): UseGetUsersReturnI {
    const [users, setUsers] = useState<UserFilteredI[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataEmpty, setIsDataEmpty] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(false);

    const { showBoundary } = useErrorBoundary();

    const getUsers = async () => {
        const isFirstFetch = users.length === 0;
        try {
            if (isFirstFetch) {
                setIsInitialLoading(true);
                setIsDataEmpty(true);
            } else {
                setIsLoading(true);
            }

            const result = await fetchUsers();
            const filteredUsers: UserFilteredI[] = result.data.users.map(
                (user) => ({
                    id: user.id,
                    username: user.username,
                    age: user.age,
                    gender: user.gender,
                    email: user.email,
                }),
            );
            if (filteredUsers.length > 0) setIsDataEmpty(false);
            setUsers(filteredUsers);
        } catch (error) {
            showBoundary(error);
        } finally {
            setIsInitialLoading(false);
            setIsLoading(false);
        }
    };

    return {
        users,
        getUsers,
        isLoading,
        isDataEmpty,
        isInitialLoading,
    };
}
