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
  CreateContentVideoDto,
  UpdateContentVideoDto,
  DetailsContentVideoDto,
  PaginatedDetailsContentVideoDto,
} from "../dto";

import { ContentVideoService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/video")
export class ContentVideoController {
  constructor(private readonly service: ContentVideoService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content video",
    operationId: "createContentVideo",
  })
  @ApiBody({
    type: CreateContentVideoDto,
    description: "Content video data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content video created successfully",
    type: DetailsContentVideoDto,
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
    @Body() dto: CreateContentVideoDto,
  ): Promise<DetailsContentVideoDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get all content videos with pagination",
    operationId: "getAllContentVideos",
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
    description: "List of content videos retrieved successfully",
    type: PaginatedDetailsContentVideoDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentVideoDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content video by ID",
    operationId: "getContentVideoById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content video ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content video retrieved successfully",
    type: DetailsContentVideoDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content video not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentVideoDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content video by ID",
    operationId: "updateContentVideo",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content video ID",
  })
  @ApiBody({
    type: UpdateContentVideoDto,
    description: "Content video data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content video updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content video not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentVideoDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content video by ID",
    operationId: "deleteContentVideo",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content video ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content video deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content video not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
