import { object, string, TypeOf } from "zod";

export const createSignUpSchema = object({
  username: string().nonempty({
    message: "Username is required",
  }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  email: string({
    required_error: "Email is required",
  })
    .email("Not a valid email")
    .nonempty({
      message: "Password is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

export type SignUpInput = TypeOf<typeof createSignUpSchema>;