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

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import {
  CreateContentOrderedlistItemDto,
  UpdateContentOrderedlistItemDto,
  DetailsContentOrderedlistItemDto,
  PaginatedDetailsContentOrderedlistItemDto,
} from "../../dto";

import { ContentOrderedlistItemService } from "../../service/items";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/orderedlist-item")
export class ContentOrderedlistItemController {
  constructor(private readonly service: ContentOrderedlistItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content ordered list item",
    operationId: "createContentOrderedlistItem",
  })
  @ApiBody({
    type: CreateContentOrderedlistItemDto,
    description: "Content ordered list item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content ordered list item created successfully",
    type: DetailsContentOrderedlistItemDto,
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
    @Body() dto: CreateContentOrderedlistItemDto,
  ): Promise<DetailsContentOrderedlistItemDto> {
    return await this.service.create(dto);
  }

  @Get("list/:contentOrderedlistId")
  @ApiOperation({
    summary: "Get all content ordered list items with pagination",
    operationId: "findAllContentOrderedlistItems",
  })
  @ApiParam({
    name: "contentOrderedlistId",
    type: SwaggerType.INTEGER,
    description: "Content ordered list ID",
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
    description: "List of content ordered list items retrieved successfully",
    type: PaginatedDetailsContentOrderedlistItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentOrderedlistId", ParseIntPipe) contentOrderedlistId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentOrderedlistItemDto> {
    return await this.service.findAll(contentOrderedlistId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content ordered list item by ID",
    operationId: "findOneContentOrderedlistItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content ordered list item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content ordered list item retrieved successfully",
    type: DetailsContentOrderedlistItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content ordered list item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentOrderedlistItemDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content ordered list item by ID",
    operationId: "updateContentOrderedlistItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content ordered list item ID",
  })
  @ApiBody({
    type: UpdateContentOrderedlistItemDto,
    description: "Content ordered list item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content ordered list item updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content ordered list item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentOrderedlistItemDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content ordered list item by ID",
    operationId: "removeContentOrderedlistItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content ordered list item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content ordered list item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content ordered list item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
