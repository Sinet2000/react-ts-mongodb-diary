import { object, string } from "zod";

const createSessionSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export const SessionSchemaManager = {
  createSessionSchema
};