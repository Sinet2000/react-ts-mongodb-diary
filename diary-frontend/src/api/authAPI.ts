import { requestManager } from "./client";
import { IUser } from "../common/types";
import { SignInInput } from "./schemas/signInSchema";
import { SignUpInput } from "./schemas/signUpSchema";

export async function signIn(values: SignInInput) {
  await requestManager.post(
    "signin",
    values,
    true
  );
}

export async function signUp(values: SignUpInput) {
  await requestManager.post(
    "signup",
    values
  )
}