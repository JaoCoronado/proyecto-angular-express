export class VehicleModel {
    constructor(
      public readonly _id: string,
      public userId: string,
      public make: string,
      public model: string,
      public year: number,
      public licensePlate: string,
      public createdAt: Date,
    ) {}
  }
  
  export class VehicleResModel {
    constructor(
      public readonly _id:string,
      public userId: string,
      public make: string,
      public model: string,
      public year: number,
      public licensePlate: string,
      public createdAt: Date,
    ) {}
  }
  