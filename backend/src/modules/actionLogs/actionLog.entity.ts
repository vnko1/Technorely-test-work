import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ActionLog } from "src/types";
import { UserEntity } from "../users/user.entity";
import { CompanyEntity } from "../companies/company.entity";

@Entity({ name: "logs" })
export class ActionLogEntity {
  @ApiProperty({
    example: 1,
    description: "Log id",
    type: "number",
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "CREATE",
    description: "Log action",
    enum: ActionLog,
    type: "string",
    required: true,
  })
  @Column({ type: "enum", enum: ActionLog })
  action: ActionLog;

  @ApiProperty({
    example: 1,
    description: "User id",
    type: "number",
    nullable: true,
  })
  @Column({ nullable: true })
  userId: number;

  @ApiProperty({
    example: 1,
    description: "Company id",
    type: "number",
    nullable: true,
  })
  @Column({ nullable: true })
  companyId: number;

  @ApiProperty({
    example: "Company",
    description: "Entity name",
    type: "string",
    nullable: true,
  })
  @Column({ nullable: true })
  entityName: string;

  @ApiProperty({
    example: {},
    description: "Meta description",
    type: "object",
    nullable: true,
    additionalProperties: true,
  })
  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, any>;

  @ApiProperty({
    example: new Date().toISOString(),
    description: "Create date",
    type: "string",
    nullable: true,
  })
  @Column({ type: "varchar", nullable: true })
  createdAt: string;

  @ManyToOne(() => UserEntity, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "userId" })
  user: UserEntity | null;

  @ManyToOne(() => CompanyEntity, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "companyId" })
  company: CompanyEntity | null;
}
