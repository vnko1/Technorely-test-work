import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";

import { Public, User } from "src/common/decorators";
import { CustomValidationPipe } from "src/common/pipes";
import { refreshToken } from "src/utils";

import { UserEntity } from "../users/user.entity";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh.guard";
import {
  AuthApiDto,
  AuthDto,
  AuthSchema,
  ResetPasswordApiDto,
  ResetPasswordDto,
  ResetPasswordSchema,
  VerifyPasswordApiDto,
  VerifyPasswordDto,
  VerifyPasswordSchema,
} from "./dto";
import { AppService } from "src/common/services";
import { IUser } from "src/types";

@ApiTags("auth")
@Controller("auth")
export class AuthController extends AppService {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post("register")
  @ApiOperation({ summary: "Register user" })
  @ApiBody({ schema: AuthApiDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User registered.",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Email already exists.",
  })
  @Public()
  @UsePipes(new CustomValidationPipe<AuthDto>(AuthSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  registerUser(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post("login")
  @ApiOperation({ summary: "User login" })
  @ApiBody({ schema: AuthApiDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Login success.",
    type: UserEntity,
    example: {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGVua29lZHVAZ21haWwuY29tIiwic3ViIjo1LCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTc0NTEyNDc3NiwiZXhwIjoxNzQ1MTI1Njc2fQ.XPDHdJ-1UQtohi89xq7N65JIPmYfZ5cXq8B0hB2YTrA",
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response
  ) {
    const [access_token, refresh_token] = await this.authService.login(user);
    res.cookie(refreshToken, refresh_token, this.cookieOptions);
    return { access_token };
  }

  @Post("password/reset")
  @ApiOperation({ summary: "Request reset password" })
  @ApiBody({ schema: ResetPasswordApiDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Created reset password token.",
    type: UserEntity,
    example: {
      passwordResetToken: "123qwe",
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  @Public()
  @UsePipes(new CustomValidationPipe<ResetPasswordDto>(ResetPasswordSchema))
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post("password/set")
  @ApiOperation({ summary: "Set new password" })
  @ApiBody({ schema: VerifyPasswordApiDto })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "New password created.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  @Public()
  @UsePipes(new CustomValidationPipe<VerifyPasswordDto>(VerifyPasswordSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  setPassword(@Body() dto: VerifyPasswordDto) {
    return this.authService.setPassword(dto);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Access token refreshed.",
    type: UserEntity,
    example: {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGVua29lZHVAZ21haWwuY29tIiwic3ViIjo1LCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTc0NTEyNDc3NiwiZXhwIjoxNzQ1MTI1Njc2fQ.XPDHdJ-1UQtohi89xq7N65JIPmYfZ5cXq8B0hB2YTrA",
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(
    @User() user: UserEntity,
    @Res({ passthrough: true }) res: Response
  ) {
    const [access_token, refresh_token] = await this.authService.login(user);

    res.cookie(refreshToken, refresh_token, this.cookieOptions);
    return { access_token };
  }

  @Post("logout")
  @ApiOperation({ summary: "Logout" })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User logout.",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized.",
  })
  async logout(@User() user: IUser, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(user);
    res
      .cookie(refreshToken, "", {
        httpOnly: true,
        secure: true,
        maxAge: -1,
        sameSite: "none",
      })
      .status(HttpStatus.NO_CONTENT);
  }
}
