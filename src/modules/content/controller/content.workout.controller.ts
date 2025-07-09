import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateContentWorkoutDto,
  UpdateContentWorkoutDto,
  DetailsContentWorkoutDto,
  PaginatedDetailsContentWorkoutDto,
} from "../dto";

import { ContentWorkoutService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/workout")
export class ContentWorkoutController {
  constructor(private readonly service: ContentWorkoutService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content workout",
    operationId: "createContentWorkout",
  })
  @ApiBody({
    type: CreateContentWorkoutDto,
    description: "Content workout data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content workout created successfully",
    type: DetailsContentWorkoutDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(@Body() dto: CreateContentWorkoutDto): Promise<DetailsContentWorkoutDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get all content workouts with pagination",
    operationId: "getAllContentWorkouts",
  })
  @ApiParam({
    name: "contentId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Content ID",
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number for pagination",
    required: false,
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of content workouts retrieved successfully",
    type: PaginatedDetailsContentWorkoutDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentWorkoutDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content workout by ID",
    operationId: "getContentWorkoutById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content workout ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content workout retrieved successfully",
    type: DetailsContentWorkoutDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content workout not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentWorkoutDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content workout by ID",
    operationId: "updateContentWorkout",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content workout ID",
  })
  @ApiBody({
    type: UpdateContentWorkoutDto,
    description: "Content workout data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content workout updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content workout not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentWorkoutDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content workout by ID",
    operationId: "deleteContentWorkout",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content workout ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content workout deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content workout not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
