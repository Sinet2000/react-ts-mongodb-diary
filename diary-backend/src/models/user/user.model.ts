import * as Mongoose from "mongoose";
import UserSchema from "./user.schema";
import { IUser } from "./user.types";

export const UserModel = Mongoose.model<IUser>(
  'User',
  UserSchema
);