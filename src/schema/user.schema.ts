import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "First name is required",
    }),
    lastName: string({
      required_error: "Last name is required",
    }),
    email: string({
      required_error: "Email adress is required",
    }).email("Email is invalid"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short"),
    rights: string({
      required_error: "Rights is required",
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
