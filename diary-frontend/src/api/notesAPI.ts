import { requestManager } from "./client";
import { INote } from "../common/types";

export const notesAPI = {
  getById: (noteId: number): Promise<INote> =>
  requestManager.get("notes", { params: {noteId}})
}