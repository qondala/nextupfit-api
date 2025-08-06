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

import { ContentCarouselItemService } from "../../service";
import {
  CreateContentCarouselItemDto,
  UpdateContentCarouselItemDto,
  DetailsContentCarouselItemDto,
  PaginatedDetailsContentCarouselItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/carousel/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentCarouselItemController {
  constructor(private readonly service: ContentCarouselItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content carousel item",
    operationId: "createContentCarouselItem",
  })
  @ApiBody({
    type: CreateContentCarouselItemDto,
    description: "Content carousel item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content carousel item created successfully",
    type: DetailsContentCarouselItemDto,
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
    @Body() dto: CreateContentCarouselItemDto,
  ): Promise<DetailsContentCarouselItemDto> {
    return await this.service.create(dto);
  }

  @Get("list/:carouselId")
  @ApiOperation({
    summary: "Get all content carousel items with pagination",
    operationId: "findAllContentCarouselItems",
  })
  @ApiParam({
    name: "carouselId",
    type: SwaggerType.INTEGER,
    description: "Content carousel ID",
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
    description: "List of content carousel items retrieved successfully",
    type: PaginatedDetailsContentCarouselItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("carouselId", ParseIntPipe) carouselId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentCarouselItemDto> {
    return await this.service.findAll(carouselId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content carousel item by ID",
    operationId: "findOneContentCarouselItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content carousel item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content carousel item retrieved successfully",
    type: DetailsContentCarouselItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content carousel item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentCarouselItemDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content carousel item by ID",
    operationId: "updateContentCarouselItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content carousel item ID",
  })
  @ApiBody({
    type: UpdateContentCarouselItemDto,
    description: "Content carousel item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content carousel item updated successfully",
    type: DetailsContentCarouselItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content carousel item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCarouselItemDto,
  ): Promise<DetailsContentCarouselItemDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content carousel item by ID",
    operationId: "removeContentCarouselItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content carousel item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content carousel item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content carousel item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
