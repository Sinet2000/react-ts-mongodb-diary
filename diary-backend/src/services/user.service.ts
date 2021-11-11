import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import { UserModel } from "../models/user/user.model";
import { IUserInput, IUser } from "../models/user/user.types";

export async function createUser(input: IUserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findUser(query: FilterQuery<IUser>) {
  return UserModel.findOne(query).lean();
}

export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}