import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import { NoteModel } from "../models/note/note.model";
import { INote, INoteInput } from "../models/note/note.types";
import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createNote(note: INoteInput) {
  const metricsLabels = {
    operation: "createProduct",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await NoteModel.create(note);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

export async function findNote(
  query: FilterQuery<INote>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findProduct",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await NoteModel.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });

    throw e;
  }
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