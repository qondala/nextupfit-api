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
import {
  JwtAuthGuard,
  RolesGuard,
} from "@app/common/guards";
import {
  InterestPaginationDto,
  PaginationOptionsDto,
} from "@app/common/dto";

import {
  CreateSocialAdvertisementInterestDto,
  UpdateSocialAdvertisementInterestDto,
  DetailsSocialAdvertisementInterestDto,
  PaginatedDetailsSocialAdvertisementInterestDto,
  SocialFindCriteriaAdvertisementInterestDto,
  PaginatedDetailsSocialAdvertisementDto,
} from "../dto";
import { SocialAdvertisementInterestService } from "../service";


@ApiTags("Social module endpoints")
@ApiBearerAuth()
@Controller("social/advertisement/interests")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SocialAdvertisementInterestController {
  constructor(private readonly service: SocialAdvertisementInterestService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new social advertisement interest",
    operationId: "createSocialAdvertisementInterest",
  })
  @ApiBody({
    type: CreateSocialAdvertisementInterestDto,
    description: "Social advertisement interest data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Social advertisement interest created successfully",
    type: DetailsSocialAdvertisementInterestDto,
  })
  async create(@Body() body: CreateSocialAdvertisementInterestDto): Promise<DetailsSocialAdvertisementInterestDto> {
    return this.service.create(body);
  }

  @Get()
  @ApiOperation({
    summary: "Get all social advertisement interests",
    operationId: "getAllSocialAdvertisementInterests",
  })
  @ApiQuery({
    type: SocialFindCriteriaAdvertisementInterestDto,
    description: 'Social advertisement interests find criteria',
    required: true,
  })
  @ApiQuery({
    type: PaginationOptionsDto,
    description: 'Pagination options',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social advertisement interests retrieved successfully",
    type: PaginatedDetailsSocialAdvertisementInterestDto,
  })
  async findAll(
    @Query() criteria: SocialFindCriteriaAdvertisementInterestDto,
    @Query() pagination?: PaginationOptionsDto,
  ): Promise<PaginatedDetailsSocialAdvertisementInterestDto> {
    return this.service.findAll(criteria, pagination);
  }

  @Get("/user/:userId")
  @ApiOperation({
    summary: "Get user advertisements by interests",
    operationId: "getUserAdvertisementsByInterests",
  })
  @ApiParam({
    name: "userId",
    type: SwaggerType.INTEGER,
    description: "User ID",
    required: true,
  })
  @ApiQuery({
    type: InterestPaginationDto,
    description: 'Pagination options',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "User advertisement interests retrieved successfully",
    type: PaginatedDetailsSocialAdvertisementDto,
  })
  async getUserInterests(
    @Param("userId", ParseIntPipe) userId: number,
    @Query() pagination: InterestPaginationDto,
  ): Promise<PaginatedDetailsSocialAdvertisementDto> {
    return await this.service.getAdvertisementsByUserInterests(userId, pagination);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get social advertisement interest by ID",
    operationId: "getSocialAdvertisementInterestById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social advertisement interest ID",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social advertisement interest retrieved successfully",
    type: DetailsSocialAdvertisementInterestDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsSocialAdvertisementInterestDto> {
    return this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update social advertisement interest",
    operationId: "updateSocialAdvertisementInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social advertisement interest ID",
    required: true,
  })
  @ApiBody({
    type: UpdateSocialAdvertisementInterestDto,
    description: "Social advertisement interest update data",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Social advertisement interest updated successfully",
    type: DetailsSocialAdvertisementInterestDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateSocialAdvertisementInterestDto,
  ): Promise<DetailsSocialAdvertisementInterestDto> {
    return this.service.update(id, body);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete social advertisement interest",
    operationId: "deleteSocialAdvertisementInterest",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Social advertisement interest ID",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Social advertisement interest deleted successfully",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
