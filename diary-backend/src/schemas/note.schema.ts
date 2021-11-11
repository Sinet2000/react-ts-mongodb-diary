import { object, string } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    content: string()
      .required("Content is required")
      .min(20, "Content is too short - should be 20 chars minimum."),
  }),
};

const params = {
  params: object({
    noteId: string().required("noteId is required"),
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