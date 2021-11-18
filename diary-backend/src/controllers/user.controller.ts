import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../routes/shema-managers/user.schema";
import { UserService } from "../services";
import logger from "../utils/logger";

async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await UserService.createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

async function getCurrentUser(req: Request, res: Response){
  return res.send(res.locals.user);
}

export const UserController = {
  createUserHandler,
  getCurrentUser
}