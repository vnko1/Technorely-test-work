import { zodToOpenAPI } from "nestjs-zod";
import { z } from "zod";

import { BaseQueySchema } from "src/common/dto";

export const LogsQuerySchema = z
  .object({
    action: z.string().optional(),
    entityName: z.string().optional(),
  })
  .merge(BaseQueySchema);

export type LogsQueryDto = z.infer<typeof LogsQuerySchema>;

export const LogsQueryApiDto: Record<string, any> =
  zodToOpenAPI(LogsQuerySchema);
