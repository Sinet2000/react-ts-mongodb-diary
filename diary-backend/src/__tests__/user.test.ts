import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/server";
import { UserService, SessionService } from "../services/";
import { SessionController } from "../controllers/";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload  = {
  _id: userId,
  email: "nikita.nikitin@gmail.com",
  username: "justAUser",
};

const userInput  = {
  email: "test@example.com",
  username: "justAUser",
  password: "Password123",
  passwordConfirmation: "Password123",
};

const sessionPayload  = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-10-30T13:31:07.674Z"),
  updatedAt: new Date("2021-10-30T13:31:07.674Z"),
  __v: 0,
};

describe("user", () => {
  // user registration

  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/signup")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the passwords do not match", () => {
      it("should return a 400", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post("/api/signup")
          .send({ ...userInput, passwordConfirmation: "doesnotmatch" });

        expect(statusCode).toBe(400);

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service throws", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValueOnce("Oh no! :(");

        const { statusCode } = await supertest(createServer())
          .post("/api/signup")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe("create user session", () => {
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken & refresh token", async () => {
        jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "a user agent";
          },
          body: {
            username: "justAUser",
            password: "Password123",
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };

        // @ts-ignore
        await SessionController.createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});