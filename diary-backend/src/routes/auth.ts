import { Request, Response } from "express";
import { UserController, SessionController } from "../controllers";
import requireUser from "../middleware/requireUser";
import validateResource  from "../middleware/validateResource";
import { SessionSchemaManager, UserSchemaManager } from "./shema-managers";
import { TRoutesInput } from "./types/routes";

export default ({ app }: TRoutesInput) => {
  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
  app.post("/api/signup", validateResource(UserSchemaManager.createUserSchema), UserController.createUserHandler);

  // Login
  app.post(
    "/api/signin",
    validateResource(SessionSchemaManager.createSessionSchema),
    SessionController.createUserSessionHandler
  );

  app.get('/api/curUser', requireUser, UserController.getCurrentUser);

   // Get the user's sessions
   app.get("/api/sessions", requireUser, SessionController.getUserSessionsHandler);

   // Logout
   app.delete("/api/logout", requireUser, SessionController.deleteSessionHandler);

};