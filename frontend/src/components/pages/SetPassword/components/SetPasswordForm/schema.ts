import { z } from "zod";
import { errorMessages, UserSchema } from "@/utils";

export const SetPasswordSchema = z
  .object({
    confirm: z.string({ required_error: errorMessages.password.required }),
  })
  .merge(UserSchema.pick({ password: true }))
  .refine((data) => data.password === data.confirm, {
    message: errorMessages.password.match,
    path: ["confirm"],
  });

export type SetPasswordInterface = z.infer<typeof SetPasswordSchema>;
