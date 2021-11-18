import { Request, Response } from "express";
import config from "config";
import { UserService, SessionService } from "../services";
import { sign } from "../utils/jwt.utils";

async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await UserService.validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid username or password");
  }

  // create a session
  const session = await SessionService.createSession(user._id, req.get("user-agent") || "");

  // create an access token

  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  // create a refresh token
  const refreshToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
  );

  // return access & refresh tokens

  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.send({ accessToken, refreshToken });
}

async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await SessionService.findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await SessionService.updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export const SessionController = {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler
}