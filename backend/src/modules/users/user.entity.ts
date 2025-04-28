import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import { Role } from "src/types";
import { CompanyEntity } from "../companies/company.entity";

@Entity({ name: "user" })
export class UserEntity {
  @ApiProperty({
    example: 1,
    description: "User id",
    type: "number",
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "mymail@gmail.com",
    description: "User email",
    type: "string",
    required: true,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: "Andrii",
    description: "User name",
    type: "string",
    required: true,
  })
  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({
    example: "User",
    description: "User role",
    enum: [Role.Admin, Role.User],
    type: "string",
    required: true,
  })
  @Column({ default: Role.User })
  role: Role;

  @ApiProperty({
    example:
      "https://media.gettyimages.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=2048x2048&w=gi&k=20&c=0bZGqY3ObazuIBsr1NOPEs8q5nSvkeH7vtrubIehv8A=",
    description: "User avatar",
    type: "string",
    nullable: true,
  })
  @Column({ nullable: true, type: "varchar" })
  avatar: string | null;

  @ApiProperty({
    example: "13Qw2",
    description: "Reset password token",
    type: "string",
    nullable: true,
  })
  @Exclude()
  @Column({ type: "varchar", nullable: true })
  passwordResetToken: string | null;

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

  @Exclude()
  @OneToMany(() => CompanyEntity, (company) => company.user)
  companies: CompanyEntity[];

  constructor(user?: { email: string }) {
    if (!user) return;
    this.email = user.email;
    this.username = user.email
      .split("@")[0]
      .replace(/^\w/, (c) => c.toUpperCase());

    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}
