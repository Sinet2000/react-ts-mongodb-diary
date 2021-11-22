import { INote } from "../common/types";
import instance from "./requestManager";
import { NoteInput } from "./schemas/noteSchema";

export const noteAPI = {
  deleteNote: async (id: string) => await instance.delete(`notes/remove/${id}`),
  addNote: async (values: NoteInput) => await instance.post('/notes/create', values),
  editNote: async (values: NoteInput, id: string) => await instance.put(`/notes/edit/${id}`, values),
  getAllUserNotes: async (): Promise<INote[]> => await instance.get(`/notes`, { withCredentials: true }),
  getNoteById: async (noteId: string): Promise<INote> => await instance.get(`/notes/${noteId}`, { withCredentials: true }),
};