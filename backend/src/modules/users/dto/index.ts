import { z } from "zod";
import { zodToOpenAPI } from "nestjs-zod";

import { errorMessages, passwordRegex } from "src/utils";
import { BaseQueySchema, UserSchema } from "src/common/dto";
import { Role } from "src/types";

export const CreateUserSchema = UserSchema;

export const UpdateUserSchema = z.object({
  username: z.string({ required_error: errorMessages.username.required }),
});

export const UserQuerySchema = z
  .object({
    email: z.string().optional(),
    username: z.string().optional(),
    role: z.enum([Role.Admin, Role.User]).optional(),
  })
  .merge(BaseQueySchema);

export const UpdatePasswordSchema = z
  .object({
    newPassword: z
      .string({
        required_error: errorMessages.password.required,
      })
      .min(8, errorMessages.password.requirement)
      .max(30, errorMessages.password.requirement)
      .regex(passwordRegex, errorMessages.password.requirement),
  })
  .merge(UserSchema.pick({ password: true }))
  .refine((data) => data.password !== data.newPassword, {
    message: errorMessages.password.unmatched,
    path: ["newPassword"],
  });

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type UserQueryDto = z.infer<typeof UserQuerySchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;

export const CreateUserApiDto: Record<string, any> =
  zodToOpenAPI(CreateUserSchema);
export const UpdateUserApiDto: Record<string, any> =
  zodToOpenAPI(UpdateUserSchema);
export const UserQueryApiDto: Record<string, any> =
  zodToOpenAPI(UserQuerySchema);
export const UpdatePasswordApiDto: Record<string, any> =
  zodToOpenAPI(UpdatePasswordSchema);
