import { Controller, Get, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { IUser, Role } from "src/types";
import { Roles, User } from "src/common/decorators";

import { StatisticService } from "./statistic.service";

@ApiTags("statistic")
@ApiBearerAuth()
@Controller("statistic")
@Roles(Role.SuperAdmin, Role.Admin)
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: "App statistic.",
    example: {
      users: 19,
      companies: 20,
    },
  })
  getStatistic(@User() admin: IUser) {
    return this.statisticService.countEntities(admin);
  }
}
