import { Document, Schema } from "mongoose";
import { IUser } from "../user/user.types";

export interface INoteInput {
  user: IUser["_id"];
  title: string;
  content: string;
}

export interface INote extends INoteInput, Document {
  createdAt: Date;
  updatedAt: Date;
};