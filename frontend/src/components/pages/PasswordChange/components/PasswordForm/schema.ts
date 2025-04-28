import { z } from "zod";
import { errorMessages, PasswordSchema } from "@/utils";

export const ChangePasswordSchema = z
  .object({
    password: PasswordSchema,
    newPassword: PasswordSchema,
    confirm: z
      .string({ required_error: errorMessages.password.required })
      .min(1, errorMessages.password.required),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: errorMessages.password.unmatched,
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: errorMessages.password.match,
    path: ["confirm"],
  });

export type ChangePasswordInterface = z.infer<typeof ChangePasswordSchema>;
