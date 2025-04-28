import { z } from "zod";

import { coordsRegex, errorMessages, BIGINT_MAX, BIGINT_MIN } from "src/utils";

export const CompanySchema = z.object({
  name: z.string({
    required_error: errorMessages.company.name.required,
  }),
  service: z.string({
    required_error: errorMessages.company.service.required,
  }),
  capital: z.coerce
    .bigint({
      required_error: errorMessages.company.capital.required,
    })
    .refine(
      (val) => val >= BIGINT_MIN && val <= BIGINT_MAX,
      `Capital must be between ${BIGINT_MIN} and ${BIGINT_MAX}`
    ),
  currency: z.string().nullable().optional(),
  coords: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) => !value || coordsRegex.test(value),
      errorMessages.company.coords.invalid
    ),
  location: z
    .object({
      lat: z.coerce.number(),
      lng: z.coerce.number(),
    })
    .nullable()
    .optional(),
});

export type CompanyDto = z.infer<typeof CompanySchema>;
