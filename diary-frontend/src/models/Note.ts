import IUser from "./User";

export interface INote {
  _id: string;
  user: IUser["_id"];
  noteId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}