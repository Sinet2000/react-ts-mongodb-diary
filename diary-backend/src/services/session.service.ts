import { FilterQuery, UpdateQuery } from "mongoose";
import config from "config";
import { get } from "lodash";
import { sign, decode } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import { SessionModel } from "../models/session/session.model";
import { ISession } from "../models/session/session.types";

export async function createSession(userId: any, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}

export async function reIssueAccesToken({
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

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = sign(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
}

export async function updateSession(
  query: FilterQuery<ISession>,
  update: UpdateQuery<ISession>
) {
  return SessionModel.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<ISession>) {
  return SessionModel.find(query).lean();
}