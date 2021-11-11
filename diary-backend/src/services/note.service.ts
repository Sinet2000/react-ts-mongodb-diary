import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import { NoteModel } from "../models/note/note.model";
import { INote } from "../models/note/note.types";

export function createNote(note: DocumentDefinition<INote>) {
  return NoteModel.create(note);
}

export function findNote(
  query: FilterQuery<INote>,
  options: QueryOptions = { lean: true }
) {
  return NoteModel.findOne(query, {}, options);
}

export function findAndUpdateNote(
  query: FilterQuery<INote>,
  update: UpdateQuery<INote>,
  options: QueryOptions
) {
  return NoteModel.findOneAndUpdate(query, update, options);
}

export function deleteNote(query: FilterQuery<INote>) {
  return NoteModel.deleteOne(query);
}