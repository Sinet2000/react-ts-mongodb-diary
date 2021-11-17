import { object, string, TypeOf } from "zod";


export const signUpSchema = object({
  username: string().nonempty({
    message: "Username is required",
  }),
  password: string()
    .min(6, "Password is too short - must be min 6 chars")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "Password confirmation is required",
  }),
  email: string({
    required_error: "Email is required"
  })
    .email("Not a valid email")
    .nonempty({
      message: "Password is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

export type SignUpInput = TypeOf<typeof signUpSchema>;