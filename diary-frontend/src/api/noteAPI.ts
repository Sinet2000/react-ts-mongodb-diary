import { INote } from "../common/types";
import { requestManager } from "./requestManager";
import { NoteInput } from "./schemas/noteSchema";

export const noteAPI = {
  deleteNote: async (id: string) => await requestManager.delete(`notes/remove/${id}`),
  addNote: async (values: NoteInput) => await requestManager.post('/notes/create', values),
  editNote: async (values: NoteInput, id: string) => await requestManager.put(`/notes/edit/${id}`, values),
  getAllUserNotes: async (): Promise<INote[]> => await requestManager.get(`/notes`, { withCredentials: true }),
  getNoteById: async (noteId: string): Promise<INote> => await requestManager.get(`/notes/${noteId}`, { withCredentials: true }),
};