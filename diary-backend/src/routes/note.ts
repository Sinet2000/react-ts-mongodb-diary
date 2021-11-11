import { Request, Response } from "express";
import { requireUser, validateRequest } from "../middleware";
import { 
  createNoteHandler,
  updateNoteHandler,
  getNoteHandler,
  deleteNoteHandler,
  getAllUserNotes,
 } from "../controllers/note.controller";
import { TRoutesInput } from "./types/routes";
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "../schemas/note.schema";

export default ({ app }: TRoutesInput) => {
  // create a note
  app.post(
    "/api/notes/create",
    [requireUser, validateRequest(createNoteSchema)],
    createNoteHandler
  );

  // update a note
  app.put(
    "/api/notes/edit/:noteId",
    [requireUser, validateRequest(updateNoteSchema)],
    updateNoteHandler
  );

  // get a note
  app.get("/api/note/:noteId", getNoteHandler);

  // get user notes
  app.get("/pai/notes/:userId", getAllUserNotes);

  // delete a note
  app.delete(
    "/api/notes/remove/:noteId",
    [requireUser, validateRequest(deleteNoteSchema)],
    deleteNoteHandler
  );
};