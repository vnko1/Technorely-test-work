import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from "@nestjs/common";
import { DataSource } from "typeorm";
import { IRequest, Role } from "src/types";
import { CompanyEntity } from "../company.entity";

@Injectable()
export class CompaniesGuard implements CanActivate {
  constructor(private readonly dataSource: DataSource) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    const user = request.user;
    const id = request.params.id;
    if (!user) return false;

    const repo = this.dataSource.getRepository(CompanyEntity);

    const company = await repo.findOne({
      where: { id: parseInt(id) },
      relations: { user: true },
    });

    if (!company) throw new NotFoundException();
    request.company = company;

    return !(user.role === Role.User && company.user.id !== user.id);
  }
}
