import { Module } from "@nestjs/common";
import { StatisticService } from "./statistic.service";
import { StatisticController } from "./statistic.controller";
import { UsersModule } from "../users/users.module";
import { CompaniesModule } from "../companies/companies.module";

@Module({
  imports: [UsersModule, CompaniesModule],
  providers: [StatisticService],
  controllers: [StatisticController],
})
export class StatisticModule {}
