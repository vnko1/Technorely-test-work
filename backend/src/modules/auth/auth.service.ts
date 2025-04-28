import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { DataSource } from "typeorm";

import { IUser, JwtPayloadType, ActionLog } from "src/types";
import { AppService } from "src/common/services";

import { ActionLogsService } from "../actionLogs/actionLogs.service";
import { UsersService } from "../users/users.service";
import { UserEntity } from "../users/user.entity";

import { AuthDto, ResetPasswordDto, VerifyPasswordDto } from "./dto";

@Injectable()
export class AuthService extends AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
    private readonly logsService: ActionLogsService
  ) {
    super();
  }

  private generateTokens(payload: JwtPayloadType, opt?: JwtSignOptions) {
    return Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        expiresIn: "7d",
        ...opt,
        secret: this.configService.get<string>("jwt_refresh_secret"),
      }),
    ]);
  }

  checkUser(id: number) {
    return this.usersService.findOneBy({ id });
  }

  async validateUser(
    email: string,
    pass: string
  ): Promise<Omit<UserEntity, "password"> | null> {
    const user = await this.usersService.findOneBy({ email });

    if (!user) return null;

    const isValidPass = await this.checkPass(pass, user.password);
    if (!isValidPass) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async register(dto: AuthDto) {
    return this.usersService.addUser(dto);
  }

  async login(user: IUser) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    await this.logsService.log({
      action: ActionLog.LOGIN,
      userId: user.id,
      entityName: "User",
      metadata: { reason: `User with ${user.email}` },
    });

    return this.generateTokens(payload);
  }

  async resetPassword({ email }: ResetPasswordDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOneBy(UserEntity, { email });
      if (!user) throw new UnauthorizedException();

      user.passwordResetToken = this.randomString();
      user.updatedAt = new Date().toISOString();
      await queryRunner.manager.save(user);

      await this.logsService.log(
        {
          action: ActionLog.UPDATE,
          userId: user.id,
          entityName: "User",
          metadata: {
            reason: `${user.role} with ${user.email} requested password change`,
          },
        },
        queryRunner
      );

      await queryRunner.commitTransaction();
      return { token: user.passwordResetToken };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async setPassword({ password, passwordResetToken }: VerifyPasswordDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOneBy(UserEntity, {
        passwordResetToken,
      });
      if (!user) throw new UnauthorizedException();

      user.password = await this.hashPassword(password);
      user.passwordResetToken = null;
      user.updatedAt = new Date().toISOString();

      await queryRunner.manager.save(user);

      await this.logsService.log(
        {
          action: ActionLog.LOGIN,
          userId: user.id,
          entityName: "User",
          metadata: {
            reason: `${user.role} with ${user.email} changed password`,
          },
        },
        queryRunner
      );
      return await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  logout(user: IUser) {
    return this.logsService.log({
      action: ActionLog.LOGIN,
      userId: user.id,
      entityName: "User",
      metadata: { reason: `${user.role} with ${user.email} logout` },
    });
  }
}
