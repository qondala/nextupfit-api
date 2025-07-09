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
  CreateContentOrderedlistDto,
  UpdateContentOrderedlistDto,
  DetailsContentOrderedlistDto,
  PaginatedDetailsContentOrderedlistDto,
} from "../dto";

import { ContentOrderedlistService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/orderedlist")
export class ContentOrderedlistController {
  constructor(private readonly service: ContentOrderedlistService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content ordered list",
    operationId: "createContentOrderedlist",
  })
  @ApiBody({
    type: CreateContentOrderedlistDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content ordered list created successfully",
    type: DetailsContentOrderedlistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(@Body() dto: CreateContentOrderedlistDto): Promise<DetailsContentOrderedlistDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content ordered lists",
    operationId: "listContentOrderedlists",
  })
  @ApiParam({
    name: "contentId",
    required: true,
    type: SwaggerType.INTEGER,
    description: "Content ID",
  })
  @ApiQuery({
    name: "page",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Page number for pagination",
  })
  @ApiQuery({
    name: "limit",
    required: false,
    type: SwaggerType.INTEGER,
    description: "Number of items per page",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Paginated list of content ordered lists retrieved successfully",
    type: PaginatedDetailsContentOrderedlistDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentOrderedlistDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content ordered list details by ID",
    operationId: "getContentOrderedlistDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content ordered list ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content ordered list details retrieved successfully",
    type: DetailsContentOrderedlistDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content ordered list not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentOrderedlistDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content ordered list by ID",
    operationId: "updateContentOrderedlist",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content ordered list ID",
  })
  @ApiBody({
    type: UpdateContentOrderedlistDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content ordered list updated successfully",
    type: DetailsContentOrderedlistDto,
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentOrderedlistDto,
  ): Promise<DetailsContentOrderedlistDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content ordered list by ID",
    operationId: "deleteContentOrderedlist",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content ordered list ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content ordered list deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content ordered list not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
