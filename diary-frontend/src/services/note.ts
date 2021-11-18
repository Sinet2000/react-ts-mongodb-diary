import { INote } from "../models/Note";
import { requestManager } from "./client";
import { NoteInput } from "./schemas/noteSchema";

export const noteAPI = {
  deleteNote: async (id: number) => await requestManager.delete(`notes/remove/${id}`),
  addNote: async (values: NoteInput) => await requestManager.post('/notes/create', values),
  editNote: async (values: NoteInput, id: number) => await requestManager.put(`/notes/edit/${id}`, values),
  getAllUserNotes: async (userId: number): Promise<INote[]> => await requestManager.get(`/allnotes/${userId}`, { withCredentials: true }),
  getNoteById: async (noteId: number): Promise<INote> => await requestManager.get(`/notes/${noteId}`, { withCredentials: true }),
};