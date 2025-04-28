import { z } from "zod";

import { Role } from "@/types";
import { errorMessages, coordsRegex, passwordRegex } from "@/utils";

export const PasswordSchema = z
  .string({
    required_error: errorMessages.password.required,
  })
  .min(8, errorMessages.password.requirement)
  .max(30, errorMessages.password.requirement)
  .regex(passwordRegex, errorMessages.password.requirement);

export const UserSchema = z.object({
  email: z
    .string({
      required_error: errorMessages.email.required,
    })
    .min(1, errorMessages.email.required)
    .email(errorMessages.email.pattern),
  password: PasswordSchema,
  role: z.enum([Role.Admin, Role.User], {
    required_error: errorMessages.role.required,
  }),
});

export type UserInterface = z.infer<typeof UserSchema>;

export const CompanySchema = z.object({
  name: z
    .string({
      required_error: errorMessages.company.name.required,
    })
    .min(1, errorMessages.company.name.required),
  service: z
    .string({
      required_error: errorMessages.company.service.required,
    })
    .min(1, errorMessages.company.service.required),
  capital: z.coerce
    .bigint({
      required_error: errorMessages.company.capital.required,
    })
    .positive(errorMessages.company.capital.required),
  coords: z
    .string()
    .optional()
    .refine(
      (value) => !value || coordsRegex.test(value),
      errorMessages.company.coords.invalid
    ),
});

export type CompanyDto = z.infer<typeof CompanySchema>;
