import {WorkOrderModel , WorkOrderResModel  } from '../models/workOrder.model';

export interface IWorkOrder {
  vehicleId: string;
  description: string;
  status: string;
  cost: number;
}

export interface IRespWorkOrder {
  ok: boolean;
  workOrders: WorkOrderResModel[];
}
