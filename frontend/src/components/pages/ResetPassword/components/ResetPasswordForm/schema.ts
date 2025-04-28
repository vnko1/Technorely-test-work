import { z } from "zod";
import { errorMessages } from "@/utils";

export const ResetPasswordSchema = z.object({
  email: z.string().min(1, errorMessages.email.required).email(),
});

export type ResetPasswordInterface = z.infer<typeof ResetPasswordSchema>;
