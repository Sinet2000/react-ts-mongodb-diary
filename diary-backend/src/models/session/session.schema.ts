import { Schema } from "mongoose";



const SessionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  valid: { type: Boolean, default: true },
  userAgent: { type: String },
}, {
  timestamps: true
});

export default SessionSchema;