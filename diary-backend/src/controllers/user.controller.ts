import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../services/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const createdUser = await createUser(req.body);
    return res.send(omit(createdUser.toJSON(), "password"));
  } catch (error) {
    log.error(error);
    return res.status(409).send(error.message);
  }
}