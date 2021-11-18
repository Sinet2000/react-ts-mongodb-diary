import { FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import { sign, decode } from "../utils/jwt.utils";
import { UserService } from ".";
import SessionModel, { SessionDocument } from "../models/session.model";

async function createSession(userId: any, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

async function reIssueAccesToken({
  refreshToken
}: {
  refreshToken: string
}) {
  // decoding refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, "_id")) return false;

  // get session var
  const session = await SessionModel.findById(get(decoded, "_id"));

  // validating session  (is it still valid?)
  if (!session || !session?.valid) return false;

  const user = await UserService.findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}

async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export const SessionService = {
  createSession,
  reIssueAccesToken,
  updateSession,
  findSessions
}