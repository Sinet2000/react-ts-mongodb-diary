import { Document } from "mongoose";
import { IUser } from "../user/user.types";

export interface ISession extends Document {
  user: IUser["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}