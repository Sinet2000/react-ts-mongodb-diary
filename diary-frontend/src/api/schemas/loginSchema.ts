import { object, string, TypeOf } from "zod";

export const createLoginSchema = object({
  username: string().nonempty({
    message: "Username is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  }),
});

export type SignInput = TypeOf<typeof createLoginSchema>;