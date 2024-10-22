export class WorkOrderModel {
  constructor(
    public readonly _id: string,
    public vehicleId: string,
    public description: string,
    public status: string,
    public cost: number,
    public createdAt: Date
  ) {}
}

export class WorkOrderResModel {
  constructor(
    public readonly _id: string,
    public vehicleId: string,
    public description: string,
    public status: string,
    public cost: number,
    public createdAt: Date
  ) {}
}