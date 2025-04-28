import { Controller, Get, HttpStatus, Query, UsePipes } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from "@nestjs/swagger";

import { Role } from "src/types";
import { Roles } from "src/common/decorators";
import { CustomValidationPipe } from "src/common/pipes";

import { ActionLogsService } from "./actionLogs.service";
import { LogsQueryDto, LogsQuerySchema } from "./dto";
import { ActionLogEntity } from "./actionLog.entity";

@ApiTags("logs")
@ApiBearerAuth()
@Controller("logs")
export class ActionLogsController {
  constructor(private readonly logsService: ActionLogsService) {}

  @Get()
  @ApiOperation({ summary: "Get logs" })
  @ApiQuery({ name: "action", type: "string" })
  @ApiQuery({ name: "entityName", type: "string" })
  @ApiQuery({ name: "createdAt", type: "string", example: "2025-04-20" })
  @ApiQuery({ name: "offset", type: "number" })
  @ApiQuery({ name: "limit", type: "number" })
  @ApiQuery({ name: "sort", enum: ["ASC", "DESC"] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Log entity.",
    type: ActionLogEntity,
  })
  @Roles(Role.SuperAdmin)
  @UsePipes(new CustomValidationPipe<LogsQueryDto>(LogsQuerySchema, "query"))
  getLogs(@Query() query: LogsQueryDto) {
    return this.logsService.getLogs(query);
  }
}
