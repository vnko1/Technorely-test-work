import { z } from "zod";
import { zodToOpenAPI } from "nestjs-zod";
import { CompanySchema, BaseQueySchema } from "src/common/dto";
import { errorMessages, BIGINT_MAX, BIGINT_MIN } from "src/utils";

export const CreateCompanySchema = CompanySchema;

export const UpdateCompanySchema = CompanySchema.partial().refine(
  (data) => Object.values(data).some((value) => value !== undefined),
  {
    message: errorMessages.company.update,
  }
);

export const CompaniesQuerySchema = z
  .object({
    name: z.enum(["ASC", "DESC"]).optional(),
    service: z.enum(["ASC", "ASC"]).optional(),
    capital: z.coerce
      .bigint()
      .optional()
      .refine((val) => {
        if (!val) return true;
        return val && val >= BIGINT_MIN && val <= BIGINT_MAX;
      }, `Capital must be between ${BIGINT_MIN} and ${BIGINT_MAX}`),
    capitalSorting: z.enum(["ASC", "DESC"]).optional(),
  })
  .merge(BaseQueySchema);

export type CreateCompanyDto = z.infer<typeof CreateCompanySchema>;
export type UpdateCompanyDto = z.infer<typeof UpdateCompanySchema>;
export type CompaniesQueryDto = z.infer<typeof CompaniesQuerySchema>;

export const CreateCompanyApiDto: Record<string, any> =
  zodToOpenAPI(CreateCompanySchema);
export const UpdateCompanyApiDto: Record<string, any> =
  zodToOpenAPI(UpdateCompanySchema);
export const CompaniesQueryApiDto: Record<string, any> =
  zodToOpenAPI(CompaniesQuerySchema);
