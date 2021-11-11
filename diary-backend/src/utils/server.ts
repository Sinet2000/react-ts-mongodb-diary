import express from "express";
import auth from "../routes/auth";
import note from "../routes/note";
import deserializeUser from "../middleware/deserializeUser";
import cors from "cors";


function createServer() {
  const app = express();

  app.use(cors());
  
  app.use(express.json());

  app.use(deserializeUser);

  auth({app});
  note({app});

  return app;
}

export default createServer;