import { z } from "zod";
import { CompanySchema, errorMessages } from "@/utils";

export const UpdateCompanySchema = CompanySchema.partial().refine(
  (data) => Object.values(data).some((value) => value !== undefined),
  {
    message: errorMessages.company.update,
  }
);

export type UpdateCompanyInterface = z.infer<typeof UpdateCompanySchema>;
