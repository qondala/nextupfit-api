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
  UseGuards
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
  ApiBearerAuth
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { SwaggerType } from "@app/common/types";

import { ContentGalleryItemService } from "../../service";
import {
  CreateContentGalleryItemDto,
  UpdateContentGalleryItemDto,
  DetailsContentGalleryItemDto,
  PaginatedDetailsContentGalleryItemDto
} from "../../dto";
import { PaginationOptionsDto } from "@app/common/dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/gallery/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentGalleryItemController {
  constructor(private readonly contentGalleryItemService: ContentGalleryItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content gallery item",
    operationId: "createContentGalleryItem"
  })
  @ApiBody({
    type: CreateContentGalleryItemDto,
    description: "Content gallery item creation data"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content gallery item created successfully",
    type: DetailsContentGalleryItemDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data"
  })
  create(@Body() createContentGalleryItemDto: CreateContentGalleryItemDto): Promise<DetailsContentGalleryItemDto> {
    return this.contentGalleryItemService.create(createContentGalleryItemDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all content gallery items with pagination",
    operationId: "getAllContentGalleryItems"
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    required: false,
    example: 1
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Items per page",
    required: false,
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content gallery items retrieved successfully",
    type: PaginatedDetailsContentGalleryItemDto
  })
  findAll(@Query() query: PaginationOptionsDto): Promise<PaginatedDetailsContentGalleryItemDto> {
    return this.contentGalleryItemService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content gallery item by ID",
    operationId: "getContentGalleryItemById"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content gallery item ID",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content gallery item retrieved successfully",
    type: DetailsContentGalleryItemDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content gallery item not found"
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentGalleryItemDto> {
    return this.contentGalleryItemService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content gallery item",
    operationId: "updateContentGalleryItem"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content gallery item ID",
    example: 1
  })
  @ApiBody({
    type: UpdateContentGalleryItemDto,
    description: "Content gallery item update data"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content gallery item updated successfully",
    type: DetailsContentGalleryItemDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content gallery item not found"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data"
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateContentGalleryItemDto: UpdateContentGalleryItemDto
  ): Promise<DetailsContentGalleryItemDto> {
    return this.contentGalleryItemService.update(id, updateContentGalleryItemDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content gallery item",
    operationId: "deleteContentGalleryItem"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content gallery item ID",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content gallery item deleted successfully"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content gallery item not found"
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.contentGalleryItemService.remove(id);
  }

  @Get("gallery/:contentGalleryId")
  @ApiOperation({
    summary: "Get content gallery items by content gallery ID",
    operationId: "getContentGalleryItemsByGalleryId"
  })
  @ApiParam({
    name: "contentGalleryId",
    type: SwaggerType.INTEGER,
    description: "Content gallery ID",
    example: 1
  })
  @ApiQuery({
    name: "page",
    type: SwaggerType.INTEGER,
    description: "Page number",
    required: false,
    example: 1
  })
  @ApiQuery({
    name: "limit",
    type: SwaggerType.INTEGER,
    description: "Items per page",
    required: false,
    example: 10
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content gallery items retrieved successfully",
    type: PaginatedDetailsContentGalleryItemDto
  })
  findByContentGalleryId(
    @Param("contentGalleryId", ParseIntPipe) contentGalleryId: number,
    @Query() query: PaginationOptionsDto
  ): Promise<PaginatedDetailsContentGalleryItemDto> {
    return this.contentGalleryItemService.findByContentGalleryId(contentGalleryId, query);
  }
}
