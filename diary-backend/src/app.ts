import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth"
import noteRoutes from "./routes/note";
import connect from "./connect";
import config from "config";

const PORT = config.get("port") as number;
const db = config.get("dbConnString") as string

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

authRoutes({app});
noteRoutes({app});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  connect({db});
});