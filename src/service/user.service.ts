import { Document } from "mongoose";

import User, { UserDocument } from "../models/user.model";

export async function createUser(input: Document<UserDocument>) {
  try {
    return await User.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
