import { object, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *   schema:
 *     Note:
 *       type: object
 *       required:
 *        - title
 *        - content
 *       properties:
 *         title:
 *           type: string
 *         content:
 *           type: string
 */

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    content: string({
      required_error: "Content is required",
    }).min(30, "Content should be at least 120 characters long")
  }),
};

const params = {
  params: object({
    noteId: string({
      required_error: "noteId is required",
    }),
  }),
};

const createNoteSchema = object({
  ...payload,
});

const updateNoteSchema = object({
  ...params,
  ...payload,
});

const deleteNoteSchema = object({
  ...params,
});

const getNoteSchema = object({
  ...params,
});

export const NoteSchemaManager = {
  createNoteSchema,
  updateNoteSchema,
  deleteNoteSchema,
  getNoteSchema
};

export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>;
export type ReadNoteInput = TypeOf<typeof getNoteSchema>;
export type DeleteNoteInput = TypeOf<typeof deleteNoteSchema>;