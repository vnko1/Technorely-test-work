import { z } from "zod";
import { errorMessages, UserSchema } from "@/utils";

export const SignupSchema = z
  .object({
    confirm: z.string({ required_error: errorMessages.password.required }),
  })
  .merge(UserSchema.omit({ role: true }))
  .refine((data) => data.password === data.confirm, {
    message: errorMessages.password.match,
    path: ["confirm"],
  });

export type SignupInterface = z.infer<typeof SignupSchema>;
