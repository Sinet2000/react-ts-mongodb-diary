import { Request, Response } from "express";
import requireUser from "../middleware/requireUser";
import validateResource  from "../middleware/validateResource";
import { 
  createNoteHandler,
  updateNoteHandler,
  getNoteHandler,
  deleteNoteHandler,
  getAllUserNotesHandler,
 } from "../controllers/note.controller";
import { TRoutesInput } from "./types/routes";
import { createNoteSchema, deleteNoteSchema, getNoteSchema, getUserNotesSchema, updateNoteSchema } from "../schemas/note.schema";

export default ({ app }: TRoutesInput) => {
  app.post(
    "/api/notes/create",
    [requireUser, validateResource(createNoteSchema)],
    createNoteHandler
  );
  
   /**
   * @openapi
   * '/api/notes/edit/{noteId}':
   *  get:
   *     tags:
   *     - Notes
   *     summary: Get a single note by the noteId
   *     parameters:
   *      - name: noteId
   *        in: path
   *        description: The id of the note
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/Note'
   *       404:
   *         description: Note not found
   */
  app.put(
    "/api/notes/edit/:noteId",
    [requireUser, validateResource(updateNoteSchema)],
    updateNoteHandler
  );

  // get a note
  app.get("/api/notes/:noteId",
  validateResource(getNoteSchema),
  getNoteHandler
  );

  // get user notes
  app.get("/api/notes/:userId", 
    [requireUser, validateResource(getUserNotesSchema)],
    getAllUserNotesHandler
  );

  // delete a note
  app.delete(
    "/api/notes/remove/:noteId",
    [requireUser, validateResource(deleteNoteSchema)],
    deleteNoteHandler
  );
};