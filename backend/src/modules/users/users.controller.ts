import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiConsumes,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

import { IUser, Role } from "src/types";
import { storageConfig, uploadValidation } from "src/utils";
import { Roles, User } from "src/common/decorators";
import { CustomValidationPipe } from "src/common/pipes";
import { ClearDataInterceptor } from "src/common/interceptors";

import { UsersService } from "./users.service";
import {
  CreateUserApiDto,
  CreateUserDto,
  CreateUserSchema,
  UpdatePasswordApiDto,
  UpdatePasswordDto,
  UpdatePasswordSchema,
  UpdateUserApiDto,
  UpdateUserDto,
  UpdateUserSchema,
  UserQueryDto,
  UserQuerySchema,
} from "./dto";
import { UserEntity } from "./user.entity";

@ApiTags("users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: "Get users" })
  @ApiQuery({ name: "email", type: "string" })
  @ApiQuery({ name: "username", type: "string" })
  @ApiQuery({ name: "offset", type: "number" })
  @ApiQuery({ name: "limit", type: "number" })
  @ApiQuery({ name: "createdAt", type: "string", example: "2025-04-20" })
  @ApiQuery({ name: "updatedAt", type: "string", example: "2025-04-20" })
  @ApiQuery({ name: "sort", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "role", enum: ["ASC", "DESC"] })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User entity.",
    type: UserEntity,
  })
  @Roles(Role.SuperAdmin, Role.Admin)
  @UsePipes(new CustomValidationPipe<UserQueryDto>(UserQuerySchema, "query"))
  getAllUsers(@Query() query: UserQueryDto, @User() admin: IUser) {
    return this.usersService.getUsers(admin, query);
  }

  @Get("me")
  @ApiOperation({ summary: "Get user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User entity.",
    type: UserEntity,
  })
  getMe(@User("id") id: number) {
    return this.usersService.getUser(id);
  }

  @Patch("me")
  @ApiOperation({ summary: "Update user" })
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        avatar: {
          type: "string",
          format: "binary",
        },
        username: { type: "string", format: "string" },
      },
      required: ["username"],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User entity.",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: UserEntity,
  })
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage(storageConfig),
    }),
    ClearDataInterceptor
  )
  @UsePipes(new CustomValidationPipe<UpdateUserDto>(UpdateUserSchema))
  updateMe(
    @User("id") id: number,
    @Body()
    dto: UpdateUserDto,
    @UploadedFile(uploadValidation())
    avatar?: Express.Multer.File
  ) {
    return this.usersService.updateUser(id, dto, avatar);
  }

  @Patch("me/password")
  @ApiOperation({ summary: "Update user password" })
  @ApiBody({
    schema: UpdatePasswordApiDto,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User entity.",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: UserEntity,
  })
  @UsePipes(new CustomValidationPipe<UpdatePasswordDto>(UpdatePasswordSchema))
  @HttpCode(HttpStatus.NO_CONTENT)
  changePassword(@User("id") id: number, @Body() dto: UpdatePasswordDto) {
    return this.usersService.changePassword(id, dto);
  }

  @Put("me/avatar")
  @ApiOperation({ summary: "Update user avatar" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["avatar"],
      properties: {
        avatar: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User entity.",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: UserEntity,
  })
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage(storageConfig),
    }),
    ClearDataInterceptor
  )
  addOrChangeAvatar(
    @User("id") id: number,
    @UploadedFile(uploadValidation(true))
    avatar: Express.Multer.File
  ) {
    return this.usersService.addOrChangeAvatar(id, avatar);
  }

  @Delete("me/avatar")
  @ApiOperation({ summary: "Delete user avatar" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User avatar deleted.",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Avatar already is deleted.",
    type: UserEntity,
  })
  deleteAvatar(@User("id") id: number) {
    return this.usersService.deleteAvatar(id);
  }

  @Post("admin")
  @ApiOperation({ summary: "Create user by admin" })
  @ApiBody({ schema: CreateUserApiDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User entity.",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: UserEntity,
  })
  @Roles(Role.SuperAdmin, Role.Admin)
  @UsePipes(new CustomValidationPipe<CreateUserDto>(CreateUserSchema))
  createUser(@User("role") role: Role, @Body() dto: CreateUserDto) {
    if (role === Role.Admin && dto.role !== Role.User) {
      throw new BadRequestException();
    }

    return this.usersService.addUser(dto);
  }

  @Get("admin/:id")
  @ApiOperation({ summary: "Get user by id for admins" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User entity.",
    type: UserEntity,
  })
  @Roles(Role.SuperAdmin, Role.Admin)
  getUserById(@User() user: IUser, @Param("id", ParseIntPipe) id: number) {
    return this.usersService.getUserById(id, user);
  }

  @Patch("admin/:id")
  @ApiOperation({ summary: "Update user by admin" })
  @ApiBody({
    schema: {
      type: "object",
      ...UpdateUserApiDto,
      properties: {
        avatar: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "User entity.",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: UserEntity,
  })
  @Roles(Role.SuperAdmin, Role.Admin)
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage(storageConfig),
    }),
    ClearDataInterceptor
  )
  @UsePipes(new CustomValidationPipe<UpdateUserDto>(UpdateUserSchema))
  updateUser(
    @User("role") role: Role,
    @Param("id", ParseIntPipe) id: number,
    @Body()
    dto: UpdateUserDto,
    @UploadedFile(uploadValidation())
    avatar?: Express.Multer.File
  ) {
    return this.usersService.updateUser(id, dto, avatar, role);
  }

  @Delete("admin/:id")
  @ApiOperation({ summary: "Delete company by admin" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "User deleted.",
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User already is deleted.",
    type: UserEntity,
  })
  @Roles(Role.SuperAdmin, Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param("id", ParseIntPipe) id: number, @User() admin: IUser) {
    return this.usersService.deleteUser(id, admin);
  }
}
