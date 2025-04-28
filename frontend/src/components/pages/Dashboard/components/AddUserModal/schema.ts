import { z } from "zod";
import { errorMessages, UserSchema } from "@/utils";

export const AddUserSchema = z
  .object({
    confirm: z.string({ required_error: errorMessages.password.required }),
  })
  .merge(UserSchema)
  .refine((data) => data.password === data.confirm, {
    message: errorMessages.password.match,
    path: ["confirm"],
  });

export type AddUserInterface = z.infer<typeof AddUserSchema>;
