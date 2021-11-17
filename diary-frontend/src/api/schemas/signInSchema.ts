import { object, string, TypeOf } from "zod";

export const signInSchema = object({
  username: string().nonempty({
    message: "Username is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  }),
});

export type SignInInput = TypeOf<typeof signInSchema>;

