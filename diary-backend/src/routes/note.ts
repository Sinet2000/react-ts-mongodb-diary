import { Request, Response } from "express";
import requireUser from "../middleware/requireUser";
import validateResource  from "../middleware/validateResource";
import { NoteController } from "../controllers/";
import { TRoutesInput } from "./types/routes";
import { NoteSchemaManager } from "./shema-managers/";

export default ({ app }: TRoutesInput) => {
  app.post(
    "/api/notes/create",
    [requireUser, validateResource(NoteSchemaManager.createNoteSchema)],
    NoteController.createNoteHandler
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
    [requireUser, validateResource(NoteSchemaManager.updateNoteSchema)],
    NoteController.updateNoteHandler
  );

  // get a note
  app.get(
    "/api/notes/:noteId",
    validateResource(NoteSchemaManager.getNoteSchema),
    NoteController.getNoteHandler
  );

  // get user notes
  app.get(
    "/api/notes", 
    [requireUser],
    NoteController.getAllUserNotesHandler
  );

  // delete a note
  app.delete(
    "/api/notes/remove/:noteId",
    [requireUser, validateResource(NoteSchemaManager.deleteNoteSchema)],
    NoteController.deleteNoteHandler
  );
};