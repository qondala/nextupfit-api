import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  SocialActorEnum,
  SocialUpdatePrivacyEnum,
  SocialUpdateTypeEnum,
} from "../types";

import {
  CreateSocialUpdateDto,
  DetailsSocialUpdateDto,
  UpdateSocialUpdateDto,
  PaginatedDetailsSocialUpdateDto,
  SocialUpdatesFindOrderEnum,
  SocialUpdatesFindCriteriaDto,
} from "../dto";

import { SocialUpdateService } from "../service";

@ApiTags("Social module endpoints")
@ApiBearerAuth()
@Controller("social/update")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialUpdateController {
  constructor(private readonly socialUpdateService: SocialUpdateService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new social update record",
    operationId: "createSocialUpdate",
  })
  @ApiBody({
    type: CreateSocialUpdateDto,
    description: "Social update data to create",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Social update record created successfully",
    type: DetailsSocialUpdateDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  create(
    @Body() createSocialUpdateDto: CreateSocialUpdateDto,
  ): Promise<DetailsSocialUpdateDto> {
    return this.socialUpdateService.create(createSocialUpdateDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all social update records with pagination",
    operationId: "findAllSocialUpdate",
  })
  @ApiQuery({
    name: "authorUserId",
    type: SwaggerType.INTEGER,
    description: "The ID of the author user",
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: "authorManagerId",
    type: SwaggerType.INTEGER,
    description: "The ID of the author manager",
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: "socialActorType",
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: "The type of social actor",
    example: SocialActorEnum.user,
    required: false,
  })
  @ApiQuery({
    name: "socialActorId",
    type: SwaggerType.INTEGER,
    description: "The ID of the social actor",
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: "socialUpdateType",
    enum: SocialUpdateTypeEnum,
    enumName: "SocialUpdateTypeEnum",
    description: "The type of social update",
    example: SocialUpdateTypeEnum.status,
    required: false,
  })
  @ApiQuery({
    name: "privacy",
    enum: SocialUpdatePrivacyEnum,
    enumName: "SocialUpdatePrivacyEnum",
    description: "The privacy setting for the social update",
    example: SocialUpdatePrivacyEnum.public,
    required: false,
  })
  @ApiQuery({
    name: "orderBy",
    enum: SocialUpdatesFindOrderEnum,
    enumName: "SocialUpdatesFindOrderEnum",
    description: "The order by for the social updates",
    example: SocialUpdatesFindOrderEnum.date,
    required: false,
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number (default: 1)",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of records per page (default: 10)",
    example: 10,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update records retrieved successfully",
    type: PaginatedDetailsSocialUpdateDto,
  })
  findAll(
    @Query() criteria: SocialUpdatesFindCriteriaDto,
    @Query() paginationOptions: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialUpdateDto> {
    return this.socialUpdateService.findAll(criteria, paginationOptions);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a social update record by ID",
    operationId: "findOneSocialUpdate",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update record ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update record retrieved successfully",
    type: DetailsSocialUpdateDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Social update record not found",
  })
  findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsSocialUpdateDto> {
    return this.socialUpdateService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a social update record by ID",
    operationId: "updateSocialUpdate",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update record ID",
    example: 1,
  })
  @ApiBody({
    type: UpdateSocialUpdateDto,
    description: "Social update data to update",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update record updated successfully",
    type: DetailsSocialUpdateDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Social update record not found",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSocialUpdateDto: UpdateSocialUpdateDto,
  ): Promise<DetailsSocialUpdateDto> {
    return this.socialUpdateService.update(id, updateSocialUpdateDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a social update record by ID",
    operationId: "removeSocialUpdate",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update record ID",
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Social update record deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Social update record not found",
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.socialUpdateService.remove(id);
  }
}
