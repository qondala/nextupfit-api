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
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";

import { JwtAuthGuard, RolesGuard } from "@app/common/guards";
import { PaginationOptionsDto } from "@app/common/dto";
import { SwaggerType } from "@app/common/types";

import { ContentTextareaService } from "../service";
import {
  CreateContentTextareaDto,
  UpdateContentTextareaDto,
  DetailsContentTextareaDto,
  PaginatedDetailsContentTextareaDto,
} from "../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/textarea")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentTextareaController {
  constructor(private readonly service: ContentTextareaService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content textarea",
    operationId: "createContentTextarea",
  })
  @ApiBody({
    type: CreateContentTextareaDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content textarea created successfully",
    type: DetailsContentTextareaDto,
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
    @Body() dto: CreateContentTextareaDto,
  ): Promise<DetailsContentTextareaDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content textareas",
    operationId: "listContentTextareas",
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
    description: "Paginated list of content textareas retrieved successfully",
    type: PaginatedDetailsContentTextareaDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentTextareaDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content textarea details by ID",
    operationId: "getContentTextareaDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content textarea ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content textarea details retrieved successfully",
    type: DetailsContentTextareaDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content textarea not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentTextareaDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content textarea by ID",
    operationId: "updateContentTextarea",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content textarea ID",
  })
  @ApiBody({
    type: UpdateContentTextareaDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content textarea updated successfully",
    type: DetailsContentTextareaDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content textarea not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentTextareaDto,
  ): Promise<DetailsContentTextareaDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content textarea by ID",
    operationId: "deleteContentTextarea",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content textarea ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content textarea deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content textarea not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
