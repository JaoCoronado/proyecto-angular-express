export class UserModel {
  constructor(
    public readonly _id: string,
    public documentNumber: string,
    public name: string,
    public createdAt: Date,
    public email?: string,
    public role?: string,
    public password?: string,
    public city?: string,
    public address?: string,
    public phone?: number
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
    public city?: string,
    public address?: string,
    public phone?: number
  ) {}
}
