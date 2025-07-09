import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiQuery, ApiParam } from "@nestjs/swagger";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";


import {
  CreateUserRecommendationDto,
  DetailsUserRecommendationDto,
  PaginatedDetailsUserRecommendationDto,
  UpdateUserRecommendationDto
} from "../dto";


import { UserRecommendationService } from "../service";
import { SwaggerType } from "@app/common/types";


@ApiTags("User module endpoints")
@ApiBearerAuth()
@Controller("user/recommendation")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserRecommendationController {
  constructor(private readonly userRecommendationService: UserRecommendationService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new user recommendation",
    operationId: "createUserRecommendation"
  })
  @ApiBody({
    required: true,
    type: CreateUserRecommendationDto
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The user recommendation has been successfully created.",
    type: DetailsUserRecommendationDto,
  })
  async create(@Body() createUserRecommendationDto: CreateUserRecommendationDto): Promise<DetailsUserRecommendationDto> {
    return await this.userRecommendationService.create(createUserRecommendationDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all user recommendations with pagination",
    operationId: "findAllUserRecommendations"
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user recommendations with pagination.",
    type: PaginatedDetailsUserRecommendationDto,
  })
  async findAll(@Query() paginationDto: PaginationOptionsDto): Promise<PaginatedDetailsUserRecommendationDto> {
    return await this.userRecommendationService.findAll(paginationDto);
  }

  @Get("recommender/:recommenderId")
  @ApiOperation({
    summary: "Get all user recommendations made by a specific user",
    operationId: "findByRecommenderIdUserRecommendations"
  })
  @ApiParam({
    name: "recommenderId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User recommendation id",
    example: 1
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user recommendations made by the specified user.",
    type: PaginatedDetailsUserRecommendationDto,
  })
  async findByRecommenderId(
    @Param("recommenderId", ParseIntPipe) recommenderId: number,
    @Query() paginationDto: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserRecommendationDto> {
    return await this.userRecommendationService.findByRecommenderId(recommenderId, paginationDto);
  }

  @Get("recommendee/:recommendeeId")
  @ApiOperation({
    summary: "Get all user recommendations received by a specific user",
    operationId: "findByRecommendeeIdUserRecommendations"
  })
  @ApiParam({
    name: "recommendeeId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User recommendation id",
    example: 1
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number",
    example: 1
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return all user recommendations received by the specified user.",
    type: PaginatedDetailsUserRecommendationDto,
  })
  async findByRecommendeeId(
    @Param("recommendeeId", ParseIntPipe) recommendeeId: number,
    @Query() paginationDto: PaginationOptionsDto
  ): Promise<PaginatedDetailsUserRecommendationDto> {
    return await this.userRecommendationService.findByRecommendeeId(recommendeeId, paginationDto);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a user recommendation by id",
    operationId: "findUserRecommendationById"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Return the user recommendation.",
    type: DetailsUserRecommendationDto,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsUserRecommendationDto> {
    return await this.userRecommendationService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a user recommendation",
    operationId: "updateUserRecommendation"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User recommendation id",
    example: 1
  })
  @ApiBody({
    required: true,
    type: UpdateUserRecommendationDto
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user recommendation has been successfully updated.",
    type: DetailsUserRecommendationDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserRecommendationDto: UpdateUserRecommendationDto
  ): Promise<DetailsUserRecommendationDto> {
    return await this.userRecommendationService.update(id, updateUserRecommendationDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a user recommendation",
    operationId: "removeUserRecommendation"
  })
  @ApiParam({
    name: "id",
    required: true,
    type: SwaggerType.INTEGER,
    description: "User recommendation id",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "The user recommendation has been successfully deleted.",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.userRecommendationService.remove(id);
  }
}
