import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { NoteService } from "../services/";
import { sign } from "../utils/jwt.utils";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const notePayload  = {
  user: userId,
  title: "Diary Studies: Understanding Long-Term User Behavior and Experiences",
  content:
    "Summary: User logs (diaries) of daily activities as they occur give contextual insights about real-time user behaviors and needs, helping define UX feature requirements."
};

const userPayload  = {
  _id: userId,
  email: "nikita.nikitin@gmail.com",
  username: "justAUser",
};

describe("note", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get note route", () => {
    describe("given the note does not exist", () => {
      it("should return a 404", async () => {
        const noteId = "note-111";

        await supertest(app).get(`/api/notes/${noteId}`).expect(404);
      });
    });

    describe("given the note does exist", () => {
      it("should return a 200 status and the note", async () => {
        // @ts-ignore
        const note = await NoteService.createNote(notePayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/notes/${note.noteId}`
        );

        expect(statusCode).toBe(200);

        expect(body.noteId).toBe(note.noteId);
      });
    });
  });

  describe("create note route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/notes/create");

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user is logged in", () => {
      it("should return a 200 and create the note", async () => {
        const jwt = sign(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/notes/create")
          .set("Authorization", `Bearer ${jwt}`)
          .send(notePayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          content:
            "Summary: User logs (diaries) of daily activities as they occur give contextual insights about real-time user behaviors and needs, helping define UX feature requirements.",
          noteId: expect.any(String),
          title: "Diary Studies: Understanding Long-Term User Behavior and Experiences",
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });
});