import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

import { IUser, Role } from "src/types";
import { CompanyEntity } from "../companies/company.entity";
import { UserEntity } from "../users/user.entity";

@Injectable()
export class StatisticService {
  constructor(private readonly dataSource: DataSource) {}

  async countEntities(admin: IUser) {
    const companyRepository = this.dataSource.getRepository(CompanyEntity);
    const userRepository = this.dataSource.getRepository(UserEntity);

    const promises: Promise<number>[] = [];

    promises.push(companyRepository.count());
    promises.push(userRepository.count({ where: { role: Role.User } }));

    if (admin.role === Role.SuperAdmin) {
      promises.push(userRepository.count({ where: { role: Role.Admin } }));
    }

    const [companies, users, admins] = await Promise.all(promises);

    return { admins, users, companies };
  }
}
