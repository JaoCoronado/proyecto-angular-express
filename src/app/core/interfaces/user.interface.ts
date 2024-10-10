import { UserModel, UserResModel } from '../models/user.models';

export interface IUser {
  documentNumber: string;
  name: string;
  email: string;
  role?: string;
}

export interface IRespUser {
  ok: boolean;
  users: UserResModel[];
}
