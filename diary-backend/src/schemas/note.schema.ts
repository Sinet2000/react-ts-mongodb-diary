import { object, number, string, TypeOf } from "zod";

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

const userParams = {
  params: object({
    userId: string({
      required_error: "userId is required",
    }),
  }),
};

export const createNoteSchema = object({
  ...payload,
});

export const updateNoteSchema = object({
  ...params,
  ...payload,
});

export const deleteNoteSchema = object({
  ...params,
});

export const getNoteSchema = object({
  ...params,
});

export const getUserNotesSchema = object({
  ...userParams
});

export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>;
export type ReadNoteInput = TypeOf<typeof getNoteSchema>;
export type DeleteNoteInput = TypeOf<typeof deleteNoteSchema>;
export type GetUserNotesInput = TypeOf<typeof getUserNotesSchema>;