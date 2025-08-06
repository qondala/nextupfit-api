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

import { ContentConsumptionItemService } from "../../service";
import {
  CreateContentConsumptionItemDto,
  UpdateContentConsumptionItemDto,
  DetailsContentConsumptionItemDto,
  PaginatedDetailsContentConsumptionItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/consumption/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentConsumptionItemController {
  constructor(private readonly service: ContentConsumptionItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content consumption item",
    operationId: "createContentConsumptionItem",
  })
  @ApiBody({
    type: CreateContentConsumptionItemDto,
    description: "Content consumption item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content consumption item created successfully",
    type: DetailsContentConsumptionItemDto,
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
    @Body() dto: CreateContentConsumptionItemDto,
  ): Promise<DetailsContentConsumptionItemDto> {
    return await this.service.create(dto);
  }

  @Get("list/:consumptionId")
  @ApiOperation({
    summary: "Get all content consumption items with pagination",
    operationId: "findAllContentConsumptionItems",
  })
  @ApiParam({
    name: "consumptionId",
    type: SwaggerType.INTEGER,
    description: "Content consumption ID",
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
    description: "List of content consumption items retrieved successfully",
    type: PaginatedDetailsContentConsumptionItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("consumptionId", ParseIntPipe) consumptionId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentConsumptionItemDto> {
    return await this.service.findAll(consumptionId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content consumption item by ID",
    operationId: "findOneContentConsumptionItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content consumption item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content consumption item retrieved successfully",
    type: DetailsContentConsumptionItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content consumption item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentConsumptionItemDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content consumption item by ID",
    operationId: "updateContentConsumptionItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content consumption item ID",
  })
  @ApiBody({
    type: UpdateContentConsumptionItemDto,
    description: "Content consumption item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content consumption item updated successfully",
    type: DetailsContentConsumptionItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content consumption item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentConsumptionItemDto,
  ): Promise<DetailsContentConsumptionItemDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content consumption item by ID",
    operationId: "removeContentConsumptionItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content consumption item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content consumption item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content consumption item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
