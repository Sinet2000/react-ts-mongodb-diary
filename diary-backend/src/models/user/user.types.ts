import { Document } from "mongoose";

export interface IUser extends IUserInput, Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserInput {
  email: string;
  username: string;
  password: string;
}