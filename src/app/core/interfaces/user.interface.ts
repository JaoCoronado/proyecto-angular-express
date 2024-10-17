import { UserModel, UserResModel } from '../models/user.models';

export interface IUser {
  documentNumber: string;
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface IRespUser {
  ok: boolean;
  users: UserResModel[];
}
