import * as Mongoose from "mongoose";
import NoteSchema from "./note.schema";
import { INote } from "./note.types";

export const NoteModel = Mongoose.model<INote>(
  'Note',
  NoteSchema
);