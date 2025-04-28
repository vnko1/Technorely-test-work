import { z } from "zod";
import { errorMessages } from "@/utils";

export const LoginSchema = z.object({
  email: z.string().min(1, errorMessages.email.required).email(),
  password: z.string().min(1, errorMessages.password.required),
});

export type LoginInterface = z.infer<typeof LoginSchema>;
