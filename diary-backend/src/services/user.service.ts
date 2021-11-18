import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import  UserModel, { UserInput, UserDocument } from "../models/user.model";

async function createUser(
  input: DocumentDefinition<
    Omit<UserInput, "createdAt" | "updatedAt" | "comparePassword">
>) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

async function validatePassword({
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

export const UserService = {
  createUser,
  findUser,
  validatePassword
}