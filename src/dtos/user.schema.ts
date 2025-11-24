import { User } from "@/types/users";

export type UserDtoType = {
  firstname: string;
  lastname: string;
  avatar_url: string | undefined;
};

export const UserDTO = (user: User): UserDtoType => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    avatar_url: user.avatar_url,
  };
};
