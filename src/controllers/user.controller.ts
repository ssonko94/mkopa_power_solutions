import { Request, Response, NextFunction } from "express";
import log from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response,
  next: NextFunction
) {
  try {
    // Call create user service
    const user = await createUser(req.body);
    return res.status(200).json(user);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
