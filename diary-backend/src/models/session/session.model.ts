import * as Mongoose from "mongoose";
import SessionSchema from "./session.schema";
import { ISession } from "./session.types";

export const SessionModel = Mongoose.model<ISession>(
  'Session',
  SessionSchema
);