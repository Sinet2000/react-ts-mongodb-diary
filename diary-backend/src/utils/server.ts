import express from "express";
import config from "config";
import cookieParser from "cookie-parser";
import auth from "../routes/auth";
import note from "../routes/note";
import deserializeUser from "../middleware/deserializeUser";
import cors from "cors";


function createServer() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.use(express.json());

  app.use(deserializeUser);

  auth({app});
  note({app});

  return app;
}

export default createServer;