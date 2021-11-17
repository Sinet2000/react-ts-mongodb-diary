export interface IUser {
  _id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}