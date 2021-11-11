import { Request, Response } from "express";
import { createUserHandler } from "../controllers/user.controller";
import { 
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler 
} from "../controllers/session.controller";
import { validateRequest, requireUser } from "../middleware";
import { 
  createUserSchema,
  createUserSessionSchema 
} from "../schemas/user.schema";
import { TRoutesInput } from "./types/routes";

export default ({ app }: TRoutesInput) => {
  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/signup", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/signin",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

   // Get the user's sessions
   app.get("/api/sessions", requireUser, getUserSessionsHandler);

   // Logout
   app.delete("/api/logout", requireUser, invalidateUserSessionHandler);

};