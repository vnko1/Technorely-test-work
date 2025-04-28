import { z } from "zod";
import { CompanySchema } from "@/utils";

export const CreateCompanySchema = CompanySchema;

export type CreateCompanyInterface = z.infer<typeof CreateCompanySchema>;
