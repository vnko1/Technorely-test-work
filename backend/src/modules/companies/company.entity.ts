import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";

import { CompanyDto } from "src/common/dto";
import { UserEntity } from "../users/user.entity";

@Entity({ name: "company" })
export class CompanyEntity {
  @ApiProperty({
    example: 1,
    description: "Company id",
    type: "number",
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Company",
    description: "Company name",
    type: "string",
    required: true,
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "Service",
    description: "Company service",
    type: "string",
    required: true,
  })
  @Column()
  service: string;

  @ApiProperty({
    example: 12,
    description: "Company capital",
    type: "number",
    required: true,
  })
  @Transform(({ value }: { value: bigint | null | undefined }) =>
    value?.toString()
  )
  @Column({ type: "bigint", default: 0, nullable: false })
  capital: bigint;

  @ApiProperty({
    example: "USD",
    description: "Currency",
    type: "string",
    required: false,
  })
  @Column({ default: "USD" })
  currency: string;

  @ApiProperty({
    example: { lat: 21313, lng: 21313 },
    description: "Company location",
    required: false,
  })
  @Column({ nullable: true, type: "simple-json" })
  location: { lat: number; lng: number } | null;

  @ApiProperty({
    example: "coords",
    description: "Company coordinates",
    type: "string",
    required: false,
  })
  @Column({ nullable: true, type: "varchar" })
  coords: string | null;

  @ApiProperty({
    example:
      "https://media.gettyimages.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=gi&k=20&c=0bZGqY3ObazuIBsr1NOPEs8q5nSvkeH7vtrubIehv8A=",
    description: "Company logo",
    type: "string",
    nullable: true,
  })
  @Column({ nullable: true, type: "varchar" })
  logo: string | null;

  @ApiProperty({
    example: new Date().toISOString(),
    description: "Create date",
    type: "string",
    nullable: true,
  })
  @Column({ type: "varchar", nullable: true })
  createdAt: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: "Update date",
    type: "string",
    nullable: true,
  })
  @Column({ type: "varchar", nullable: true })
  updatedAt: string;

  @ApiProperty({
    example: 1,
    description: "User id",
    type: "number",
    required: true,
  })
  @Column()
  userId: number;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.companies, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  constructor(company?: CompanyDto) {
    if (!company) return;
    Object.entries(company).forEach(([key, value]) => (this[key] = value));
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
