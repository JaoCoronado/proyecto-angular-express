export class StoreModel {
    constructor(
      public readonly _id: string,
      public name: string,
      public address: string,
      public phone: string,
      public price: number,
      public createdAt?: Date,
    ) {}
}

export class StoreResModel {
    constructor(
        public readonly _id: string,
        public name: string,
        public address: string,
        public phone: string,
        public price: number,
        public createdAt?: Date,
    ) {}
  }
  