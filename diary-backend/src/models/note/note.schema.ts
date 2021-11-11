import { Schema } from "mongoose";
import { nanoid } from "nanoid";

const NoteSchema: Schema = new Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(10),
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, default: true},
  content: { type: String, default: true },
},
{ timestamps: true }
);

export default NoteSchema;