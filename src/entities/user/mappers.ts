import type {
  UserI,
  UserResponseViewModelI,
  UsersResponseI,
  UsersResponseViewModelI,
  UsersViewModelI,
} from "@/entities/user/user-types";

export function mapUsersResponse(
  response: UsersResponseI,
): UsersResponseViewModelI {
  const { users, limit, total } = response;
  const mappedUsers: UsersViewModelI[] = users.map((user) => ({
    id: user.id,
    username: user.username,
    age: user.age,
    gender: user.gender,
    email: user.email,
  }));
  return { users: mappedUsers, limit, total };
}

export function mapSingleUserResponse(response: UserI): UserResponseViewModelI {
  return {
    id: response.id,
    firstName: response.firstName,
    lastName: response.lastName,
    username: response.username,
    age: response.age,
    gender: response.gender,
    email: response.email,
    password: response.password,
    role: response.role,
  };
}
