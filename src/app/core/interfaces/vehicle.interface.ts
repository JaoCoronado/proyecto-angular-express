import {VehicleModel , VehicleResModel  } from '../models/vehicle.model';

export interface IVehicle {
  userId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}

export interface IRespVehicle {
  ok: boolean;
  vehicles: VehicleResModel[];
}
