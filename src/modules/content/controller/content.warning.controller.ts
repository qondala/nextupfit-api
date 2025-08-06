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
  CreateContentWarningDto,
  UpdateContentWarningDto,
  DetailsContentWarningDto,
  PaginatedDetailsContentWarningDto,
} from "../dto";

import { ContentWarningService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/warning")
export class ContentWarningController {
  constructor(private readonly service: ContentWarningService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content warning",
    operationId: "createContentWarning",
  })
  @ApiBody({
    type: CreateContentWarningDto,
    description: "Content warning data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content warning created successfully",
    type: DetailsContentWarningDto,
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
    @Body() dto: CreateContentWarningDto,
  ): Promise<DetailsContentWarningDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get all content warnings with pagination",
    operationId: "getAllContentWarnings",
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
    description: "List of content warnings retrieved successfully",
    type: PaginatedDetailsContentWarningDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentWarningDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content warning by ID",
    operationId: "getContentWarningById",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content warning ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content warning retrieved successfully",
    type: DetailsContentWarningDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content warning not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentWarningDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content warning by ID",
    operationId: "updateContentWarning",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content warning ID",
  })
  @ApiBody({
    type: UpdateContentWarningDto,
    description: "Content warning data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content warning updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content warning not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentWarningDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content warning by ID",
    operationId: "deleteContentWarning",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content warning ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content warning deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content warning not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
