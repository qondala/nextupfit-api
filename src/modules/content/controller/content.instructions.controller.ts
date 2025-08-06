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
  CreateContentInstructionsDto,
  UpdateContentInstructionsDto,
  DetailsContentInstructionsDto,
  PaginatedDetailsContentInstructionsDto,
} from "../dto";
import { ContentInstructionsService } from "../service";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("content/instructions")
export class ContentInstructionsController {
  constructor(private readonly service: ContentInstructionsService) {}

  @Post()
  @ApiOperation({
    summary: "Create new content instructions",
    operationId: "createContentInstructions",
  })
  @ApiBody({
    type: CreateContentInstructionsDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content instructions created successfully",
    type: DetailsContentInstructionsDto,
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
    @Body() dto: CreateContentInstructionsDto,
  ): Promise<DetailsContentInstructionsDto> {
    return await this.service.create(dto);
  }

  @Get("content/:contentId")
  @ApiOperation({
    summary: "Get paginated list of content instructions",
    operationId: "listContentInstructions",
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
    description:
      "Paginated list of content instructions retrieved successfully",
    type: PaginatedDetailsContentInstructionsDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("contentId", ParseIntPipe) contentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentInstructionsDto> {
    return await this.service.findAll(contentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get content instructions details by ID",
    operationId: "getContentInstructionsDetails",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content instructions ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content instructions details retrieved successfully",
    type: DetailsContentInstructionsDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content instructions not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DetailsContentInstructionsDto | null> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update content instructions by ID",
    operationId: "updateContentInstructions",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content instructions ID",
  })
  @ApiBody({
    type: UpdateContentInstructionsDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content instructions updated successfully",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content instructions not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentInstructionsDto,
  ): Promise<void> {
    await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete content instructions by ID",
    operationId: "deleteContentInstructions",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content instructions ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content instructions deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content instructions not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.service.remove(id);
  }
}
