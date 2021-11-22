import {IUser} from "./IUser";

export interface INote {
  _id: string;
  user: IUser["_id"];
  noteId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}