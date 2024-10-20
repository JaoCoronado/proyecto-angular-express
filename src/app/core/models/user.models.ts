export class UserModel {
  constructor(
    public readonly _id: string,
    public documentNumber: string,
    public name: string,
    public createdAt: Date,
    public email?: string,
    public role?: string,
    public password?: string
  ) {}
}

export class UserResModel {
  constructor(
    public readonly _id:string,
    public documentNumber: string,
    public name: string,
    public createdAt: Date,
    public email: string,
    public role?: string,
  ) {}
}
