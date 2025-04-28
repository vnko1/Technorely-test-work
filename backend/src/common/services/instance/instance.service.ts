import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  RemoveOptions,
  Repository,
  SaveOptions,
} from "typeorm";
import { CriteriaType, EntityType, InstanceInterface } from "./instance.types";
import { AppService } from "../app/app.service";

export abstract class InstanceService<T extends ObjectLiteral>
  extends AppService
  implements InstanceInterface<T>
{
  constructor(private readonly repository: Repository<T>) {
    super();
  }

  findAll(options?: FindManyOptions) {
    return this.repository.find(options);
  }
  findAllAndCount(options?: FindManyOptions) {
    return this.repository.findAndCount(options);
  }

  findAllBy(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
    return this.repository.findBy(options);
  }

  findOneBy(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
    return this.repository.findOneBy(options);
  }

  findOne(options: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }

  findAllAndCountBy(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]) {
    return this.repository.findAndCountBy(options);
  }

  save(entity: T, options?: SaveOptions) {
    return this.repository.save(entity, options);
  }

  create(data: T) {
    return this.repository.create(data);
  }

  update(options: CriteriaType<T>, entity: EntityType<T>) {
    return this.repository.update(options, entity);
  }

  delete(options: CriteriaType<T>) {
    return this.repository.delete(options);
  }

  softDelete(options: CriteriaType<T>) {
    return this.repository.softDelete(options);
  }

  remove(entities: T[], options?: RemoveOptions) {
    return this.repository.remove([...entities], options);
  }

  softRemove(entities: T[], options?: SaveOptions) {
    return this.repository.softRemove([...entities], options);
  }

  restore(options: CriteriaType<T>) {
    return this.repository.restore(options);
  }
}
