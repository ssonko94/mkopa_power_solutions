import { Express } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
function routes(app: Express) {
  app.post("/api/users", validate(createUserSchema), createUserHandler);
}

export default routes;
