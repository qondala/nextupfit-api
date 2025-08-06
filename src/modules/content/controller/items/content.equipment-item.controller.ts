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
  CreateContentEquipmentItemDto,
  UpdateContentEquipmentItemDto,
  DetailsContentEquipmentItemDto,
  PaginatedDetailsContentEquipmentItemDto,
} from "../../dto";

import { ContentEquipmentItemService } from "../../service/items";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/equipment-item")
export class ContentEquipmentItemController {
  constructor(private readonly service: ContentEquipmentItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content equipment item",
    operationId: "createContentEquipmentItem",
  })
  @ApiBody({
    type: CreateContentEquipmentItemDto,
    description: "Content equipment item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content equipment item created successfully",
    type: DetailsContentEquipmentItemDto,
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
    @Body() dto: CreateContentEquipmentItemDto,
  ): Promise<DetailsContentEquipmentItemDto> {
    return await this.service.create(dto);
  }

  @Get("list/:contentEquipmentId")
  @ApiOperation({
    summary: "Get all content equipment items with pagination",
    operationId: "findAllContentEquipmentItems",
  })
  @ApiParam({
    name: "contentEquipmentId",
    type: SwaggerType.INTEGER,
    description: "Content equipment ID",
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
    description: "List of content equipment items retrieved successfully",
    type: PaginatedDetailsContentEquipmentItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentEquipmentId", ParseIntPipe) contentEquipmentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentEquipmentItemDto> {
    return this.service.findAll(contentEquipmentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content equipment item by ID",
    operationId: "findOneContentEquipmentItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content equipment item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content equipment item retrieved successfully",
    type: DetailsContentEquipmentItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content equipment item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentEquipmentItemDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content equipment item by ID",
    operationId: "updateContentEquipmentItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content equipment item ID",
  })
  @ApiBody({
    type: UpdateContentEquipmentItemDto,
    description: "Content equipment item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content equipment item updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content equipment item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentEquipmentItemDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content equipment item by ID",
    operationId: "deleteContentEquipmentItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content equipment item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content equipment item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content equipment item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
