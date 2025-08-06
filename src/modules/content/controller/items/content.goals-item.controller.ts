import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";

import {
  CreateContentGoalsItemDto,
  UpdateContentGoalsItemDto,
  DetailsContentGoalsItemDto,
  PaginatedDetailsContentGoalsItemDto,
} from "../../dto";
import { ContentGoalsItemService } from "../../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/goals/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentGoalsItemController {
  constructor(private readonly goalsItemService: ContentGoalsItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content goals item",
    operationId: "createContentGoalsItem",
  })
  @ApiBody({
    type: CreateContentGoalsItemDto,
    description: "Content goals item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content goals item created successfully",
    type: DetailsContentGoalsItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(
    @Body() dto: CreateContentGoalsItemDto,
  ): Promise<DetailsContentGoalsItemDto> {
    return await this.goalsItemService.create(dto);
  }

  @Get("list/:contentGoalsId")
  @ApiOperation({
    summary: "Get all content goals items with pagination",
    operationId: "findAllContentGoalsItems",
  })
  @ApiParam({
    name: "contentGoalsId",
    type: SwaggerType.INTEGER,
    description: "Content goals ID",
    required: true,
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
    description: "List of content goals items retrieved successfully",
    type: PaginatedDetailsContentGoalsItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentGoalsId", ParseIntPipe) contentGoalsId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentGoalsItemDto> {
    return await this.goalsItemService.findAll(contentGoalsId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content goals item by ID",
    operationId: "findOneContentGoalsItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content goals item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content goals item retrieved successfully",
    type: DetailsContentGoalsItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content goals item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentGoalsItemDto> {
    return await this.goalsItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content goals item by ID",
    operationId: "updateContentGoalsItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content goals item ID",
  })
  @ApiBody({
    type: UpdateContentGoalsItemDto,
    description: "Content goals item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content goals item updated successfully",
    type: DetailsContentGoalsItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content goals item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentGoalsItemDto,
  ): Promise<DetailsContentGoalsItemDto> {
    return await this.goalsItemService.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content goals item by ID",
    operationId: "removeContentGoalsItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content goals item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content goals item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content goals item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.goalsItemService.remove(id);
  }
}
