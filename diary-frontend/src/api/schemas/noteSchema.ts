
import { object, string, TypeOf } from "zod";

export const createNoteSchema = object({
  title: string().nonempty({
    message: "Username is required",
  }),
  content: string().nonempty({
    message: "Content is required",
  }),
});

export type NoteInput = TypeOf<typeof createNoteSchema>;