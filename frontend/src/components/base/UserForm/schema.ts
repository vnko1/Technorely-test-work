import { z } from "zod";
import { errorMessages, userNameRegex } from "@/utils";

export const UserSchema = z.object({
  username: z
    .string({ required_error: errorMessages.username.required })
    .min(1, errorMessages.username.required)
    .regex(userNameRegex),
});

export type UserInterface = z.infer<typeof UserSchema>;
