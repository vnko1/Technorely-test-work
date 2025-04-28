import { Role } from "../enums";
import { IInstance, IMeta } from "./instance.types";

export interface IUser extends IInstance {
  email: string;
  username: string;
  avatar: string | null;
  role: Role;
}

export type UsersType = { data: Array<IUser>; meta: IMeta };
