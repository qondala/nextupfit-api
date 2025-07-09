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

import { ContentCommitmentItemService } from "../../service";
import {
  CreateContentCommitmentItemDto,
  UpdateContentCommitmentItemDto,
  DetailsContentCommitmentItemDto,
  PaginatedDetailsContentCommitmentItemDto,
} from "../../dto";

@ApiTags("Content module endpoints")
@ApiBearerAuth()
@Controller("content/commitment/items")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentCommitmentItemController {
  constructor(private readonly service: ContentCommitmentItemService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new content commitment item",
    operationId: "createContentCommitmentItem",
  })
  @ApiBody({
    type: CreateContentCommitmentItemDto,
    description: "Content commitment item data to create",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Content commitment item created successfully",
    type: DetailsContentCommitmentItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async create(@Body() dto: CreateContentCommitmentItemDto): Promise<DetailsContentCommitmentItemDto> {
    return await this.service.create(dto);
  }

  @Get("list/:commitmentId")
  @ApiOperation({
    summary: "Get all content commitment items with pagination",
    operationId: "findAllContentCommitmentItems",
  })
  @ApiParam({
    name: "commitmentId",
    type: SwaggerType.INTEGER,
    description: "Content commitment ID",
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
    description: "List of content commitment items retrieved successfully",
    type: PaginatedDetailsContentCommitmentItemDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findAll(
    @Param("commitmentId", ParseIntPipe) commitmentId: number,
    @Query() query: PaginationOptionsDto,
  ): Promise<PaginatedDetailsContentCommitmentItemDto> {
    return await this.service.findAll(commitmentId, query);
  }

  @Get(":id")
  @ApiOperation({
    summary: "Get a content commitment item by ID",
    operationId: "findOneContentCommitmentItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content commitment item ID",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content commitment item retrieved successfully",
    type: DetailsContentCommitmentItemDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content commitment item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<DetailsContentCommitmentItemDto> {
    return await this.service.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update a content commitment item by ID",
    operationId: "updateContentCommitmentItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content commitment item ID",
  })
  @ApiBody({
    type: UpdateContentCommitmentItemDto,
    description: "Content commitment item data to update",
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Content commitment item updated successfully",
    type: DetailsContentCommitmentItemDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid input data",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content commitment item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateContentCommitmentItemDto,
  ): Promise<DetailsContentCommitmentItemDto> {
    return await this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "Delete a content commitment item by ID",
    operationId: "removeContentCommitmentItem",
  })
  @ApiParam({
    name: "id",
    type: SwaggerType.INTEGER,
    description: "Content commitment item ID",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Content commitment item deleted successfully",
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Content commitment item not found",
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Unauthorized access",
  })
  async remove(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return await this.service.remove(id);
  }
}
