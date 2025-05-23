import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  Query,
  UseGuards,
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
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";

import { storageConfig, uploadValidation } from "src/utils";
import { IUser, Role } from "src/types";

import { Roles, User } from "src/common/decorators";
import { ClearDataInterceptor } from "src/common/interceptors";
import { CustomValidationPipe } from "src/common/pipes";

import { CompaniesService } from "./companies.service";
import {
  CreateCompanyDto,
  CreateCompanySchema,
  CompaniesQueryDto,
  CompaniesQuerySchema,
  UpdateCompanyDto,
  UpdateCompanySchema,
  CreateCompanyApiDto,
} from "./dto";
import { CompanyEntity } from "./company.entity";
import { CompaniesGuard } from "./guards/companies.guard";
import { Company } from "./decorators/company.decorator";

@ApiTags("companies")
@ApiBearerAuth()
@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: "Create company" })
  @ApiBody({ schema: CreateCompanyApiDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Company created.",
    type: CompanyEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: CompanyEntity,
  })
  @UseInterceptors(
    FileInterceptor("logo", {
      storage: diskStorage(storageConfig),
    }),
    ClearDataInterceptor
  )
  @UsePipes(new CustomValidationPipe<CreateCompanyDto>(CreateCompanySchema))
  createCompany(
    @User() user: IUser,
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile(uploadValidation())
    logo?: Express.Multer.File
  ) {
    return this.companiesService.createCompany(createCompanyDto, user, logo);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update company" })
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        logo: {
          type: "string",
          format: "binary",
        },
        name: { type: "string", format: "string" },
        service: { type: "string", format: "string" },
        capital: { type: "number", format: "number" },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Company updated.",
    type: CompanyEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: CompanyEntity,
  })
  @UseInterceptors(
    FileInterceptor("logo", {
      storage: diskStorage(storageConfig),
    }),
    ClearDataInterceptor
  )
  @UseGuards(CompaniesGuard)
  @UsePipes(new CustomValidationPipe<UpdateCompanyDto>(UpdateCompanySchema))
  updateCompany(
    @User() user: IUser,
    @Body() companyDto: UpdateCompanyDto,
    @UploadedFile(uploadValidation())
    logo: Express.Multer.File | undefined,
    @Company()
    company: CompanyEntity
  ) {
    return this.companiesService.updateCompany(company, user, companyDto, logo);
  }

  @Put("company/:id/logo")
  @ApiOperation({ summary: "Update company logo" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        logo: {
          type: "string",
          format: "binary",
        },
      },
      required: ["logo"],
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Company logo updated.",
    type: CompanyEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Validation failed.",
    type: CompanyEntity,
  })
  @UseInterceptors(
    FileInterceptor("logo", {
      storage: diskStorage(storageConfig),
    }),
    ClearDataInterceptor
  )
  @UseGuards(CompaniesGuard)
  addOrChangeLogo(
    @User() user: IUser,
    @UploadedFile(uploadValidation(true))
    logo: Express.Multer.File,
    @Company()
    company: CompanyEntity
  ) {
    return this.companiesService.addOrChangeCompanyLogo(company, user, logo);
  }

  @Delete("company/:id/logo")
  @ApiOperation({ summary: "Delete company logo" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Company logo deleted.",
    type: CompanyEntity,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Logo already is deleted.",
    type: CompanyEntity,
  })
  @UseGuards(CompaniesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteLogo(
    @Param("id", ParseIntPipe) id: number,
    @User() user: IUser,
    @Company()
    company: CompanyEntity
  ) {
    return this.companiesService.deleteCompanyLogo(company, user);
  }

  @Delete("company/:id")
  @ApiOperation({ summary: "Delete company" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Company deleted.",
    type: CompanyEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Company already is deleted.",
    type: CompanyEntity,
  })
  @UseGuards(CompaniesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCompany(
    @User() user: IUser,
    @Company()
    company: CompanyEntity
  ) {
    return this.companiesService.deleteCompany(company, user);
  }

  @Get("company/:id")
  @ApiOperation({ summary: "Get company by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Company entity.",
    type: CompanyEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Company not found.",
    type: CompanyEntity,
  })
  @UseGuards(CompaniesGuard)
  getCompany(
    @Company()
    company: CompanyEntity
  ) {
    return this.companiesService.getCompany(company);
  }

  @Get()
  @ApiOperation({ summary: "Get all companies" })
  @ApiQuery({ name: "name", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "service", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "capitalSorting", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "capital", type: "string" })
  @ApiQuery({ name: "createdAt", type: "string" })
  @ApiQuery({ name: "offset", type: "number" })
  @ApiQuery({ name: "limit", type: "number" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Company entity.",
    type: CompanyEntity,
  })
  @Roles(Role.SuperAdmin, Role.Admin)
  @UsePipes(
    new CustomValidationPipe<CompaniesQueryDto>(CompaniesQuerySchema, "query")
  )
  getCompanies(@Query() query: CompaniesQueryDto) {
    return this.companiesService.getCompanies(query);
  }

  @Get("user")
  @ApiOperation({ summary: "Get user companies" })
  @ApiQuery({ name: "name", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "service", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "capitalSorting", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "capital", type: "string" })
  @ApiQuery({ name: "createdAt", type: "string", example: "2025-04-20" })
  @ApiQuery({ name: "offset", type: "number" })
  @ApiQuery({ name: "limit", type: "number" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Company entity.",
    type: CompanyEntity,
  })
  @UsePipes(
    new CustomValidationPipe<CompaniesQueryDto>(CompaniesQuerySchema, "query")
  )
  getUsersCompanies(@User("id") id: number, @Query() query: CompaniesQueryDto) {
    return this.companiesService.getCompanies(query, id);
  }

  @Get("list")
  @ApiOperation({ summary: "Get companies list" })
  @ApiQuery({ name: "name", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "service", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "capitalSorting", enum: ["ASC", "DESC"] })
  @ApiQuery({ name: "capital", type: "string" })
  @ApiQuery({ name: "createdAt", type: "string" })
  @ApiQuery({ name: "offset", type: "number" })
  @ApiQuery({ name: "limit", type: "number" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Company entity.",
    type: CompanyEntity,
  })
  @UsePipes(
    new CustomValidationPipe<CompaniesQueryDto>(CompaniesQuerySchema, "query")
  )
  getCompaniesList(@Query() query: CompaniesQueryDto, @User() user: IUser) {
    return this.companiesService.getCompaniesList(query, user);
  }
}
