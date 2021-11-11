import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import { UserModel } from "../models/user/user.model";
import { IUser } from "../models/user/user.types";

export async function createUser(input: DocumentDefinition<IUser>) {
  try {
    return await UserModel.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findUser(query: FilterQuery<IUser>) {
  return UserModel.findOne(query).lean();
}

export async function validatePassword({
  username,
  password
}: {
  username: IUser["username"];
  password: string;
}) {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return false;
  }

  const isValidPass = await user.comparePassword(password);

  if (!isValidPass) {
    return false;
  }

  return omit(user.toJSON(), "password");
}