import { Document, Schema } from "mongoose";
import { IUser } from "../user/user.types";

export interface INote extends Document {
  user: IUser["_id"];
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};