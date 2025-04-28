import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  RemoveOptions,
  SaveOptions,
  UpdateResult,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export type CriteriaType<T> =
  | string
  | number
  | Date
  | ObjectId
  | FindOptionsWhere<T>
  | string[]
  | number[]
  | Date[]
  | ObjectId[];

export type EntityType<T> = QueryDeepPartialEntity<T>;

export interface InstanceInterface<T> {
  findAll(options?: FindManyOptions): Promise<T[]>;
  findAllAndCount(options?: FindManyOptions): Promise<[T[], number]>;
  findAllBy(options: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T[]>;
  findAllAndCountBy(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[]
  ): Promise<[T[], number]>;
  findOneBy(
    options: FindOptionsWhere<T> | FindOptionsWhere<T>[]
  ): Promise<T | null>;
  findOne(options: FindOneOptions<T>): Promise<T | null>;
  save(entity: T, options?: SaveOptions): Promise<T>;
  create(data: T): T;
  update(
    options: CriteriaType<T>,
    entity: EntityType<T>
  ): Promise<UpdateResult>;
  delete(options: CriteriaType<T>): Promise<DeleteResult>;
  softDelete(options: CriteriaType<T>): Promise<UpdateResult>;
  remove(options: T[], opt?: RemoveOptions): Promise<T[]>;
  softRemove(options: T[], opt?: SaveOptions): Promise<T[]>;
  restore(options: CriteriaType<T>): Promise<UpdateResult>;
}
