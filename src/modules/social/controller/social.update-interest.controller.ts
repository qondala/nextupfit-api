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

import { SwaggerType } from "@app/common/types";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateSocialUpdateInterestDto,
  UpdateSocialUpdateInterestDto,
  DetailsSocialUpdateInterestDto,
  PaginatedDetailsSocialUpdateInterestDto,
  SocialFindCriteriaUpdateInterestDto,
  PaginatedDetailsSocialUpdateDto,
} from "../dto";
import { SocialUpdateInterestService } from "../service";

@ApiTags("Social module endpoints")
@ApiBearerAuth()
@Controller("social/update/interest")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialUpdateInterestController {
  constructor(private readonly service: SocialUpdateInterestService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new social update interest",
    operationId: "createSocialUpdateInterest",
  })
  @ApiBody({
    type: CreateSocialUpdateInterestDto,
    description: "Social update interest data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Social update interest created successfully",
    type: DetailsSocialUpdateInterestDto,
  })
  async create(
    @Body() body: CreateSocialUpdateInterestDto,
  ): Promise<DetailsSocialUpdateInterestDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all social update interests",
    operationId: "getAllSocialUpdateInterests",
  })
  @ApiQuery({
    type: SocialFindCriteriaUpdateInterestDto,
    description: "Social update interests find criteria",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update interests retrieved successfully",
    type: PaginatedDetailsSocialUpdateInterestDto,
  })
  async findAll(
    @Query() criteria: SocialFindCriteriaUpdateInterestDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialUpdateInterestDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get("/user/:userId")
  @ApiOperation({
    summary: "Get user updates by interests",
    operationId: "getUserUpdatesByInterests",
  })
  @ApiParam({
    name: "userId",
    type: SwaggerType.INTEGER,
    description: "User ID",
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: "Pagination options",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User update interests retrieved successfully",
    type: PaginatedDetailsSocialUpdateDto,
  })
  async getUserInterestedUpdates(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialUpdateDto> {
    return await this.service.findUserInterestedUpdates(
      userId,
      pagination,
    );
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get social update interest by ID",
    operationId: "getSocialUpdateInterestById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update interest ID",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update interest retrieved successfully",
    type: DetailsSocialUpdateInterestDto,
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsSocialUpdateInterestDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update social update interest",
    operationId: "updateSocialUpdateInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update interest ID",
    required: true,
  })
  @ApiBody({
    type: UpdateSocialUpdateInterestDto,
    description: "Social update interest update data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social update interest updated successfully",
    type: DetailsSocialUpdateInterestDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateSocialUpdateInterestDto,
  ): Promise<DetailsSocialUpdateInterestDto> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete social update interest",
    operationId: "deleteSocialUpdateInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social update interest ID",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Social update interest deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
