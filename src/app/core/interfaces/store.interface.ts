import { StoreModel, StoreResModel } from '../models/store.model';

export interface IStore {
  name: string;
  address: string;
  phone: string;
  price: number;
  admin: string;
}

export interface IRespStore {
  ok: boolean;
  stores: StoreResModel[];
}
