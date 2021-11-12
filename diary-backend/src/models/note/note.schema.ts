import { Schema } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

const NoteSchema: Schema = new Schema({
  noteId: {
    type: String,
    required: true,
    unique: true,
    default: () => `note_${nanoid()}`
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, default: true},
  content: { type: String, default: true },
},
{ timestamps: true }
);

export default NoteSchema;