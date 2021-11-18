import {
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  DocumentDefinition,
} from "mongoose";
import NoteModel, { NoteDocument } from "../models/note.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

async function createNote(
  input: DocumentDefinition<
    Omit<NoteDocument, "createdAt" | "updatedAt" | "noteId">
>) {
  const metricsLabels = {
    operation: "createProduct",
  };

  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await NoteModel.create(input);
    timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}

async function findNote(
  query: FilterQuery<NoteDocument>,
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

function findAndUpdateNote(
  query: FilterQuery<NoteDocument>,
  update: UpdateQuery<NoteDocument>,
  options: QueryOptions
) {
  return NoteModel.findOneAndUpdate(query, update, options);
}

function deleteNote(query: FilterQuery<NoteDocument>) {
  return NoteModel.deleteOne(query);
}

export const NoteService = {
  createNote,
  findNote,
  findAndUpdateNote,
  deleteNote
}