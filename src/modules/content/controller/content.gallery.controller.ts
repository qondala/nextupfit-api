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

import { SwaggerType } from "@app/common/types"
import { PaginationOptionsDto } from "@app/common/dto";
import { JwtAuthGuard, RolesGuard } from "@app/common/guards";

import {
  CreateContentGalleryDto,
  UpdateContentGalleryDto,
  DetailsContentGalleryDto,
  PaginatedDetailsContentGalleryDto
} from "../dto";

import { ContentGalleryService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/gallery")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentGalleryController {
  constructor(private readonly contentGalleryService: ContentGalleryService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content gallery",
    operationId: "createContentGallery"
  })
  @ApiBody({
    type: CreateContentGalleryDto,
    description: "Content gallery creation data"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content gallery created successfully",
    type: DetailsContentGalleryDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data"
  })
  create(@Body() createContentGalleryDto: CreateContentGalleryDto): Promise<DetailsContentGalleryDto> {
    return this.contentGalleryService.create(createContentGalleryDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get all content galleries with pagination",
    operationId: "getAllContentGalleries"
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
    description: "Content galleries retrieved successfully",
    type: PaginatedDetailsContentGalleryDto
  })
  findAll(@Query() query: PaginationOptionsDto): Promise<PaginatedDetailsContentGalleryDto> {
    return this.contentGalleryService.findAll(query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content gallery by ID",
    operationId: "getContentGalleryById"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content gallery ID",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content gallery retrieved successfully",
    type: DetailsContentGalleryDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content gallery not found"
  })
  findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentGalleryDto> {
    return this.contentGalleryService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content gallery",
    operationId: "updateContentGallery"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content gallery ID",
    example: 1
  })
  @ApiBody({
    type: UpdateContentGalleryDto,
    description: "Content gallery update data"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content gallery updated successfully",
    type: DetailsContentGalleryDto
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content gallery not found"
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data"
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateContentGalleryDto: UpdateContentGalleryDto
  ): Promise<DetailsContentGalleryDto> {
    return this.contentGalleryService.update(id, updateContentGalleryDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content gallery",
    operationId: "deleteContentGallery"
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content gallery ID",
    example: 1
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content gallery deleted successfully"
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content gallery not found"
  })
  remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.contentGalleryService.remove(id);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get content galleries by content ID",
    operationId: "getContentGalleriesByContentId"
  })
  @ApiParam({
    name: "contentId",
    type: SwaggerType.INTEGER,
    description: "Content ID",
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
    description: "Content galleries retrieved successfully",
    type: PaginatedDetailsContentGalleryDto
  })
  findByContentId(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto
  ): Promise<PaginatedDetailsContentGalleryDto> {
    return this.contentGalleryService.findByContentId(contentId, query);
  }
}
